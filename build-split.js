/**
 * Code Splitting Build Script
 * Creates separate bundles for different features
 */

const fs = require('fs');
const path = require('path');

const config = {
  moduleDir: 'js/modules/',
  outputDir: 'js/bundles/'
};

/**
 * Process module for bundling
 */
function processModule(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  return content
    .replace(/^import\s+.*?from\s+['"].*?['"];?\s*$/gm, '')
    .replace(/^export\s+{[^}]*}\s*;?\s*$/gm, '')
    .replace(/^export\s+default\s+/gm, '')
    .replace(/^export\s+(const|let|var|function|class)\s+/gm, '$1 ');
}

/**
 * Create separate bundles
 */
function createBundles() {
  console.log('🔨 Creating separate bundles...');

  // Ensure output directory exists
  if (!fs.existsSync(config.outputDir)) {
    fs.mkdirSync(config.outputDir, { recursive: true });
  }

  // Core bundle (always loaded)
  const coreBundle = `
/**
 * Core Bundle - Essential functionality
 * Size optimized for initial load
 */
(function() {
  'use strict';

  ${processModule(path.join(config.moduleDir, 'Storage.js'))}

  ${processModule(path.join(config.moduleDir, 'Translations.js'))}

  ${processModule(path.join(config.moduleDir, 'LanguageSwitcher.js'))}

  ${processModule(path.join(config.moduleDir, 'Navigation.js'))}

  // Initialize core modules
  const navigation = new Navigation();
  navigation.init();
  
  const languageSwitcher = new LanguageSwitcher();
  languageSwitcher.init();
  
  // Expose Storage globally for other bundles
  window.Storage = Storage;
  
  console.log('Core bundle loaded');
})();
`;

  // Language bundle (no longer needed - moved to core)
  const languageBundle = `
/**
 * Language Bundle - Placeholder (functionality moved to core)
 * Kept for compatibility
 */
console.log('Language bundle loaded (functionality in core bundle)');
`;

  // Contact bundle (lazy loaded)
  const contactBundle = `
/**
 * Contact Bundle - Form validation and email
 * Loaded when user scrolls to contact section
 */
(function() {
  'use strict';

  // Import Storage from global scope (set by core bundle)
  const Storage = window.Storage;

  ${processModule(path.join(config.moduleDir, 'ContactForm.js'))}

  // Initialize contact form
  window.initContactForm = function() {
    const contactForm = new ContactForm();
    contactForm.init();
    console.log('Contact bundle loaded and initialized');
  };
})();
`;

  // Write bundles
  fs.writeFileSync(path.join(config.outputDir, 'core.js'), coreBundle);
  fs.writeFileSync(path.join(config.outputDir, 'language.js'), languageBundle);
  fs.writeFileSync(path.join(config.outputDir, 'contact.js'), contactBundle);

  console.log(`✅ Core bundle: ${(coreBundle.length / 1024).toFixed(2)} KB`);
  console.log(`✅ Language bundle: ${(languageBundle.length / 1024).toFixed(2)} KB`);
  console.log(`✅ Contact bundle: ${(contactBundle.length / 1024).toFixed(2)} KB`);
  console.log(`📦 Total: ${((coreBundle.length + languageBundle.length + contactBundle.length) / 1024).toFixed(2)} KB`);
}

/**
 * Create lazy loading script
 */
function createLazyLoader() {
  const lazyLoader = `
/**
 * Lazy Module Loader
 * Loads bundles on demand for better performance
 */
class LazyLoader {
  constructor() {
    this.loadedBundles = new Set();
    this.setupLazyLoading();
  }

  setupLazyLoading() {
    // Language functionality is now in core bundle - no lazy loading needed
    
    // Load contact bundle when contact section is visible
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.loadContactBundle();
            observer.unobserve(contactSection);
          }
        });
      });
      observer.observe(contactSection);
    }
  }

  async loadBundle(bundleName) {
    if (this.loadedBundles.has(bundleName)) return;

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = \`./js/bundles/\${bundleName}.js\`;
      script.onload = () => {
        this.loadedBundles.add(bundleName);
        resolve();
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  async loadLanguageBundle() {
    // Language functionality is now in core bundle
    console.log('Language functionality already available in core bundle');
  }

  async loadContactBundle() {
    try {
      await this.loadBundle('contact');
      if (window.initContactForm) {
        window.initContactForm();
      }
    } catch (error) {
      console.error('Failed to load contact bundle:', error);
    }
  }
}

// Initialize lazy loader
new LazyLoader();
`;

  fs.writeFileSync(path.join(config.outputDir, 'lazy-loader.js'), lazyLoader);
  console.log('✅ Lazy loader created');
}

// Run build
try {
  createBundles();
  createLazyLoader();
  console.log('\n🎉 Code splitting build completed!');
} catch (error) {
  console.error('\n❌ Build failed:', error);
  process.exit(1);
}