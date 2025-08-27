# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static HTML/CSS/JavaScript portfolio website with no build system or framework dependencies. The portfolio showcases AI/ML developer skills with a dark theme and cyan accent colors.

## Common Development Tasks

### TypeScript Development Setup
```bash
# Install dependencies (first time only)
npm install

# Development mode - watch TypeScript files for changes
npm run dev

# Build TypeScript to JavaScript
npm run build

# Clean build artifacts
npm run clean

# Start local server with built files
npm run start
```

### Running the Project (Production)
```bash
# The compiled JavaScript is already in js/script.js
# Option 1: Open index.html directly
# Option 2: Use a local server (recommended)
python -m http.server 8000
# or
npx serve .
```

### File Modifications
- **TypeScript Development**: Edit files in `src/ts/` directory
  - `src/ts/types/`: Type definitions and interfaces
  - `src/ts/translations/`: Language translations
  - `src/ts/modules/`: Feature modules (navigation, language switcher)
  - `src/ts/main.ts`: Application entry point
- **Content Updates**: Edit `index.html` for structure changes
- **Styling**: All styles in `css/style.css` using CSS custom properties
- **Production JavaScript**: `js/script.js` (auto-generated from TypeScript)

## Architecture

### TypeScript Module Structure
The project uses a modular TypeScript architecture compiled to vanilla JavaScript:
- **Type Safety**: Strict TypeScript configuration with comprehensive type definitions
- **Module Pattern**: Each feature is encapsulated in its own module
- **Separation of Concerns**: Clear separation between types, translations, and functionality
- **Build Process**: TypeScript compiles to a single JavaScript file for production

### CSS Design System
The project uses CSS custom properties defined in `:root` for consistent theming:
- Primary gradient: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
- Accent color: `#00ffff` (cyan)
- Dark backgrounds with high contrast text
- Responsive breakpoints: 992px (tablet) and 768px (mobile)

### JavaScript/TypeScript Patterns
- **Class-based Modules**: Navigation and LanguageSwitcher as classes
- **Type-safe Translations**: Compile-time checking for translation keys
- **Encapsulation**: Private methods and properties for internal logic
- **Error Handling**: Graceful degradation with console warnings

### Image Assets
- Profile image: `assets/images/me-profile.png`
- Hero illustration: `assets/images/robot.png`
- No image optimization or lazy loading implemented

## Key Implementation Notes

1. **Language Mismatch**: HTML lang attribute is "sv" (Swedish) but content is in English - should be updated to "en"

2. **Placeholder Content**: 
   - CV download links to non-existent `ditt-cv.pdf`
   - Project links are all `href="#"`
   - Contact form has no backend

3. **Mobile Menu**: Toggle functionality exists but header scroll effect is incomplete (line 19-26 in script.js)

4. **External Dependencies**:
   - Font Awesome 6.4.0 (CDN)
   - Google Fonts: Roboto (CDN)

5. **Missing Features**:
   - No SEO meta tags
   - No Open Graph tags
   - No favicon
   - No error pages
   - No analytics

## Development Considerations

When modifying this portfolio:
- Maintain the existing CSS variable system for consistent theming
- Keep the simple vanilla JavaScript approach unless adding complex features
- Test responsive design at 768px and 992px breakpoints
- Ensure smooth scroll behavior is preserved when adding new sections
- Update placeholder content with actual project details and working links