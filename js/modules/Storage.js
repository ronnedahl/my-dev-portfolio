/**
 * Storage Module - Handles all localStorage operations
 * Provides a centralized, type-safe interface for browser storage
 */
export class Storage {
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