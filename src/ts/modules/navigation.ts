/**
 * Navigation module
 * Handles mobile menu toggle and smooth scroll behavior
 */

import { NavigationElements, ScrollConfig } from '../types';

export class Navigation {
  private elements: NavigationElements;
  private scrollConfig: ScrollConfig = {
    threshold: 50,
    backgroundColor: 'rgba(10, 25, 47, 0.85)',
    backdropFilter: 'blur(10px)'
  };

  constructor() {
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
  public init(): void {
    this.initHamburgerMenu();
    this.initScrollBehavior();
  }

  /**
   * Initialize hamburger menu toggle functionality
   */
  private initHamburgerMenu(): void {
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
  private initScrollBehavior(): void {
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
  private toggleMobileMenu(): void {
    if (!this.elements.navLinks || !this.elements.hamburger) return;

    this.elements.navLinks.classList.toggle('nav-active');
    this.elements.hamburger.classList.toggle('toggle');
  }

  /**
   * Close mobile menu
   */
  private closeMobileMenu(): void {
    if (!this.elements.navLinks || !this.elements.hamburger) return;

    if (this.elements.navLinks.classList.contains('nav-active')) {
      this.elements.navLinks.classList.remove('nav-active');
      this.elements.hamburger.classList.remove('toggle');
    }
  }

  /**
   * Update header background on scroll
   */
  private updateHeaderOnScroll(): void {
    if (!this.elements.header) return;

    if (window.scrollY > this.scrollConfig.threshold) {
      this.elements.header.style.backgroundColor = this.scrollConfig.backgroundColor;
      this.elements.header.style.backdropFilter = this.scrollConfig.backdropFilter;
    } else {
      // Reset to original state
      this.elements.header.style.backgroundColor = '';
      this.elements.header.style.backdropFilter = '';
    }
  }
}