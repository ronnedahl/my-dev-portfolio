/**
 * Simple development server with browser auto-refresh
 * Uses polling instead of WebSocket for better compatibility
 */

const { exec, spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8000;
let lastModified = {};

// Track file modification times
const getFileModTime = (filePath) => {
    try {
        return fs.statSync(filePath).mtime.getTime();
    } catch (e) {
        return 0;
    }
};

// Initialize modification times
const initFileTracking = () => {
    const files = [
        './index.html',
        './css/style.css',
        './js/app.js'
    ];
    
    files.forEach(file => {
        lastModified[file] = getFileModTime(file);
    });
};

// Check if any tracked file has been modified
const checkForChanges = () => {
    const files = Object.keys(lastModified);
    let hasChanges = false;
    
    files.forEach(file => {
        const currentModTime = getFileModTime(file);
        if (currentModTime > lastModified[file]) {
            lastModified[file] = currentModTime;
            hasChanges = true;
            console.log(`📝 ${file} changed!`);
        }
    });
    
    return hasChanges;
};

// Inject auto-refresh script into HTML
const injectAutoRefreshScript = (html) => {
    const script = `
    <script>
        (function() {
            let lastCheck = Date.now();
            
            // Check for changes every 500ms
            setInterval(function() {
                fetch('/check-changes?t=' + lastCheck)
                    .then(response => response.json())
                    .then(data => {
                        if (data.hasChanges) {
                            console.log('🔄 Changes detected, reloading...');
                            window.location.reload();
                        }
                        lastCheck = Date.now();
                    })
                    .catch(err => console.error('Failed to check for changes:', err));
            }, 500);
        })();
    </script>
    `;
    return html.replace('</body>', script + '</body>');
};

// First, build the TypeScript
console.log('🔨 Building TypeScript...');
exec('npm run build', (error, stdout, stderr) => {
    if (error) {
        console.error(`❌ Build error: ${error}`);
        return;
    }
    
    console.log('✅ Build complete!');
    
    // Initialize file tracking
    initFileTracking();
    
    // Start the HTTP server
    console.log(`\n🚀 Starting server on http://localhost:${PORT}`);
    console.log('🔄 Auto-refresh enabled!\n');
    
    const server = http.createServer((req, res) => {
        // Handle change detection endpoint
        if (req.url && req.url.startsWith('/check-changes')) {
            const hasChanges = checkForChanges();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ hasChanges }));
            return;
        }
        
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
                // Inject auto-refresh script for HTML files
                if (extname === '.html') {
                    content = injectAutoRefreshScript(content.toString());
                }
                
                res.writeHead(200, { 
                    'Content-Type': contentType,
                    'Cache-Control': 'no-cache, no-store, must-revalidate'
                });
                res.end(content, 'utf-8');
            }
        });
    });
    
    server.listen(PORT);
    
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
        process.exit(0);
    });
});