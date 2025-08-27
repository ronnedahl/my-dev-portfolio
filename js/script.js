(function() {
  'use strict';


// === index.js ===
/**
 * Type definitions for the AI Developer Portfolio
 * These types ensure type safety across the application
 */
/**
 * Local storage keys enum for type safety
 */
var StorageKey;
(function (StorageKey) {
    StorageKey["PreferredLanguage"] = "preferredLanguage";
})(StorageKey || (StorageKey = {}));
//# sourceMappingURL=index.js.map

// === index.js ===
/**
 * Translation module for internationalization
 * Provides all text content in English and Swedish
 */
const translations = {
    en: {
        // Navigation
        'nav-home': 'Home',
        'nav-about': 'About',
        'nav-skills': 'Skills',
        'nav-projects': 'Projects',
        'nav-contact': 'Contact',
        'nav-cv': 'Download CV',
        'lang-toggle': 'EN',
        'lang-toggle-aria': 'Switch language',
        // Hero Section
        'hero-line1': 'CRAFTING INTELLIGENT',
        'hero-line2': 'SOLUTIONS WITH AI',
        'hero-desc': 'Crafting intelligent solutions through code. Specialized in AI development, machine learning, and creating cutting-edge applications that push technology boundaries.',
        'hero-btn-projects': 'View AI Projects',
        'hero-btn-contact': 'Contact Me',
        'hero-btn-cv': 'Download CV',
        // About Section
        'about-title': 'About Me',
        'about-subtitle': 'AI Developer & Machine Learning Engineer',
        'about-p1': 'My journey into the world of AI is rooted in two years of full-time studies in web development, which gave me a deep understanding of what constitutes high-quality and sustainable code. This foundation is essential for my work today, where I combine traditional engineering practices with a modern, AI-assisted workflow.',
        'about-p2': 'For me, TypeScript is not a choice but a standard for building robust applications and catching errors before they reach the user. I always design my solutions with a modular architecture, making the code reusable, easy to test, and simple to scale. My philosophy is to write code that not only works today but is also easy for the entire team to maintain and debug in the future.',
        'about-p3': 'By using tools such as Gemini CLI and Claude, I can accelerate development, but it is my knowledge of these core principles that ensures the outcome is a professional and long-term sustainable product.',
        // Skills Section
        'skills-title': 'Technical Skills',
        'skill-ml': 'Machine Learning',
        'skill-python': 'Python',
        'skill-dataviz': 'Data Visualization',
        'skill-nlp': 'Natural Language Processing',
        'skill-cv': 'Computer Vision',
        'skill-dl': 'Deep Learning (TensorFlow)',
        // Projects Section
        'projects-title': 'Featured Projects',
        'project1-title': 'AI Assistant Platform',
        'project1-desc': 'A conversational AI platform that understands and responds to user queries in natural language.',
        'project2-title': 'Computer Vision System',
        'project2-desc': 'An advanced object detection and recognition system for persistent video streams. Built with high accuracy.',
        'project3-title': 'Predictive Analytics Tool',
        'project3-desc': 'A machine learning-based tool that provides sales forecasts and identifies potential market trends.',
        'project-link': 'View Live Project',
        // Contact Section
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
        // Page title
        'page-title': 'AI Coder Portfolio'
    },
    sv: {
        // Navigation
        'nav-home': 'Hem',
        'nav-about': 'Om mig',
        'nav-skills': 'Färdigheter',
        'nav-projects': 'Projekt',
        'nav-contact': 'Kontakt',
        'nav-cv': 'Ladda ner CV',
        'lang-toggle': 'SV',
        'lang-toggle-aria': 'Byt språk',
        // Hero Section
        'hero-line1': 'SKAPAR INTELLIGENTA',
        'hero-line2': 'LÖSNINGAR MED AI',
        'hero-desc': 'Skapar intelligenta lösningar genom kod. Specialiserad på AI-utveckling, maskininlärning och att skapa banbrytande applikationer som tänjder teknikens gränser.',
        'hero-btn-projects': 'Visa AI-projekt',
        'hero-btn-contact': 'Kontakta mig',
        'hero-btn-cv': 'Ladda ner CV',
        // About Section
        'about-title': 'Om mig',
        'about-subtitle': 'AI-utvecklare & Maskininlärningsingenjör',
        'about-p1': 'Min resa in i AI-världen har sin grund i två års heltidsstudier inom webbutveckling, vilket gav mig en djup förståelse för vad som utgör högkvalitativ och hållbar kod. Detta fundament är avgörande för mitt arbete idag, där jag kombinerar traditionella ingenjörsprinciper med ett modernt, AI-assisterat arbetsflöde.',
        'about-p2': 'För mig är TypeScript inte ett val utan en standard för att bygga robusta applikationer och fånga fel innan de når användaren. Jag designar alltid mina lösningar med en modulär arkitektur, vilket gör koden återanvändbar, lätt att testa och enkel att skala. Min filosofi är att skriva kod som inte bara fungerar idag utan också är lätt för hela teamet att underhålla och felsöka i framtiden.',
        'about-p3': 'Genom att använda verktyg som Gemini CLI och Claude kan jag accelerera utvecklingen, men det är min kunskap om dessa kärnprinciper som säkerställer att resultatet blir en professionell och långsiktigt hållbar produkt.',
        // Skills Section
        'skills-title': 'Tekniska färdigheter',
        'skill-ml': 'Maskininlärning',
        'skill-python': 'Python',
        'skill-dataviz': 'Datavisualisering',
        'skill-nlp': 'Naturlig språkbehandling',
        'skill-cv': 'Datorseende',
        'skill-dl': 'Djupinlärning (TensorFlow)',
        // Projects Section
        'projects-title': 'Utvalda projekt',
        'project1-title': 'AI-assistentplattform',
        'project1-desc': 'En konversations-AI-plattform som förstår och svarar på användarfrågor på naturligt språk.',
        'project2-title': 'Datorseendesystem',
        'project2-desc': 'Ett avancerat objektdetekterings- och igenkänningssystem för kontinuerliga videoströmmar. Byggt med hög precision.',
        'project3-title': 'Prediktivt analysverktyg',
        'project3-desc': 'Ett maskininlärningsbaserat verktyg som ger försäljningsprognoser och identifierar potentiella marknadstrender.',
        'project-link': 'Visa live-projekt',
        // Contact Section
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
        // Page title
        'page-title': 'AI-kodare Portfolio'
    }
};
//# sourceMappingURL=index.js.map

// === navigation.js ===
/**
 * Navigation module
 * Handles mobile menu toggle and smooth scroll behavior
 */
class Navigation {
    constructor() {
        this.scrollConfig = {
            threshold: 50,
            backgroundColor: 'rgba(10, 25, 47, 0.85)',
            backdropFilter: 'blur(10px)'
        };
        this.elements = {
            hamburger: document.querySelector('.hamburger'),
            navLinks: document.querySelector('.nav-links'),
            links: document.querySelectorAll('.nav-links li a'),
            header: document.querySelector('header')
        };
    }
    /**
     * Initialize all navigation functionality
     */
    init() {
        this.initHamburgerMenu();
        this.initScrollBehavior();
    }
    /**
     * Initialize hamburger menu toggle functionality
     */
    initHamburgerMenu() {
        if (!this.elements.hamburger || !this.elements.navLinks) {
            console.warn('Navigation elements not found');
            return;
        }
        // Toggle mobile menu
        this.elements.hamburger.addEventListener('click', () => {
            this.toggleMobileMenu();
        });
        // Close menu when link is clicked
        this.elements.links.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });
    }
    /**
     * Initialize scroll behavior for header background
     */
    initScrollBehavior() {
        if (!this.elements.header) {
            console.warn('Header element not found');
            return;
        }
        window.addEventListener('scroll', () => {
            this.updateHeaderOnScroll();
        });
    }
    /**
     * Toggle mobile menu visibility
     */
    toggleMobileMenu() {
        if (!this.elements.navLinks || !this.elements.hamburger)
            return;
        this.elements.navLinks.classList.toggle('nav-active');
        this.elements.hamburger.classList.toggle('toggle');
    }
    /**
     * Close mobile menu
     */
    closeMobileMenu() {
        if (!this.elements.navLinks || !this.elements.hamburger)
            return;
        if (this.elements.navLinks.classList.contains('nav-active')) {
            this.elements.navLinks.classList.remove('nav-active');
            this.elements.hamburger.classList.remove('toggle');
        }
    }
    /**
     * Update header background on scroll
     */
    updateHeaderOnScroll() {
        if (!this.elements.header)
            return;
        if (window.scrollY > this.scrollConfig.threshold) {
            this.elements.header.style.backgroundColor = this.scrollConfig.backgroundColor;
            this.elements.header.style.backdropFilter = this.scrollConfig.backdropFilter;
        }
        else {
            // Reset to original state
            this.elements.header.style.backgroundColor = '';
            this.elements.header.style.backdropFilter = '';
        }
    }
}
//# sourceMappingURL=navigation.js.map

