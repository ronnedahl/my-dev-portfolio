/**
 * Contact Form Module with EmailJS Integration
 * Handles form submission with security features
 */

// Declare EmailJS global
declare const emailjs: any;

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface RateLimitData {
  count: number;
  resetTime: number;
}

export class ContactForm {
  private form: HTMLFormElement | null;
  private submitButton: HTMLButtonElement | null;
  private readonly MAX_ATTEMPTS = 3;
  private readonly RATE_LIMIT_WINDOW = 60000; // 1 minute in ms
  private readonly MIN_MESSAGE_LENGTH = 10;
  private readonly MAX_MESSAGE_LENGTH = 1000;
  
  // EmailJS configuration - These should ideally be in environment variables
  private readonly SERVICE_ID = 'service_6pjq45y';
  private readonly TEMPLATE_ID = 'template_acxd2eb';
  private readonly PUBLIC_KEY = 'DHIoieBVznOFolr6S';

  constructor() {
    this.form = document.querySelector('.contact-form');
    this.submitButton = this.form?.querySelector('button[type="submit"]') || null;
  }

  /**
   * Initialize the contact form
   */
  public init(): void {
    if (!this.form) {
      console.error('Contact form not found');
      return;
    }

    // Initialize EmailJS
    this.initializeEmailJS();
    
    // Add form submit handler
    this.form.addEventListener('submit', this.handleSubmit.bind(this));
    
    // Add real-time validation
    this.addRealtimeValidation();
  }

  /**
   * Initialize EmailJS with public key
   */
  private initializeEmailJS(): void {
    try {
      emailjs.init(this.PUBLIC_KEY);
      console.log('EmailJS initialized successfully');
    } catch (error) {
      console.error('Failed to initialize EmailJS:', error);
    }
  }

