# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A modern AI/ML developer portfolio website built with TypeScript and vanilla JavaScript. Features multilingual support (EN/SE), dark theme with cyan accents, and EmailJS contact form integration.

## Development Commands

### Development Commands
```bash
# Development mode with live reload and auto-refresh
npm run dev

# Build modular ES6 architecture to JavaScript bundle
npm run build

# Build minified production version
npm run build:min

# Build legacy TypeScript version (if needed)
npm run build:legacy

# Clean build artifacts
npm run clean

# Production mode (build + serve)
npm start
```

### Local Testing
```bash
# Serve with Python (port 8000)
npm run serve

# Direct file access (limited functionality without server)
open index.html
```

## Architecture

### Build System
- **Modern ES6 Bundler**: `build-modern.js` bundles modular JavaScript into single `js/app.js`
- **Module Order**: Storage → Translations → Navigation → LanguageSwitcher → ContactForm
- **Development Server**: `dev-server-simple.js` with TypeScript watch mode and auto-refresh
- **Legacy Support**: `build:legacy` for TypeScript compilation if needed

### Modular Architecture
```
js/modules/
├── Storage.js           # Centralized localStorage management
├── Translations.js      # Multilingual content
├── Navigation.js        # Responsive navigation & scroll behavior
├── LanguageSwitcher.js  # Language toggle functionality
└── ContactForm.js       # Form validation & EmailJS integration

js/
├── app-modular.js       # Source application controller
└── app.js              # Production bundle (auto-generated)
```

### CSS Architecture
Modular CSS system with imports:
- `css/style.css` - Main entry point importing all modules
- `css/modules/` - Component-specific styles
- CSS Custom Properties in `:root` for theming
- Responsive breakpoints: 768px (mobile), 992px (tablet)

### Key Technologies
- **EmailJS**: Contact form backend (requires configuration)
- **LocalStorage**: Language preference persistence and rate limiting
- **Font Awesome 6.4.0**: Icons (CDN)
- **Google Fonts**: Roboto (CDN)

## Important Notes

### Current State
- Language switcher temporarily disabled in `main.ts` (lines 8-9, 16-18)
- Placeholder content: CV link (`ditt-cv.pdf`), project links (`href="#"`)
- HTML lang attribute is "sv" but content is English

### EmailJS Configuration
Update in contact form module:
```javascript
const config = {
  serviceId: 'your_service_id',
  templateId: 'your_template_id',
  publicKey: 'your_public_key'
};
```

### Security Features
- Input sanitization for XSS prevention
- Rate limiting (3 messages/minute)
- Spam detection patterns
- Client-side validation

### Performance Optimizations
- Minimal bundle size through custom build
- No framework dependencies
- CSS modules for efficient loading
- LocalStorage caching for preferences