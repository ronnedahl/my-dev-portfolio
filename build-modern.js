/**
 * Modern Build Script for ES6 Modules
 * Bundles modular JavaScript files while preserving modern syntax
 */

const fs = require('fs');
const path = require('path');

// Configuration
const config = {
  sourceType: process.argv[2] || 'modules', // 'modules' or 'typescript'
  modulesDir: 'js/modules/',
  typescriptDir: 'js/dist/',
  outputFile: 'js/app.js',
  createLoader: process.argv.includes('--loader')
};

/**
 * Process ES6 module file
 */
function processModule(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const moduleName = path.basename(filePath, '.js');
  
  // Remove import/export statements for bundling
  const processedContent = content
    .replace(/^import\s+.*?from\s+['"].*?['"];?\s*$/gm, '')
    .replace(/^export\s+{[^}]*}\s*;?\s*$/gm, '')
    .replace(/^export\s+default\s+/gm, '')
    .replace(/^export\s+(const|let|var|function|class)\s+/gm, '$1 ');

  return { name: moduleName, content: processedContent };
}

/**
 * Bundle ES6 modules
 */
function bundleModules() {
  console.log('🔨 Building from ES6 modules...');

  // Module loading order (dependencies first)
  const moduleOrder = [
    'Storage.js',
    'Translations.js',
    'Navigation.js',
    'LanguageSwitcher.js',
    'ContactForm.js'
  ];

  let bundle = `/**
 * AI Developer Portfolio - Production Bundle
 * Built from modular ES6 architecture
 * Generated: ${new Date().toISOString()}
 */

(function() {
  'use strict';

`;

  // Process modules
  moduleOrder.forEach(moduleName => {
    const modulePath = path.join(config.modulesDir, moduleName);
    
    if (fs.existsSync(modulePath)) {
      const module = processModule(modulePath);
      bundle += `  // ========== ${module.name} Module ==========\n`;
      bundle += module.content.split('\n').map(line => '  ' + line).join('\n');
      bundle += '\n\n';
      console.log(`✅ Processed: ${moduleName}`);
    }
  });

  // Add main application logic
  bundle += `  // ========== Main Application ==========
  
  class PortfolioApp {
    constructor() {
      this.modules = {
        navigation: null,
        languageSwitcher: null,
        contactForm: null
      };
    }

    async init() {
      try {
        // Initialize Navigation
        this.modules.navigation = new Navigation();
        this.modules.navigation.init();

        // Initialize Language Switcher
        this.modules.languageSwitcher = new LanguageSwitcher();
        this.modules.languageSwitcher.init();

        // Initialize Contact Form
        this.modules.contactForm = new ContactForm();
        this.modules.contactForm.init();

        document.body.classList.add('app-ready');
        console.log('Portfolio Application initialized successfully');

      } catch (error) {
        console.error('Failed to initialize application:', error);
      }
    }
  }

  // Initialize when DOM is ready
  const app = new PortfolioApp();
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => app.init());
  } else {
    app.init();
  }

  // Expose for debugging in development
  if (window.location.hostname === 'localhost') {
    window.PortfolioApp = app;
  }

})();`;

  // Write bundle
  fs.writeFileSync(config.outputFile, bundle);
  console.log(`\n📦 Bundle created: ${config.outputFile}`);
  
  const stats = fs.statSync(config.outputFile);
  console.log(`📊 Bundle size: ${(stats.size / 1024).toFixed(2)} KB`);
}

/**
 * Bundle TypeScript output (legacy support)
 */
function bundleTypeScript() {
  console.log('🔨 Building from TypeScript output...');

  const fileOrder = [
    'types/index.js',
    'translations/index.js',
    'modules/navigation.js',
    'modules/languageSwitcher.js',
    'modules/contactForm.js',
    'main.js'
  ];

  let bundle = `(function() {
  'use strict';

`;

  fileOrder.forEach(file => {
    const filePath = path.join(config.typescriptDir, file);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      const cleanContent = content
        .replace(/export\s+{[^}]*}\s*;?/g, '')
        .replace(/export\s+default\s+/g, '')
        .replace(/export\s+(const|let|var|function|class)\s+/g, '$1 ')
        .replace(/import\s+.*?from\s+['"].*?['"];?\s*/g, '')
        .replace(/\/\/# sourceMappingURL=.*$/gm, '');
      
      bundle += `// === ${path.basename(file)} ===\n${cleanContent}\n`;
      console.log(`✅ Processed: ${file}`);
    }
  });

  bundle += '\n})();';

  fs.writeFileSync(config.outputFile, bundle);
  console.log(`\n📦 Bundle created: ${config.outputFile}`);
}

/**
 * Create module loader for native ES6 modules
 */
function createModuleLoader() {
  const loaderContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portfolio - Module Loader</title>
    <script type="module">
        // Native ES6 module loading
        import { Navigation } from './modules/Navigation.js';
        import { LanguageSwitcher } from './modules/LanguageSwitcher.js';
        import { ContactForm } from './modules/ContactForm.js';

        // Initialize modules
        const app = {
            navigation: new Navigation(),
            languageSwitcher: new LanguageSwitcher(),
            contactForm: new ContactForm()
        };

        // Start application
        function initApp() {
            app.navigation.init();
            app.languageSwitcher.init();
            app.contactForm.init();
            console.log('Modules loaded with native ES6 imports');
        }

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initApp);
        } else {
            initApp();
        }

        // Expose for debugging
        window.app = app;
    </script>
</head>
<body>
    <!-- Your HTML content here -->
</body>
</html>`;

  fs.writeFileSync('module-demo.html', loaderContent);
  console.log('📄 Created module-demo.html for ES6 module testing');
}

// Run build
try {
  if (config.sourceType === 'typescript') {
    bundleTypeScript();
  } else {
    bundleModules();
  }

  if (config.createLoader) {
    createModuleLoader();
  }

  console.log('\n✨ Build completed successfully!');
} catch (error) {
  console.error('\n❌ Build failed:', error);
  process.exit(1);
}