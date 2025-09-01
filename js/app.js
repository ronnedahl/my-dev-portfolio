(function() {
  'use strict';


// === index.js ===
var StorageKey;
(function (StorageKey) {
    StorageKey["PreferredLanguage"] = "preferredLanguage";
})(StorageKey || (StorageKey = {}));
//# sourceMappingURL=index.js.map

// === index.js ===
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
        'skill-dl': 'Claude Code',
        'projects-title': 'Featured Projects',
        'project1-title': 'Interactive Resume Chatbot',
        'project1-desc': 'Tired of reading PDF files? Ask your questions about my experience, projects, or skills directly to this AI assistant. Built with RAG architecture to guarantee precise, fact-based answers straight from my CV.',
        'project2-title': 'Computer Vision System',
        'project2-desc': 'An advanced object detection and recognition system for persistent video streams. Built with high accuracy.',
        'project3-title': 'Predictive Analytics Tool',
        'project3-desc': 'A machine learning-based tool that provides sales forecasts and identifies potential market trends.',
        'project-link': 'View Live Project',
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
        'skill-dl': 'Claude Code',
        'projects-title': 'Utvalda projekt',
        'project1-title': 'Interaktiv CV-Chatbot',
        'project1-desc': 'Trött på att läsa PDF-filer? Ställ dina frågor om min erfarenhet, mina projekt eller kunskaper direkt till denna AI-assistent. Byggd med RAG-arkitektur för att garantera precisa, faktabaserade svar direkt från mitt CV.',
        'project2-title': 'Datorseendesystem',
        'project2-desc': 'Ett avancerat objektdetekterings- och igenkänningssystem för kontinuerliga videoströmmar. Byggt med hög precision.',
        'project3-title': 'Prediktivt analysverktyg',
        'project3-desc': 'Ett maskininlärningsbaserat verktyg som ger försäljningsprognoser och identifierar potentiella marknadstrender.',
        'project-link': 'Visa live-projekt',
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
//# sourceMappingURL=index.js.map

// === navigation.js ===
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
    init() {
        this.initHamburgerMenu();
        this.initScrollBehavior();
    }
    initHamburgerMenu() {
        if (!this.elements.hamburger || !this.elements.navLinks) {
            console.warn('Navigation elements not found');
            return;
        }
        this.elements.hamburger.addEventListener('click', () => {
            this.toggleMobileMenu();
        });
        this.elements.links.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });
    }
    initScrollBehavior() {
        if (!this.elements.header) {
            console.warn('Header element not found');
            return;
        }
        window.addEventListener('scroll', () => {
            this.updateHeaderOnScroll();
        });
    }
    toggleMobileMenu() {
        if (!this.elements.navLinks || !this.elements.hamburger)
            return;
        this.elements.navLinks.classList.toggle('nav-active');
        this.elements.hamburger.classList.toggle('toggle');
    }
    closeMobileMenu() {
        if (!this.elements.navLinks || !this.elements.hamburger)
            return;
        if (this.elements.navLinks.classList.contains('nav-active')) {
            this.elements.navLinks.classList.remove('nav-active');
            this.elements.hamburger.classList.remove('toggle');
        }
    }
    updateHeaderOnScroll() {
        if (!this.elements.header)
            return;
        if (window.scrollY > this.scrollConfig.threshold) {
            this.elements.header.style.backgroundColor = this.scrollConfig.backgroundColor;
            this.elements.header.style.backdropFilter = this.scrollConfig.backdropFilter;
        }
        else {
            this.elements.header.style.backgroundColor = '';
            this.elements.header.style.backdropFilter = '';
        }
    }
}
//# sourceMappingURL=navigation.js.map

