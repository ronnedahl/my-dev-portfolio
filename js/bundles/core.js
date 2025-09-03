
/**
 * Core Bundle - Essential functionality
 * Size optimized for initial load
 */
(function() {
  'use strict';

  /**
 * Storage Module - Handles all localStorage operations
 * Provides a centralized, type-safe interface for browser storage
 */
class Storage {
  static Keys = {
    PreferredLanguage: 'preferredLanguage',
    RateLimit: 'contactFormRateLimit'
  };

  /**
   * Get item from localStorage with error handling
   * @param {string} key - Storage key
   * @returns {any} Parsed value or null
   */
  static get(key) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.warn(`Failed to get ${key} from storage:`, error);
      return null;
    }
  }

  /**
   * Set item in localStorage with error handling
   * @param {string} key - Storage key
   * @param {any} value - Value to store
   * @returns {boolean} Success status
   */
  static set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.warn(`Failed to set ${key} in storage:`, error);
      return false;
    }
  }

  /**
   * Remove item from localStorage
   * @param {string} key - Storage key
   */
  static remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn(`Failed to remove ${key} from storage:`, error);
    }
  }

  /**
   * Clear all items from localStorage
   */
  static clear() {
    try {
      localStorage.clear();
    } catch (error) {
      console.warn('Failed to clear storage:', error);
    }
  }
}

  /**
 * Translations Module - Multilingual content management
 * Supports English and Swedish with easy extensibility
 */
