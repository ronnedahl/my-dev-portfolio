/**
 * Language Switcher module
 * Handles internationalization and language switching functionality
 */

import { Language, LanguageElements, TranslationKey, StorageKey } from '../types';
import { translations } from '../translations';

export class LanguageSwitcher {
  private currentLanguage: Language = 'en';
  private elements: LanguageElements;

  constructor() {
    this.elements = {
      languageToggle: document.getElementById('languageToggle') as HTMLButtonElement,
      langText: document.querySelector('.lang-text')
    };

    // Load saved language preference
    this.loadLanguagePreference();
  }

  /**
   * Initialize language switcher functionality
   */
  public init(): void {
    if (!this.elements.languageToggle) {
      console.warn('Language toggle button not found');
      return;
    }

    // Add click event listener
    this.elements.languageToggle.addEventListener('click', () => {
      this.toggleLanguage();
    });

    // Apply initial language
    this.updateLanguage();
  }

  /**
   * Get current language
   */
  public getCurrentLanguage(): Language {
    return this.currentLanguage;
  }

  /**
   * Toggle between languages
   */
  private toggleLanguage(): void {
    this.currentLanguage = this.currentLanguage === 'en' ? 'sv' : 'en';
    this.updateLanguage();
  }

  /**
   * Update all translatable elements and UI
   */
  private updateLanguage(): void {
    // Update HTML lang attribute
    document.documentElement.lang = this.currentLanguage;

    // Update page title
    document.title = translations[this.currentLanguage]['page-title'];

    // Update language toggle button
    this.updateLanguageToggle();

    // Update all translatable elements
    this.updateTranslatableElements();

    // Store language preference
    this.saveLanguagePreference();
  }

  /**
   * Update language toggle button
   */
  private updateLanguageToggle(): void {
    if (!this.elements.langText || !this.elements.languageToggle) return;

    this.elements.langText.textContent = translations[this.currentLanguage]['lang-toggle'];
    this.elements.languageToggle.setAttribute(
      'aria-label',
      translations[this.currentLanguage]['lang-toggle-aria']
    );
  }

  /**
   * Update all elements with data-translate attribute
   */
  private updateTranslatableElements(): void {
    const elements = document.querySelectorAll('[data-translate]');
    
    elements.forEach(element => {
      const key = element.getAttribute('data-translate') as TranslationKey;
      
      if (!key || !translations[this.currentLanguage][key]) {
        console.warn(`Translation key not found: ${key}`);
        return;
      }

      const translation = translations[this.currentLanguage][key];

      if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
        element.placeholder = translation;
      } else {
        element.textContent = translation;
      }
    });
  }

  /**
   * Save language preference to localStorage
   */
  private saveLanguagePreference(): void {
    try {
      localStorage.setItem(StorageKey.PreferredLanguage, this.currentLanguage);
    } catch (error) {
      console.warn('Failed to save language preference:', error);
    }
  }

  /**
   * Load language preference from localStorage
   */
  private loadLanguagePreference(): void {
    try {
      const savedLanguage = localStorage.getItem(StorageKey.PreferredLanguage) as Language | null;
      
      if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'sv')) {
        this.currentLanguage = savedLanguage;
      }
    } catch (error) {
      console.warn('Failed to load language preference:', error);
    }
  }
}