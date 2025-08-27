/**
 * Build script to compile TypeScript modules into a single JavaScript file
 * This ensures the portfolio works with vanilla HTML/JS while showing TypeScript skills
 */

const fs = require('fs');
const path = require('path');

// IIFE wrapper for the compiled code
const wrapperStart = `(function() {
  'use strict';

`;

const wrapperEnd = `
})();`;

// Read all compiled JS files from dist directory
const distPath = path.join(__dirname, 'js', 'dist');
const outputPath = path.join(__dirname, 'js', 'script.js');

// Function to get all JS files recursively
function getJsFiles(dir) {
  let results = [];
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      results = results.concat(getJsFiles(filePath));
    } else if (file.endsWith('.js') && !file.endsWith('.map')) {
      results.push(filePath);
    }
  }
  
  return results;
}

// Order matters for dependencies
const fileOrder = [
  'types/index.js',
  'translations/index.js',
  'modules/navigation.js',
  'modules/languageSwitcher.js',
  'main.js'
];

try {
  // Check if dist directory exists
  if (!fs.existsSync(distPath)) {
    console.error('Error: js/dist directory not found. Run "npm run build" first.');
    process.exit(1);
  }

  // Get all JS files
  const allFiles = getJsFiles(distPath);
  
  // Sort files according to fileOrder
  const sortedFiles = fileOrder
    .map(file => path.join(distPath, file))
    .filter(file => fs.existsSync(file));

  // Read and concatenate all files
  let combinedCode = wrapperStart;
  
  for (const file of sortedFiles) {
    const content = fs.readFileSync(file, 'utf8');
    // Remove export statements and add file separator
    const cleanedContent = content
      .replace(/export\s+{[^}]*}\s*;?/g, '')
      .replace(/export\s+default\s+/g, '')
      .replace(/export\s+(const|let|var|function|class)\s+/g, '$1 ')
      .replace(/import\s+.*?from\s+['"].*?['"];?\s*/g, '');
    
    combinedCode += `\n// === ${path.basename(file)} ===\n${cleanedContent}\n`;
  }
  
  combinedCode += wrapperEnd;
  
  // Write the combined file
  fs.writeFileSync(outputPath, combinedCode);
  
  console.log(`✅ Successfully bundled TypeScript to ${outputPath}`);
  console.log(`📦 Bundled ${sortedFiles.length} files`);
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}