const translations = {
  en: {
    'nav-home': 'Home',
    'nav-about': 'About',
    'nav-skills': 'Skills',
    'nav-projects': 'Projects',
    'nav-contact': 'Contact',
    'nav-cv': 'Download CV',
    'lang-toggle': 'EN',
    'lang-toggle-aria': 'Switch language',
    'hero-line1': 'HAVING FUN WITH AI WHILE',
    'hero-line2': 'BUILDING SMART SOLUTIONS',
    'hero-desc': 'I love turning ideas into code – especially when AI is involved. From machine learning to smart apps, I\'m all about exploring, experimenting, and building things that push tech (and myself) a little further every day.Launching live projects on my Hetzner server has shown me the thrill of bringing ideas into the real world – and every new challenge pushes both my skills and curiosity a little further each day.',
    'hero-btn-projects': 'View AI Projects',
    'hero-btn-contact': 'Contact Me',
    'hero-btn-cv': 'Download CV',
    'about-title': 'About Me',
    'about-subtitle': 'AI Developer & Machine Learning Engineer',
    'about-p1': 'My journey into the world of AI is rooted in two years of full-time studies in web development, which gave me a deep understanding of what constitutes high-quality and sustainable code. This foundation is essential for my work today, where I combine traditional engineering practices with a modern, AI-assisted workflow.',
    'about-p2': 'For me, TypeScript is not a choice but a standard for building robust applications and catching errors before they reach the user. I always design my solutions with a modular architecture, making the code reusable, easy to test, and simple to scale. My philosophy is to write code that not only works today but is also easy for the entire team to maintain and debug in the future.',
    'about-p3': 'By using tools such as Gemini CLI and Claude, I can accelerate development, but it is my knowledge of these core principles that ensures the outcome is a professional and long-term sustainable product.',
    'skills-title': 'Technical Skills',
    'skill-ml': 'Machine Learning',
    'skill-python': 'Python',
    'skill-dataviz': 'NPC Servers',
    'skill-nlp': 'Natural Language Processing',
    'skill-cv': 'Hetzner Server',
    'skill-deployment': 'Deployment (Hetzner / Serverless)',
    'skill-dl': 'Claude Code',
    'skill-vector': 'Vector Databases',
    'projects-title': 'Featured Projects',
    'project1-title': 'Interactive Resume Chatbot',
    'project1-desc': 'Tired of reading PDF files? Ask your questions about my experience, projects, or skills directly to this AI assistant. Built with RAG architecture to guarantee precise, fact-based answers straight from my CV.',
    'project2-title': 'Computer Vision System',
    'project2-desc': 'An advanced object detection and recognition system for persistent video streams. Built with high accuracy.',
    'project3-title': 'Predictive Analytics Tool',
    'project3-desc': 'A machine learning-based tool that provides sales forecasts and identifies potential market trends.',
    'project-link': 'View Live Project',
    'project-code': 'View Code',
    'contact-title': 'Get In Touch',
    'contact-subtitle': 'Let\'s Connect',
    'contact-desc': 'I\'m always open to discussing new projects, creative ideas or opportunities. Feel free to reach out using the form or through my contact details.',
    'contact-location': 'Karlstad, Värmland',
    'contact-email': 'dev.peter.ai@gmail.com',
    'contact-phone': '+46 704893020',
    'form-name': 'Name',
    'form-email': 'Email',
    'form-message': 'Message',
    'form-submit': 'Send Message',
    'page-title': 'AI Coder Portfolio'
  },
  sv: {
    'nav-home': 'Hem',
    'nav-about': 'Om mig',
    'nav-skills': 'Färdigheter',
    'nav-projects': 'Projekt',
    'nav-contact': 'Kontakt',
    'nav-cv': 'Ladda ner CV',
    'lang-toggle': 'SV',
    'lang-toggle-aria': 'Byt språk',
    'hero-line1': 'HAR KUL MED AI MEDAN',
    'hero-line2': 'JAG BYGGER SMARTA LÖSNINGAR',
    'hero-desc': 'Jag älskar att förvandla idéer till kod – särskilt när AI är inblandat. Från maskininlärning till smarta appar handlar det för mig om att utforska, experimentera och bygga saker som driver tekniken (och mig själv) lite längre fram varje dag.Att lansera liveprojekt på min Hetzner-server har visat mig kicken i att förvandla idéer till verklighet – och varje ny utmaning driver både mina färdigheter och min nyfikenhet lite längre för varje dag.',
    'hero-btn-projects': 'Visa AI-projekt',
    'hero-btn-contact': 'Kontakta mig',
    'hero-btn-cv': 'Ladda ner CV',
    'about-title': 'Om mig',
    'about-subtitle': 'AI-utvecklare & Maskininlärningsingenjör',
    'about-p1': 'Min resa in i AI-världen har sin grund i två års heltidsstudier inom webbutveckling, vilket gav mig en djup förståelse för vad som utgör högkvalitativ och hållbar kod. Detta fundament är avgörande för mitt arbete idag, där jag kombinerar traditionella ingenjörsprinciper med ett modernt, AI-assisterat arbetsflöde.',
    'about-p2': 'För mig är TypeScript inte ett val utan en standard för att bygga robusta applikationer och fånga fel innan de når användaren. Jag designar alltid mina lösningar med en modulär arkitektur, vilket gör koden återanvändbar, lätt att testa och enkel att skala. Min filosofi är att skriva kod som inte bara fungerar idag utan också är lätt för hela teamet att underhålla och felsöka i framtiden.',
    'about-p3': 'Genom att använda verktyg som Gemini CLI och Claude kan jag accelerera utvecklingen, men det är min kunskap om dessa kärnprinciper som säkerställer att resultatet blir en professionell och långsiktigt hållbar produkt.',
    'skills-title': 'Tekniska färdigheter',
    'skill-ml': 'Maskininlärning',
    'skill-python': 'Python',
    'skill-dataviz': 'NPC Servers',
    'skill-nlp': 'Naturlig språkbehandling',
    'skill-cv': 'Hetzner Server',
    'skill-deployment': 'Distribution (Hetzner / Serverlös)',
    'skill-dl': 'Claude Code',
    'skill-vector': 'Vektordatabaser',
    'projects-title': 'Utvalda projekt',
    'project1-title': 'Interaktiv CV-Chatbot',
    'project1-desc': 'Trött på att läsa PDF-filer? Ställ dina frågor om min erfarenhet, mina projekt eller kunskaper direkt till denna AI-assistent. Byggd med RAG-arkitektur för att garantera precisa, faktabaserade svar direkt från mitt CV.',
    'project2-title': 'Datorseendesystem',
    'project2-desc': 'Ett avancerat objektdetekterings- och igenkänningssystem för kontinuerliga videoströmmar. Byggt med hög precision.',
    'project3-title': 'Prediktivt analysverktyg',
    'project3-desc': 'Ett maskininlärningsbaserat verktyg som ger försäljningsprognoser och identifierar potentiella marknadstrender.',
    'project-link': 'Visa live-projekt',
    'project-code': 'Visa Koden',
    'contact-title': 'Kontakta mig',
    'contact-subtitle': 'Låt oss koppla upp',
    'contact-desc': 'Jag är alltid öppen för att diskutera nya projekt, kreativa idéer eller möjligheter. Kontakta mig gärna via formuläret eller genom mina kontaktuppgifter.',
    'contact-location': 'Karlstad, Värmland',
    'contact-email': 'dev.peter.ai@gmail.com',
    'contact-phone': '+46 704893020',
    'form-name': 'Namn',
    'form-email': 'E-post',
    'form-message': 'Meddelande',
    'form-submit': 'Skicka meddelande',
    'page-title': 'AI-kodare Portfolio'
  }
};

  /**
 * LanguageSwitcher Module - Handles internationalization
 * Features: Language toggle, persistence, dynamic content updates
 */


