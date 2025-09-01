/**
 * Development server with live reload for Windows
 * Watches for changes in HTML, CSS, and JS files
 */

const { exec, spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8000;
const RELOAD_PORT = 8001;

// Store active WebSocket connections
const clients = [];

// Create WebSocket server for live reload
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: RELOAD_PORT });

wss.on('connection', (ws) => {
    clients.push(ws);
    console.log('🔌 Browser connected for live reload');
    
    ws.on('close', () => {
        const index = clients.indexOf(ws);
        if (index > -1) {
            clients.splice(index, 1);
        }
    });
});

// Inject live reload script into HTML
const injectLiveReloadScript = (html) => {
    const script = `
    <script>
        (function() {
            const ws = new WebSocket('ws://localhost:${RELOAD_PORT}');
            ws.onmessage = function(event) {
                if (event.data === 'reload') {
                    console.log('🔄 Reloading page...');
                    window.location.reload();
                }
            };
            ws.onclose = function() {
                console.log('❌ Lost connection to dev server. Please restart the server.');
            };
        })();
    </script>
    `;
    return html.replace('</body>', script + '</body>');
};

// Watch for file changes
const watchFiles = () => {
    const watchDirs = [
        { dir: './css', ext: '.css' },
        { dir: './js', ext: '.js' },
        { dir: './', ext: '.html' }
    ];
    
    watchDirs.forEach(({ dir, ext }) => {
        fs.watch(dir, { recursive: true }, (eventType, filename) => {
            if (filename && filename.endsWith(ext)) {
                console.log(`📝 ${filename} changed, reloading browsers...`);
                clients.forEach(client => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send('reload');
                    }
                });
            }
        });
    });
    
    console.log('👀 Watching for changes in HTML, CSS, and JS files...\n');
};

// First, build the TypeScript
console.log('🔨 Building TypeScript...');
exec('npm run build', (error, stdout, stderr) => {
    if (error) {
        console.error(`❌ Build error: ${error}`);
        return;
    }
    
    console.log('✅ Build complete!');
    
    // Start the HTTP server
    console.log(`\n🚀 Starting server on http://localhost:${PORT}`);
    console.log('🔄 Live reload enabled!\n');
    
    const server = http.createServer((req, res) => {
        // Remove query parameters from URL
        let cleanUrl = req.url.split('?')[0];
        let filePath = cleanUrl === '/' ? '/index.html' : cleanUrl;
        filePath = path.join(__dirname, filePath);
        
        const extname = path.extname(filePath);
        const contentTypes = {
            '.html': 'text/html',
            '.js': 'text/javascript',
            '.css': 'text/css',
            '.png': 'image/png',
            '.jpg': 'image/jpg',
            '.jpeg': 'image/jpeg',
            '.gif': 'image/gif',
            '.svg': 'image/svg+xml',
            '.pdf': 'application/pdf'
        };
        
        const contentType = contentTypes[extname] || 'application/octet-stream';
        
        fs.readFile(filePath, (error, content) => {
            if (error) {
                if (error.code == 'ENOENT') {
                    res.writeHead(404);
                    res.end('404 Not Found');
                } else {
                    res.writeHead(500);
                    res.end('Server Error: ' + error.code);
                }
            } else {
                // Inject live reload script for HTML files
                if (extname === '.html') {
                    content = injectLiveReloadScript(content.toString());
                }
                
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content, 'utf-8');
            }
        });
    });
    
    server.listen(PORT);
    
    // Start watching files
    watchFiles();
    
    // Start TypeScript watch in background
    console.log('👀 Starting TypeScript watch mode...\n');
    const tscWatch = spawn('npx', ['tsc', '--watch'], { 
        shell: true,
        stdio: 'inherit'
    });
    
    // Handle exit
    process.on('SIGINT', () => {
        console.log('\n\n👋 Shutting down development server...');
        tscWatch.kill();
        server.close();
        wss.close();
        process.exit(0);
    });
});