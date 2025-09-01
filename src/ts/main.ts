/**
 * Main entry point for the AI Developer Portfolio
 * Initializes all modules when DOM is ready
 */

import { Navigation } from './modules/navigation';
import { ContactForm } from './modules/contactForm';
// TEMPORARILY DISABLED FOR DEVELOPMENT - Uncomment when ready for production
// import { LanguageSwitcher } from './modules/languageSwitcher';

function initializeApp(): void {
  // Initialize navigation module
  const navigation = new Navigation();
  navigation.init();

  // Language switcher disabled for development
  // const languageSwitcher = new LanguageSwitcher();
  // languageSwitcher.init();

  // Initialize contact form
  const contactForm = new ContactForm();
  contactForm.init();

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