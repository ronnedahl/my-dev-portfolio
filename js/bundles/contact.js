
/**
 * Contact Bundle - Form validation and email
 * Loaded when user scrolls to contact section
 */
(function() {
  'use strict';

  // Import Storage from global scope (set by core bundle)
  const Storage = window.Storage;

  /**
 * ContactForm Module - Secure email form with validation and rate limiting
 * Features: XSS protection, spam detection, rate limiting, real-time validation
 */

class ContactForm {
  constructor() {
    // Configuration
    this.config = {
      maxAttempts: 3,
      rateLimitWindow: 60000, // 1 minute
      minMessageLength: 10,
      maxMessageLength: 1000,
      emailJS: {
        serviceId: 'service_6pjq45y',
        templateId: 'template_acxd2eb',
        publicKey: 'DHIoieBVznOFolr6S'
      }
    };

    // DOM elements
    this.elements = {
      form: null,
      submitButton: null,
      fields: {
        name: null,
        email: null,
        message: null
      }
    };

    // State
    this.isInitialized = false;
    this.isSubmitting = false;
  }

  /**
   * Initialize contact form module
   * @returns {boolean} Success status
   */
  init() {
    if (this.isInitialized) return true;

    this.cacheElements();
    
    if (!this.validateElements()) {
      console.error('ContactForm: Form element not found');
      return false;
    }

    this.initializeEmailJS();
    this.bindEvents();
    this.setupRealtimeValidation();
    
    this.isInitialized = true;
    return true;
  }

  /**
   * Cache DOM elements
   */
  cacheElements() {
    this.elements.form = document.querySelector('.contact-form');
    
    if (this.elements.form) {
      this.elements.submitButton = this.elements.form.querySelector('button[type="submit"]');
      this.elements.fields.name = this.elements.form.querySelector('#name');
      this.elements.fields.email = this.elements.form.querySelector('#email');
      this.elements.fields.message = this.elements.form.querySelector('#message');
    }
  }

  /**
   * Validate required elements exist
   * @returns {boolean} Validation status
   */
  validateElements() {
    return !!(this.elements.form && this.elements.submitButton);
  }

  /**
   * Initialize EmailJS service
   */
  initializeEmailJS() {
    if (typeof emailjs === 'undefined') {
      console.error('ContactForm: EmailJS library not loaded');
      return;
    }

    try {
      emailjs.init(this.config.emailJS.publicKey);
    } catch (error) {
      console.error('ContactForm: Failed to initialize EmailJS', error);
    }
  }

  /**
   * Bind event listeners
   */
  bindEvents() {
    this.elements.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  /**
   * Handle form submission
   * @param {Event} e - Submit event
   */
  async handleSubmit(e) {
    e.preventDefault();
    
    if (this.isSubmitting) return;

    // Check rate limit
    if (!this.checkRateLimit()) {
      this.showMessage('Please wait before sending another message', 'error');
      return;
    }

    // Get and validate form data
    const formData = this.getFormData();
    const validation = this.validateFormData(formData);
    
    if (!validation.valid) {
      this.showMessage(validation.message, 'error');
      this.highlightInvalidField(validation.field);
      return;
    }

    // Submit form
    await this.submitForm(formData);
  }

  /**
   * Get sanitized form data
   * @returns {Object} Form data
   */
  getFormData() {
    return {
      name: this.sanitizeInput(this.elements.fields.name?.value || ''),
      email: this.sanitizeInput(this.elements.fields.email?.value || ''),
      message: this.sanitizeInput(this.elements.fields.message?.value || '')
    };
  }

  /**
   * Sanitize user input to prevent XSS
   * @param {string} input - User input
   * @returns {string} Sanitized input
   */
  sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input.trim();
    return div.innerHTML;
  }

  /**
   * Validate form data
   * @param {Object} data - Form data
   * @returns {Object} Validation result
   */
  validateFormData(data) {
    // Name validation
    if (!data.name || data.name.length < 2) {
      return { 
        valid: false, 
        message: 'Please enter a valid name (at least 2 characters)',
        field: 'name'
      };
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return { 
        valid: false, 
        message: 'Please enter a valid email address',
        field: 'email'
      };
    }

    // Message validation
    if (!data.message || data.message.length < this.config.minMessageLength) {
      return { 
        valid: false, 
        message: `Message must be at least ${this.config.minMessageLength} characters`,
        field: 'message'
      };
    }

    if (data.message.length > this.config.maxMessageLength) {
      return { 
        valid: false, 
        message: `Message must be less than ${this.config.maxMessageLength} characters`,
        field: 'message'
      };
    }

    // Spam check
    if (this.isSpam(data.message)) {
      return { 
        valid: false, 
        message: 'Message appears to contain spam content',
        field: 'message'
      };
    }

    return { valid: true };
  }

  /**
   * Check if message contains spam patterns
   * @param {string} message - Message to check
   * @returns {boolean} Is spam
   */
  isSpam(message) {
    const spamPatterns = [
      /\b(viagra|cialis|casino|lottery|winner|prize)\b/i,
      /\b(click here|buy now|limited offer)\b/i,
      /\b(http|https):\/\/[^\s]+\b/g
    ];

    return spamPatterns.some(pattern => pattern.test(message));
  }

  /**
   * Submit form via EmailJS
   * @param {Object} formData - Form data
   */
  async submitForm(formData) {
    this.setFormState(false);
    this.isSubmitting = true;
    this.updateSubmitButton('Sending...');

    try {
      const response = await emailjs.sendForm(
        this.config.emailJS.serviceId,
        this.config.emailJS.templateId,
        this.elements.form,
        this.config.emailJS.publicKey
      );

      if (response.status === 200) {
        this.handleSubmitSuccess();
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('ContactForm: EmailJS error', error);
      this.handleSubmitError();
    } finally {
      this.setFormState(true);
      this.isSubmitting = false;
      this.updateSubmitButton('Send Message');
    }
  }

  /**
   * Handle successful submission
   */
  handleSubmitSuccess() {
    this.showMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
    this.elements.form.reset();
    this.updateRateLimit();
    this.clearValidationStates();
  }

  /**
   * Handle submission error
   */
  handleSubmitError() {
    this.showMessage('Failed to send message. Please try again later.', 'error');
  }

  /**
   * Check rate limit
   * @returns {boolean} Can submit
   */
  checkRateLimit() {
    const now = Date.now();
    const rateLimit = Storage.get(Storage.Keys.RateLimit);
    
    if (!rateLimit) return true;
    
    if (now > rateLimit.resetTime) {
      Storage.remove(Storage.Keys.RateLimit);
      return true;
    }
    
    return rateLimit.count < this.config.maxAttempts;
  }

  /**
   * Update rate limit
   */
  updateRateLimit() {
    const now = Date.now();
    let rateLimit = Storage.get(Storage.Keys.RateLimit);
    
    if (!rateLimit || now > rateLimit.resetTime) {
      rateLimit = { 
        count: 1, 
        resetTime: now + this.config.rateLimitWindow 
      };
    } else {
      rateLimit.count++;
    }
    
    Storage.set(Storage.Keys.RateLimit, rateLimit);
  }

  /**
   * Set form enabled/disabled state
   * @param {boolean} enabled - Enabled state
   */
  setFormState(enabled) {
    const inputs = this.elements.form.querySelectorAll('input, textarea, button');
    inputs.forEach(input => {
      input.disabled = !enabled;
    });
  }

  /**
   * Update submit button text
   * @param {string} text - Button text
   */
  updateSubmitButton(text) {
    if (this.elements.submitButton) {
      this.elements.submitButton.textContent = text;
    }
  }

  /**
   * Show message to user
   * @param {string} message - Message text
   * @param {string} type - Message type (success/error)
   */
  showMessage(message, type) {
    // Remove existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
      existingMessage.remove();
    }

    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message form-message-${type}`;
    messageDiv.textContent = message;
    messageDiv.setAttribute('role', 'alert');

    // Insert message
    this.elements.form.parentElement.insertBefore(messageDiv, this.elements.form.nextSibling);

    // Auto-remove after delay
    setTimeout(() => {
      messageDiv.remove();
    }, 5000);
  }

  /**
   * Highlight invalid field
   * @param {string} fieldName - Field name
   */
  highlightInvalidField(fieldName) {
    const field = this.elements.fields[fieldName];
    if (field) {
      field.classList.add('error');
      field.focus();
    }
  }

  /**
   * Clear validation states
   */
  clearValidationStates() {
    Object.values(this.elements.fields).forEach(field => {
      if (field) {
        field.classList.remove('error');
      }
    });
  }

  /**
   * Setup real-time validation
   */
  setupRealtimeValidation() {
    // Email validation
    if (this.elements.fields.email) {
      this.elements.fields.email.addEventListener('blur', () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (this.elements.fields.email.value && !emailRegex.test(this.elements.fields.email.value)) {
          this.elements.fields.email.classList.add('error');
        } else {
          this.elements.fields.email.classList.remove('error');
        }
      });
    }

    // Message counter
    if (this.elements.fields.message) {
      this.setupMessageCounter();
    }
  }

  /**
   * Setup message character counter
   */
  setupMessageCounter() {
    const counter = document.createElement('div');
    counter.className = 'message-counter';
    counter.setAttribute('aria-live', 'polite');
    this.elements.fields.message.parentElement.appendChild(counter);

    this.elements.fields.message.addEventListener('input', () => {
      const length = this.elements.fields.message.value.length;
      counter.textContent = `${length}/${this.config.maxMessageLength}`;
      
      if (length > this.config.maxMessageLength) {
        counter.classList.add('error');
      } else {
        counter.classList.remove('error');
      }
    });
  }

  /**
   * Cleanup module
   */
  destroy() {
    if (this.elements.form) {
      this.elements.form.removeEventListener('submit', this.handleSubmit);
    }
    this.isInitialized = false;
  }
}

  // Initialize contact form
  window.initContactForm = function() {
    const contactForm = new ContactForm();
    contactForm.init();
    console.log('Contact bundle loaded and initialized');
  };
})();
