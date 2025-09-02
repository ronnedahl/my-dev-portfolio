
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
      script.src = `./js/bundles/${bundleName}.js`;
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
