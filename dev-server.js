/**
 * Development server for Windows compatibility
 * Runs TypeScript build and starts a local server
 */

const { exec, spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8000;

// First, build the TypeScript
console.log('🔨 Building TypeScript...');
exec('npm run build', (error, stdout, stderr) => {
    if (error) {
        console.error(`❌ Build error: ${error}`);
        return;
    }
    
    console.log('✅ Build complete!');
    
    // Start the HTTP server
    console.log(`\n🚀 Starting server on http://localhost:${PORT}\n`);
    
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
            '.svg': 'image/svg+xml'
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
                res.writeHead(200, { 'Content-Type': contentType });
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