// === languageSwitcher.js ===
class LanguageSwitcher {
    constructor() {
        this.currentLanguage = 'en';
        this.elements = {
            languageToggle: document.getElementById('languageToggle'),
            langText: document.querySelector('.lang-text')
        };
        this.loadLanguagePreference();
    }
    init() {
        if (!this.elements.languageToggle) {
            console.warn('Language toggle button not found');
            return;
        }
        this.elements.languageToggle.addEventListener('click', () => {
            this.toggleLanguage();
        });
        this.updateLanguage();
    }
    getCurrentLanguage() {
        return this.currentLanguage;
    }
    toggleLanguage() {
        this.currentLanguage = this.currentLanguage === 'en' ? 'sv' : 'en';
        this.updateLanguage();
    }
    updateLanguage() {
        document.documentElement.lang = this.currentLanguage;
        document.title = translations[this.currentLanguage]['page-title'];
        this.updateLanguageToggle();
        this.updateTranslatableElements();
        this.saveLanguagePreference();
    }
    updateLanguageToggle() {
        if (!this.elements.langText || !this.elements.languageToggle)
            return;
        this.elements.langText.textContent = translations[this.currentLanguage]['lang-toggle'];
        this.elements.languageToggle.setAttribute('aria-label', translations[this.currentLanguage]['lang-toggle-aria']);
    }
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
    saveLanguagePreference() {
        try {
            localStorage.setItem(StorageKey.PreferredLanguage, this.currentLanguage);
        }
        catch (error) {
            console.warn('Failed to save language preference:', error);
        }
    }
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

// === contactForm.js ===
class ContactForm {
    constructor() {
        var _a;
        this.MAX_ATTEMPTS = 3;
        this.RATE_LIMIT_WINDOW = 60000;
        this.MIN_MESSAGE_LENGTH = 10;
        this.MAX_MESSAGE_LENGTH = 1000;
        this.SERVICE_ID = 'service_6pjq45y';
        this.TEMPLATE_ID = 'template_acxd2eb';
        this.PUBLIC_KEY = 'DHIoieBVznOFolr6S';
        this.form = document.querySelector('.contact-form');
        this.submitButton = ((_a = this.form) === null || _a === void 0 ? void 0 : _a.querySelector('button[type="submit"]')) || null;
    }
    init() {
        if (!this.form) {
            console.error('Contact form not found');
            return;
        }
        this.initializeEmailJS();
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
        this.addRealtimeValidation();
    }
    initializeEmailJS() {
        try {
            emailjs.init(this.PUBLIC_KEY);
            console.log('EmailJS initialized successfully');
        }
        catch (error) {
            console.error('Failed to initialize EmailJS:', error);
        }
    }
    async handleSubmit(e) {
        e.preventDefault();
        if (!this.form || !this.submitButton)
            return;
        if (!this.checkRateLimit()) {
            this.showMessage('Please wait before sending another message', 'error');
            return;
        }
        const formData = this.getFormData();
        const validation = this.validateFormData(formData);
        if (!validation.valid) {
            this.showMessage(validation.message, 'error');
            return;
        }
        this.setFormState(false);
        this.submitButton.textContent = 'Sending...';
        try {
            const response = await emailjs.sendForm(this.SERVICE_ID, this.TEMPLATE_ID, this.form, this.PUBLIC_KEY);
            if (response.status === 200) {
                this.showMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
                this.form.reset();
                this.updateRateLimit();
            }
            else {
                throw new Error('Failed to send message');
            }
        }
        catch (error) {
            console.error('EmailJS error:', error);
            this.showMessage('Failed to send message. Please try again later.', 'error');
        }
        finally {
            this.setFormState(true);
            this.submitButton.textContent = 'Send Message';
        }
    }
    getFormData() {
        const formElement = this.form;
        const nameInput = formElement.querySelector('#name');
        const emailInput = formElement.querySelector('#email');
        const messageInput = formElement.querySelector('#message');
        return {
            name: this.sanitizeInput((nameInput === null || nameInput === void 0 ? void 0 : nameInput.value) || ''),
            email: this.sanitizeInput((emailInput === null || emailInput === void 0 ? void 0 : emailInput.value) || ''),
            message: this.sanitizeInput((messageInput === null || messageInput === void 0 ? void 0 : messageInput.value) || '')
        };
    }
    sanitizeInput(input) {
        const div = document.createElement('div');
        div.textContent = input.trim();
        return div.innerHTML;
    }
    validateFormData(data) {
        if (!data.name || data.name.length < 2) {
            return { valid: false, message: 'Please enter a valid name (at least 2 characters)' };
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            return { valid: false, message: 'Please enter a valid email address' };
        }
        if (!data.message || data.message.length < this.MIN_MESSAGE_LENGTH) {
            return { valid: false, message: `Message must be at least ${this.MIN_MESSAGE_LENGTH} characters` };
        }
        if (data.message.length > this.MAX_MESSAGE_LENGTH) {
            return { valid: false, message: `Message must be less than ${this.MAX_MESSAGE_LENGTH} characters` };
        }
        if (this.isSpam(data.message)) {
            return { valid: false, message: 'Message appears to contain spam content' };
        }
        return { valid: true, message: '' };
    }
    isSpam(message) {
        const spamPatterns = [
            /\b(viagra|cialis|casino|lottery|winner|prize)\b/i,
            /\b(click here|buy now|limited offer)\b/i,
            /(http|https):\/\/[^\s]+/g
        ];
        return spamPatterns.some(pattern => pattern.test(message));
    }
    checkRateLimit() {
        const rateLimitKey = 'contactFormRateLimit';
        const now = Date.now();
        try {
            const stored = localStorage.getItem(rateLimitKey);
            if (!stored)
                return true;
            const rateLimit = JSON.parse(stored);
            if (now > rateLimit.resetTime) {
                return true;
            }
            return rateLimit.count < this.MAX_ATTEMPTS;
        }
        catch (_a) {
            return true;
        }
    }
    updateRateLimit() {
        const rateLimitKey = 'contactFormRateLimit';
        const now = Date.now();
        try {
            const stored = localStorage.getItem(rateLimitKey);
            let rateLimit;
            if (stored) {
                rateLimit = JSON.parse(stored);
                if (now > rateLimit.resetTime) {
                    rateLimit = { count: 1, resetTime: now + this.RATE_LIMIT_WINDOW };
                }
                else {
                    rateLimit.count++;
                }
            }
            else {
                rateLimit = { count: 1, resetTime: now + this.RATE_LIMIT_WINDOW };
            }
            localStorage.setItem(rateLimitKey, JSON.stringify(rateLimit));
        }
        catch (error) {
            console.error('Failed to update rate limit:', error);
        }
    }
    setFormState(enabled) {
        if (!this.form)
            return;
        const inputs = this.form.querySelectorAll('input, textarea, button');
        inputs.forEach(input => {
            input.disabled = !enabled;
        });
    }
    showMessage(message, type) {
        var _a, _b;
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message form-message-${type}`;
        messageDiv.textContent = message;
        (_b = (_a = this.form) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.insertBefore(messageDiv, this.form.nextSibling);
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
    addRealtimeValidation() {
        var _a;
        if (!this.form)
            return;
        const emailField = this.form.querySelector('#email');
        if (emailField) {
            emailField.addEventListener('blur', () => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailField.value)) {
                    emailField.classList.add('error');
                }
                else {
                    emailField.classList.remove('error');
                }
            });
        }
        const messageField = this.form.querySelector('#message');
        if (messageField) {
            const counter = document.createElement('div');
            counter.className = 'message-counter';
            (_a = messageField.parentElement) === null || _a === void 0 ? void 0 : _a.appendChild(counter);
            messageField.addEventListener('input', () => {
                const length = messageField.value.length;
                counter.textContent = `${length}/${this.MAX_MESSAGE_LENGTH}`;
                if (length > this.MAX_MESSAGE_LENGTH) {
                    counter.classList.add('error');
                }
                else {
                    counter.classList.remove('error');
                }
            });
        }
    }
}
//# sourceMappingURL=contactForm.js.map

// === main.js ===
function initializeApp() {
    const navigation = new Navigation();
    navigation.init();
    const contactForm = new ContactForm();
    contactForm.init();
    console.log('Portfolio application initialized successfully');
}
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
}
else {
    initializeApp();
}
//# sourceMappingURL=main.js.map

})();