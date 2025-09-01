// Language switcher module - handles language selection and persistence
class LanguageSwitcher {
  constructor() {
    this.currentLang = localStorage.getItem('preferredLanguage') || 'en';
    this.button = document.getElementById('languageToggle');
    this.langText = this.button?.querySelector('.lang-text');
  }

  init() {
    if (!this.button) return;
    
    // Apply saved language on load
    this.applyLanguage();
    
    // Handle language toggle
    this.button.addEventListener('click', () => {
      this.currentLang = this.currentLang === 'en' ? 'sv' : 'en';
      this.applyLanguage();
      localStorage.setItem('preferredLanguage', this.currentLang);
    });
  }

  applyLanguage() {
    // Update button text
    if (this.langText) {
      this.langText.textContent = this.currentLang.toUpperCase();
    }
    
    // Update HTML lang attribute
    document.documentElement.lang = this.currentLang;
    
    // Update page title
    document.title = this.currentLang === 'en' 
      ? 'AI Coder Portfolio' 
      : 'AI-kodare Portfolio';
    
    // Update all translatable elements
    document.querySelectorAll('[data-translate]').forEach(element => {
      const key = element.getAttribute('data-translate');
      const translation = Translations.get(key, this.currentLang);
      
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        element.placeholder = translation;
      } else {
        // Use innerHTML for hero-desc to allow line breaks, textContent for others
        if (key === 'hero-desc') {
          element.innerHTML = translation;
        } else {
          element.textContent = translation;
        }
      }
    });
  }
}