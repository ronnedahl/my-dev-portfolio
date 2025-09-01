(() => {
  'use strict';

  // Navigation handler with mobile menu and scroll effects
  class Navigation {
    constructor() {
      this.header = document.querySelector('header');
      this.hamburger = document.querySelector('.hamburger');
      this.navLinks = document.querySelector('.nav-links');
      this.scrollThreshold = 50;
    }

    init() {
      if (!this.hamburger || !this.navLinks) return;
      
      this.hamburger.addEventListener('click', () => this.toggleMenu());
      this.navLinks.querySelectorAll('a').forEach(link => 
        link.addEventListener('click', () => this.closeMenu())
      );
      
      window.addEventListener('scroll', () => this.handleScroll());
    }

    toggleMenu() {
      this.navLinks.classList.toggle('nav-active');
      this.hamburger.classList.toggle('toggle');
    }

    closeMenu() {
      this.navLinks.classList.remove('nav-active');
      this.hamburger.classList.remove('toggle');
    }

    handleScroll() {
      if (!this.header) return;
      
      if (window.scrollY > this.scrollThreshold) {
        this.header.style.backgroundColor = 'rgba(10, 25, 47, 0.85)';
        this.header.style.backdropFilter = 'blur(10px)';
      } else {
        this.header.style.backgroundColor = '';
        this.header.style.backdropFilter = '';
      }
    }
  }

  // Contact form with EmailJS integration
  class ContactForm {
    constructor() {
      this.form = document.querySelector('.contact-form');
      this.config = {
        serviceId: 'service_6pjq45y',
        templateId: 'template_acxd2eb',
        publicKey: 'DHIoieBVznOFolr6S',
        rateLimit: { max: 3, window: 60000 },
        validation: { minMessage: 10, maxMessage: 1000 }
      };
    }

    init() {
      if (!this.form) return;
      
      if (typeof emailjs !== 'undefined') {
        emailjs.init(this.config.publicKey);
      }
      
      this.form.addEventListener('submit', e => this.handleSubmit(e));
      this.addValidation();
    }

    async handleSubmit(e) {
      e.preventDefault();
      
      if (!this.checkRateLimit()) {
        this.showMessage('Please wait before sending another message', 'error');
        return;
      }

      const data = this.getFormData();
      const validation = this.validate(data);
      
      if (!validation.valid) {
        this.showMessage(validation.message, 'error');
        return;
      }

      this.setLoading(true);

      try {
        const response = await emailjs.sendForm(
          this.config.serviceId,
          this.config.templateId,
          this.form
        );

        if (response.status === 200) {
          this.showMessage('Message sent successfully!', 'success');
          this.form.reset();
          this.updateRateLimit();
        }
      } catch (error) {
        this.showMessage('Failed to send message. Please try again.', 'error');
      } finally {
        this.setLoading(false);
      }
    }

    getFormData() {
      return {
        name: this.form.name?.value.trim() || '',
        email: this.form.email?.value.trim() || '',
        message: this.form.message?.value.trim() || ''
      };
    }

    validate(data) {
      if (data.name.length < 2) {
        return { valid: false, message: 'Name must be at least 2 characters' };
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        return { valid: false, message: 'Please enter a valid email' };
      }

      if (data.message.length < this.config.validation.minMessage) {
        return { valid: false, message: `Message must be at least ${this.config.validation.minMessage} characters` };
      }

      if (data.message.length > this.config.validation.maxMessage) {
        return { valid: false, message: `Message must be less than ${this.config.validation.maxMessage} characters` };
      }

      return { valid: true };
    }

    checkRateLimit() {
      const key = 'contactRateLimit';
      const now = Date.now();
      
      try {
        const stored = localStorage.getItem(key);
        if (!stored) return true;
        
        const limit = JSON.parse(stored);
        if (now > limit.reset) return true;
        
        return limit.count < this.config.rateLimit.max;
      } catch {
        return true;
      }
    }

    updateRateLimit() {
      const key = 'contactRateLimit';
      const now = Date.now();
      
      try {
        const stored = localStorage.getItem(key);
        let limit = stored ? JSON.parse(stored) : null;
        
        if (!limit || now > limit.reset) {
          limit = { count: 1, reset: now + this.config.rateLimit.window };
        } else {
          limit.count++;
        }
        
        localStorage.setItem(key, JSON.stringify(limit));
      } catch {}
    }

    setLoading(loading) {
      const button = this.form.querySelector('button[type="submit"]');
      if (!button) return;
      
      button.disabled = loading;
      button.textContent = loading ? 'Sending...' : 'Send Message';
    }

    showMessage(text, type) {
      const existing = document.querySelector('.form-message');
      if (existing) existing.remove();
      
      const message = document.createElement('div');
      message.className = `form-message form-message-${type}`;
      message.textContent = text;
      
      this.form.parentElement?.insertBefore(message, this.form.nextSibling);
      
      setTimeout(() => message.remove(), 5000);
    }

    addValidation() {
      const email = this.form.querySelector('#email');
      const message = this.form.querySelector('#message');
      
      if (email) {
        email.addEventListener('blur', () => {
          const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value);
          email.classList.toggle('error', !valid && email.value.length > 0);
        });
      }
      
      if (message) {
        const counter = document.createElement('div');
        counter.className = 'message-counter';
        message.parentElement?.appendChild(counter);
        
        message.addEventListener('input', () => {
          const length = message.value.length;
          counter.textContent = `${length}/${this.config.validation.maxMessage}`;
          counter.classList.toggle('error', length > this.config.validation.maxMessage);
        });
      }
    }
  }

  // Initialize application
  const init = () => {
    new Navigation().init();
    new ContactForm().init();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();