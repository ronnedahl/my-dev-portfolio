/**
 * Navigation Module - Handles responsive navigation and scroll behavior
 * Features: Mobile menu toggle, scroll-based styling, smooth navigation
 */
export class Navigation {
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