  /**
   * Handle form submission
   */
  private async handleSubmit(e: Event): Promise<void> {
    e.preventDefault();
    
    if (!this.form || !this.submitButton) return;

    // Check rate limiting
    if (!this.checkRateLimit()) {
      this.showMessage('Please wait before sending another message', 'error');
      return;
    }

    // Get and validate form data
    const formData = this.getFormData();
    const validation = this.validateFormData(formData);
    
    if (!validation.valid) {
      this.showMessage(validation.message, 'error');
      return;
    }

    // Disable form during submission
    this.setFormState(false);
    this.submitButton.textContent = 'Sending...';

    try {
      // Send email using EmailJS
      const response = await emailjs.sendForm(
        this.SERVICE_ID,
        this.TEMPLATE_ID,
        this.form,
        this.PUBLIC_KEY
      );

      if (response.status === 200) {
        this.showMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
        this.form.reset();
        this.updateRateLimit();
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('EmailJS error:', error);
      this.showMessage('Failed to send message. Please try again later.', 'error');
    } finally {
      this.setFormState(true);
      this.submitButton.textContent = 'Send Message';
    }
  }

  /**
   * Get sanitized form data
   */
  private getFormData(): FormData {
    const formElement = this.form as HTMLFormElement;
    const nameInput = formElement.querySelector('#name') as HTMLInputElement;
    const emailInput = formElement.querySelector('#email') as HTMLInputElement;
    const messageInput = formElement.querySelector('#message') as HTMLTextAreaElement;
    
    return {
      name: this.sanitizeInput(nameInput?.value || ''),
      email: this.sanitizeInput(emailInput?.value || ''),
      message: this.sanitizeInput(messageInput?.value || '')
    };
  }

  /**
   * Sanitize user input to prevent XSS
   */
  private sanitizeInput(input: string): string {
    const div = document.createElement('div');
    div.textContent = input.trim();
    return div.innerHTML;
  }

  /**
   * Validate form data
   */
  private validateFormData(data: FormData): { valid: boolean; message: string } {
    // Name validation
    if (!data.name || data.name.length < 2) {
      return { valid: false, message: 'Please enter a valid name (at least 2 characters)' };
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return { valid: false, message: 'Please enter a valid email address' };
    }

    // Message validation
    if (!data.message || data.message.length < this.MIN_MESSAGE_LENGTH) {
      return { valid: false, message: `Message must be at least ${this.MIN_MESSAGE_LENGTH} characters` };
    }

    if (data.message.length > this.MAX_MESSAGE_LENGTH) {
      return { valid: false, message: `Message must be less than ${this.MAX_MESSAGE_LENGTH} characters` };
    }

    // Check for spam patterns
    if (this.isSpam(data.message)) {
      return { valid: false, message: 'Message appears to contain spam content' };
    }

    return { valid: true, message: '' };
  }

  /**
   * Basic spam detection
   */
  private isSpam(message: string): boolean {
    const spamPatterns = [
      /\b(viagra|cialis|casino|lottery|winner|prize)\b/i,
      /\b(click here|buy now|limited offer)\b/i,
      /(http|https):\/\/[^\s]+/g // URLs in message
    ];

    return spamPatterns.some(pattern => pattern.test(message));
  }

  /**
   * Check rate limiting
   */
  private checkRateLimit(): boolean {
    const rateLimitKey = 'contactFormRateLimit';
    const now = Date.now();
    
    try {
      const stored = localStorage.getItem(rateLimitKey);
      if (!stored) return true;

      const rateLimit: RateLimitData = JSON.parse(stored);
      
      if (now > rateLimit.resetTime) {
        // Reset period expired
        return true;
      }

      return rateLimit.count < this.MAX_ATTEMPTS;
    } catch {
      return true;
    }
  }

  /**
   * Update rate limit counter
   */
  private updateRateLimit(): void {
    const rateLimitKey = 'contactFormRateLimit';
    const now = Date.now();
    
    try {
      const stored = localStorage.getItem(rateLimitKey);
      let rateLimit: RateLimitData;

      if (stored) {
        rateLimit = JSON.parse(stored);
        if (now > rateLimit.resetTime) {
          // Reset period expired, start fresh
          rateLimit = { count: 1, resetTime: now + this.RATE_LIMIT_WINDOW };
        } else {
          // Increment count
          rateLimit.count++;
        }
      } else {
        // First submission
        rateLimit = { count: 1, resetTime: now + this.RATE_LIMIT_WINDOW };
      }

      localStorage.setItem(rateLimitKey, JSON.stringify(rateLimit));
    } catch (error) {
      console.error('Failed to update rate limit:', error);
    }
  }

  /**
   * Enable/disable form
   */
  private setFormState(enabled: boolean): void {
    if (!this.form) return;
    
    const inputs = this.form.querySelectorAll('input, textarea, button');
    inputs.forEach(input => {
      (input as HTMLInputElement).disabled = !enabled;
    });
  }

  /**
   * Show feedback message
   */
  private showMessage(message: string, type: 'success' | 'error'): void {
    // Remove existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
      existingMessage.remove();
    }

    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message form-message-${type}`;
    messageDiv.textContent = message;
    
    // Insert after form
    this.form?.parentElement?.insertBefore(messageDiv, this.form.nextSibling);

    // Remove after 5 seconds
    setTimeout(() => {
      messageDiv.remove();
    }, 5000);
  }

  /**
   * Add real-time validation
   */
  private addRealtimeValidation(): void {
    if (!this.form) return;

    // Email field validation
    const emailField = this.form.querySelector('#email') as HTMLInputElement;
    if (emailField) {
      emailField.addEventListener('blur', () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value)) {
          emailField.classList.add('error');
        } else {
          emailField.classList.remove('error');
        }
      });
    }

    // Message length counter
    const messageField = this.form.querySelector('#message') as HTMLTextAreaElement;
    if (messageField) {
      const counter = document.createElement('div');
      counter.className = 'message-counter';
      messageField.parentElement?.appendChild(counter);

      messageField.addEventListener('input', () => {
        const length = messageField.value.length;
        counter.textContent = `${length}/${this.MAX_MESSAGE_LENGTH}`;
        
        if (length > this.MAX_MESSAGE_LENGTH) {
          counter.classList.add('error');
        } else {
          counter.classList.remove('error');
        }
      });
    }
  }
}