// === languageSwitcher.js ===
/**
 * Language Switcher module
 * Handles internationalization and language switching functionality
 */
class LanguageSwitcher {
    constructor() {
        this.currentLanguage = 'en';
        this.elements = {
            languageToggle: document.getElementById('languageToggle'),
            langText: document.querySelector('.lang-text')
        };
        // Load saved language preference
        this.loadLanguagePreference();
    }
    /**
     * Initialize language switcher functionality
     */
    init() {
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
    getCurrentLanguage() {
        return this.currentLanguage;
    }
    /**
     * Toggle between languages
     */
    toggleLanguage() {
        this.currentLanguage = this.currentLanguage === 'en' ? 'sv' : 'en';
        this.updateLanguage();
    }
    /**
     * Update all translatable elements and UI
     */
    updateLanguage() {
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
    updateLanguageToggle() {
        if (!this.elements.langText || !this.elements.languageToggle)
            return;
        this.elements.langText.textContent = translations[this.currentLanguage]['lang-toggle'];
        this.elements.languageToggle.setAttribute('aria-label', translations[this.currentLanguage]['lang-toggle-aria']);
    }
    /**
     * Update all elements with data-translate attribute
     */
    updateTranslatableElements() {
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            if (!key || !translations[this.currentLanguage][key]) {
                console.warn(`Translation key not found: ${key}`);
                return;
            }
            const translation = translations[this.currentLanguage][key];
            if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
                element.placeholder = translation;
            }
            else {
                element.textContent = translation;
            }
        });
    }
    /**
     * Save language preference to localStorage
     */
    saveLanguagePreference() {
        try {
            localStorage.setItem(StorageKey.PreferredLanguage, this.currentLanguage);
        }
        catch (error) {
            console.warn('Failed to save language preference:', error);
        }
    }
    /**
     * Load language preference from localStorage
     */
    loadLanguagePreference() {
        try {
            const savedLanguage = localStorage.getItem(StorageKey.PreferredLanguage);
            if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'sv')) {
                this.currentLanguage = savedLanguage;
            }
        }
        catch (error) {
            console.warn('Failed to load language preference:', error);
        }
    }
}
//# sourceMappingURL=languageSwitcher.js.map

// === main.js ===
/**
 * Main entry point for the AI Developer Portfolio
 * Initializes all modules when DOM is ready
 */
/**
 * Initialize the application
 */
function initializeApp() {
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
}
else {
    // DOM is already ready
    initializeApp();
}
//# sourceMappingURL=main.js.map

})();