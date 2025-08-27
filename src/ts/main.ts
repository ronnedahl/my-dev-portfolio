/**
 * Main entry point for the AI Developer Portfolio
 * Initializes all modules when DOM is ready
 */

import { Navigation } from './modules/navigation';
import { LanguageSwitcher } from './modules/languageSwitcher';

/**
 * Initialize the application
 */
function initializeApp(): void {
  // Initialize navigation module
  const navigation = new Navigation();
  navigation.init();

  // Initialize language switcher
  const languageSwitcher = new LanguageSwitcher();
  languageSwitcher.init();

  // Log initialization for debugging
  console.log('Portfolio application initialized successfully');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  // DOM is already ready
  initializeApp();
}