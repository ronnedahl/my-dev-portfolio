/**
 * LanguageSwitcher Module - Handles internationalization
 * Features: Language toggle, persistence, dynamic content updates
 */
import { translations } from './Translations.js';
import { Storage } from './Storage.js';

export class LanguageSwitcher {
  constructor() {
    this.currentLanguage = 'en';
    this.supportedLanguages = ['en', 'sv'];
    
    this.elements = {
      languageToggle: null,
      langText: null
    };

    this.isInitialized = false;
  }

  /**
   * Initialize language switcher
   * @returns {boolean} Success status
   */
  init() {
    if (this.isInitialized) return true;

    this.cacheElements();
    this.loadLanguagePreference();
    
    if (!this.validateElements()) {
      console.warn('LanguageSwitcher: Toggle button not found');
      return false;
    }

    this.bindEvents();
    this.updateLanguage();
    this.isInitialized = true;
    return true;
  }

  /**
   * Cache DOM elements
   */
  cacheElements() {
    this.elements.languageToggle = document.getElementById('languageToggle');
    this.elements.langText = document.querySelector('.lang-text');
  }

  /**
   * Validate required elements
   * @returns {boolean} Validation status
   */
  validateElements() {
    return !!(this.elements.languageToggle);
  }

  /**
   * Bind event listeners
   */
  bindEvents() {
    this.elements.languageToggle.addEventListener('click', () => this.toggleLanguage());
  }

  /**
   * Get current language
   * @returns {string} Current language code
   */
  getCurrentLanguage() {
    return this.currentLanguage;
  }

  /**
   * Toggle between available languages
   */
  toggleLanguage() {
    const currentIndex = this.supportedLanguages.indexOf(this.currentLanguage);
    const nextIndex = (currentIndex + 1) % this.supportedLanguages.length;
    this.currentLanguage = this.supportedLanguages[nextIndex];
    this.updateLanguage();
  }

  /**
   * Update all language-dependent content
   */
  updateLanguage() {
    // Update document language
    document.documentElement.lang = this.currentLanguage;
    
    // Update page title
    if (translations[this.currentLanguage]['page-title']) {
      document.title = translations[this.currentLanguage]['page-title'];
    }

    // Update UI elements
    this.updateLanguageToggle();
    this.updateTranslatableElements();
    
    // Save preference
    this.saveLanguagePreference();
    
    // Dispatch custom event for other modules
    window.dispatchEvent(new CustomEvent('languageChanged', { 
      detail: { language: this.currentLanguage } 
    }));
  }

  /**
   * Update language toggle button
   */
  updateLanguageToggle() {
    if (!this.elements.langText || !this.elements.languageToggle) return;

    const langKey = translations[this.currentLanguage]['lang-toggle'];
    const ariaLabel = translations[this.currentLanguage]['lang-toggle-aria'];
    
    this.elements.langText.textContent = langKey || this.currentLanguage.toUpperCase();
    this.elements.languageToggle.setAttribute('aria-label', ariaLabel || 'Switch language');
  }

  /**
   * Update all elements with data-translate attribute
   */
  updateTranslatableElements() {
    const elements = document.querySelectorAll('[data-translate]');
    
    elements.forEach(element => {
      const key = element.getAttribute('data-translate');
      if (!key) return;

      const translation = this.getTranslation(key);
      if (!translation) {
        console.warn(`Translation missing for key: ${key}`);
        return;
      }

      // Handle different element types
      if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
        element.placeholder = translation;
      } else if (element instanceof HTMLButtonElement && element.type === 'submit') {
        element.textContent = translation;
      } else {
        element.textContent = translation;
      }
    });
  }

  /**
   * Get translation for a key
   * @param {string} key - Translation key
   * @returns {string|null} Translation or null
   */
  getTranslation(key) {
    return translations[this.currentLanguage]?.[key] || null;
  }

  /**
   * Save language preference to storage
   */
  saveLanguagePreference() {
    Storage.set(Storage.Keys.PreferredLanguage, this.currentLanguage);
  }

  /**
   * Load language preference from storage
   */
  loadLanguagePreference() {
    const savedLanguage = Storage.get(Storage.Keys.PreferredLanguage);
    
    if (savedLanguage && this.supportedLanguages.includes(savedLanguage)) {
      this.currentLanguage = savedLanguage;
    } else {
      // Try to detect from browser
      const browserLang = navigator.language.split('-')[0];
      if (this.supportedLanguages.includes(browserLang)) {
        this.currentLanguage = browserLang;
      }
    }
  }

  /**
   * Cleanup module
   */
  destroy() {
    if (this.elements.languageToggle) {
      this.elements.languageToggle.removeEventListener('click', this.toggleLanguage);
    }
    this.isInitialized = false;
  }
}