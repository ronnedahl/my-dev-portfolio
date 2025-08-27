/**
 * Type definitions for the AI Developer Portfolio
 * These types ensure type safety across the application
 */

/**
 * Supported languages for internationalization
 */
export type Language = 'en' | 'sv';

/**
 * Translation key types for compile-time safety
 */
export type TranslationKey = 
  // Navigation
  | 'nav-home' | 'nav-about' | 'nav-skills' | 'nav-projects' | 'nav-contact' 
  | 'nav-cv' | 'lang-toggle' | 'lang-toggle-aria'
  // Hero Section
  | 'hero-line1' | 'hero-line2' | 'hero-desc' | 'hero-btn-projects' 
  | 'hero-btn-contact' | 'hero-btn-cv'
  // About Section
  | 'about-title' | 'about-subtitle' | 'about-p1' | 'about-p2' | 'about-p3'
  // Skills Section
  | 'skills-title' | 'skill-ml' | 'skill-python' | 'skill-dataviz' 
  | 'skill-nlp' | 'skill-cv' | 'skill-dl'
  // Projects Section
  | 'projects-title' | 'project1-title' | 'project1-desc' | 'project2-title' 
  | 'project2-desc' | 'project3-title' | 'project3-desc' | 'project-link'
  // Contact Section
  | 'contact-title' | 'contact-subtitle' | 'contact-desc' | 'contact-location' 
  | 'contact-email' | 'contact-phone' | 'form-name' | 'form-email' 
  | 'form-message' | 'form-submit'
  // Page title
  | 'page-title';

/**
 * Translation dictionary structure
 */
export type TranslationDictionary = Record<TranslationKey, string>;

/**
 * Complete translations object structure
 */
export interface Translations {
  en: TranslationDictionary;
  sv: TranslationDictionary;
}

/**
 * DOM element references for navigation
 */
export interface NavigationElements {
  hamburger: HTMLElement | null;
  navLinks: HTMLElement | null;
  links: NodeListOf<HTMLAnchorElement>;
  header: HTMLElement | null;
}

/**
 * DOM element references for language switcher
 */
export interface LanguageElements {
  languageToggle: HTMLButtonElement | null;
  langText: HTMLElement | null;
}

/**
 * Configuration for scroll behavior
 */
export interface ScrollConfig {
  threshold: number;
  backgroundColor: string;
  backdropFilter: string;
}

/**
 * Local storage keys enum for type safety
 */
export enum StorageKey {
  PreferredLanguage = 'preferredLanguage'
}