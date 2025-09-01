const fs = require('fs');
const path = require('path');
const { minify } = require('terser');

const distPath = path.join(__dirname, 'js', 'dist');
const outputPath = path.join(__dirname, 'js');

// Modern ES6 module wrapper
const moduleWrapper = {
  start: `(() => {
  'use strict';
  
  const modules = {};
  const exports = {};
  
`,
  end: `
  
  // Initialize application
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => exports.initializeApp());
  } else {
    exports.initializeApp();
  }
})();`
};

async function build() {
  try {
    // Ensure output directory exists
    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath, { recursive: true });
    }

    // Read all TypeScript output files
    const files = {
      types: fs.readFileSync(path.join(distPath, 'types/index.js'), 'utf8'),
      translations: fs.readFileSync(path.join(distPath, 'translations/index.js'), 'utf8'),
      navigation: fs.readFileSync(path.join(distPath, 'modules/navigation.js'), 'utf8'),
      contactForm: fs.readFileSync(path.join(distPath, 'modules/contactForm.js'), 'utf8'),
      main: fs.readFileSync(path.join(distPath, 'main.js'), 'utf8')
    };

    // Clean up exports and create module pattern
    let combinedCode = moduleWrapper.start;

    // Add types (minimal, just what's needed)
    combinedCode += `
  // Type definitions
  const StorageKey = { PreferredLanguage: "preferredLanguage" };
  `;

    // Add translations as a module
    combinedCode += `
  // Translations module
  modules.translations = (() => {
    ${files.translations
      .replace(/export\s+const\s+translations/g, 'const translations')
      .replace(/\/\/# sourceMappingURL=.*$/gm, '')}
    return translations;
  })();
  `;

    // Add Navigation class
    combinedCode += `
  // Navigation module
  modules.Navigation = (() => {
    ${files.navigation
      .replace(/class Navigation/g, 'const Navigation = class')
      .replace(/\/\/# sourceMappingURL=.*$/gm, '')}
    return Navigation;
  })();
  `;

    // Add ContactForm class
    combinedCode += `
  // Contact Form module
  modules.ContactForm = (() => {
    ${files.contactForm
      .replace(/class ContactForm/g, 'const ContactForm = class')
      .replace(/\/\/# sourceMappingURL=.*$/gm, '')}
    return ContactForm;
  })();
  `;

    // Add main initialization
    combinedCode += `
  // Application initialization
  exports.initializeApp = () => {
    const navigation = new modules.Navigation();
    navigation.init();
    
    const contactForm = new modules.ContactForm();
    contactForm.init();
  };
  `;

    combinedCode += moduleWrapper.end;

    // Write unminified version for development
    fs.writeFileSync(path.join(outputPath, 'app.js'), combinedCode);

    // Create minified production version
    const minified = await minify(combinedCode, {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info']
      },
      mangle: {
        toplevel: true
      },
      format: {
        comments: false
      }
    });

    if (minified.code) {
      fs.writeFileSync(path.join(outputPath, 'app.min.js'), minified.code);
    }

    console.log('✅ Build completed successfully');
    console.log(`📦 Generated app.js (${(combinedCode.length / 1024).toFixed(2)} KB)`);
    console.log(`📦 Generated app.min.js (${(minified.code.length / 1024).toFixed(2)} KB)`);

  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

build();