class LanguageSwitcher {
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

  /**
 * Navigation Module - Handles responsive navigation and scroll behavior
 * Features: Mobile menu toggle, scroll-based styling, smooth navigation
 */
class Navigation {
  constructor() {
    this.scrollConfig = {
      threshold: 50,
      backgroundColor: 'rgba(10, 25, 47, 0.85)',
      backdropFilter: 'blur(10px)'
    };

    this.elements = {
      hamburger: null,
      navLinks: null,
      links: [],
      header: null
    };

    this.isInitialized = false;
  }

  /**
   * Initialize navigation module
   * @returns {boolean} Success status
   */
  init() {
    if (this.isInitialized) return true;

    this.cacheElements();
    
    if (!this.validateElements()) {
      console.error('Navigation: Required elements not found');
      return false;
    }

    this.bindEvents();
    this.isInitialized = true;
    return true;
  }

  /**
   * Cache DOM elements for performance
   */
  cacheElements() {
    this.elements.hamburger = document.querySelector('.hamburger');
    this.elements.navLinks = document.querySelector('.nav-links');
    this.elements.links = Array.from(document.querySelectorAll('.nav-links li a'));
    this.elements.header = document.querySelector('header');
  }

  /**
   * Validate required elements exist
   * @returns {boolean} Validation status
   */
  validateElements() {
    return !!(this.elements.header);
  }

  /**
   * Bind event listeners
   */
  bindEvents() {
    // Mobile menu events
    if (this.elements.hamburger && this.elements.navLinks) {
      this.elements.hamburger.addEventListener('click', () => this.toggleMobileMenu());
      
      this.elements.links.forEach(link => {
        link.addEventListener('click', () => this.closeMobileMenu());
      });
    }

    // Scroll events
    if (this.elements.header) {
      this.handleScroll = this.handleScroll.bind(this);
      window.addEventListener('scroll', this.handleScroll, { passive: true });
    }
  }

  /**
   * Toggle mobile menu state
   */
  toggleMobileMenu() {
    this.elements.navLinks.classList.toggle('nav-active');
    this.elements.hamburger.classList.toggle('toggle');
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = 
      this.elements.navLinks.classList.contains('nav-active') ? 'hidden' : '';
  }

  /**
   * Close mobile menu
   */
  closeMobileMenu() {
    if (this.elements.navLinks.classList.contains('nav-active')) {
      this.elements.navLinks.classList.remove('nav-active');
      this.elements.hamburger.classList.remove('toggle');
      document.body.style.overflow = '';
    }
  }

  /**
   * Handle scroll events
   */
  handleScroll() {
    const scrolled = window.scrollY > this.scrollConfig.threshold;
    
    if (scrolled) {
      this.elements.header.style.backgroundColor = this.scrollConfig.backgroundColor;
      this.elements.header.style.backdropFilter = this.scrollConfig.backdropFilter;
      this.elements.header.classList.add('scrolled');
    } else {
      this.elements.header.style.backgroundColor = '';
      this.elements.header.style.backdropFilter = '';
      this.elements.header.classList.remove('scrolled');
    }
  }

  /**
   * Cleanup module
   */
  destroy() {
    window.removeEventListener('scroll', this.handleScroll);
    this.isInitialized = false;
  }
}

  // Initialize core modules
  const navigation = new Navigation();
  navigation.init();
  
  const languageSwitcher = new LanguageSwitcher();
  languageSwitcher.init();
  
  // Expose Storage globally for other bundles
  window.Storage = Storage;
  
  console.log('Core bundle loaded');
})();
