# AI Developer Portfolio

A modern, responsive portfolio website showcasing AI/ML development skills with a futuristic dark theme and multilingual support.

##  Features

- **Responsive Design** - Mobile-first approach with optimized layouts for all devices
- **Multilingual Support** - English/Swedish language switching with localStorage persistence
- **Modern UI/UX** - Dark theme with cyan accents and smooth animations
- **Contact Form** - Secure EmailJS integration with rate limiting and validation
- **Modular Architecture** - Clean, maintainable code structure
- **TypeScript Integration** - Type-safe development with modern ES2017+ features
- **Performance Optimized** - Minimal bundle size and efficient loading

##  Tech Stack

- **Frontend**: Vanilla TypeScript, HTML5, CSS3
- **Build System**: Node.js with custom build scripts
- **Email Service**: EmailJS for contact form
- **Development**: Live reload server, TypeScript compiler
- **Architecture**: Modular CSS, Component-based JavaScript

##  Project Structure

```
├── css/
│   ├── style.css              # Main stylesheet (imports modules)
│   └── modules/               # Modular CSS architecture
│       ├── variables.css      # CSS custom properties & base styles
│       ├── navigation.css     # Header & navigation components
│       ├── hero.css          # Hero section & buttons
│       ├── about.css         # About section
│       ├── skills.css        # Skills showcase
│       ├── projects.css      # Project cards & interactions
│       ├── contact.css       # Contact form & validation
│       ├── footer.css        # Footer & social links
│       └── responsive.css    # Media queries & mobile styles
├── js/
│   ├── app-with-lang.js      # Main application entry point
│   ├── translations.js       # Multilingual content
│   └── language-switcher.js  # Language toggle functionality
├── src/ts/                   # TypeScript source files
│   ├── main.ts              # Application entry point
│   ├── types/               # Type definitions
│   ├── modules/             # Feature modules
│   └── translations/        # Translation types
├── assets/
│   └── images/              # Profile images & icons
├── build.js                 # Custom build system
├── dev-server.js           # Development server with live reload
└── package.json            # Dependencies & scripts
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/ai-developer-portfolio.git
cd ai-developer-portfolio

# Install dependencies
npm install

# Start development server with live reload
npm run dev

# Build for production
npm run build

# Serve built files locally
npm start
```

## Available Scripts

```bash
npm run dev      # Start development server with live reload
npm run build    # Compile TypeScript and build for production
npm run serve    # Serve built files with Python HTTP server
npm run start    # Build and serve (production workflow)
npm run clean    # Remove build artifacts
```

## ⚙Configuration

### EmailJS Setup

1. Create an account at [EmailJS](https://emailjs.com)
2. Create a service and template
3. Update credentials in `js/app-with-lang.js`:

```javascript
const config = {
  serviceId: 'your_service_id',
  templateId: 'your_template_id', 
  publicKey: 'your_public_key'
};
```

### Customization

#### Adding New Languages
1. Add translations to `js/translations.js`
2. Update language switcher in `js/language-switcher.js`
3. Add data-translate attributes to HTML elements

#### Styling
- Modify CSS custom properties in `css/modules/variables.css`
- Each section has its own CSS module for easy customization
- Responsive breakpoints: 992px (tablet) and 768px (mobile)

#### Content Updates
- Update text content in `js/translations.js`
- Replace images in `assets/images/`
- Modify project data in HTML or create dynamic loading

## Design System

### Color Palette
```css
--bg-dark: #0a192f;           /* Primary background */
--bg-light: #112240;          /* Secondary background */
--text-primary: #ccd6f6;      /* Primary text */
--text-secondary: #D4D8E0;    /* Secondary text */
--accent-color: #00ffff;      /* Accent color (cyan) */
--gradient: linear-gradient(135deg, #00A98F, #0052D4);
```

### Typography
- **Primary Font**: Roboto (300, 400, 700)
- **Base Font Size**: 16px
- **Line Height**: 1.6 for body text

### Responsive Breakpoints
- **Desktop**: > 992px
- **Tablet**: 768px - 992px  
- **Mobile**: < 768px

## Development

### TypeScript Development
```bash
# Watch TypeScript files for changes
npm run dev

# Manual TypeScript compilation
npx tsc
```

### Code Quality
- **TypeScript**: Strict mode enabled with comprehensive type checking
- **ES2017+**: Modern JavaScript features with async/await support
- **Modular CSS**: Organized by component for maintainability
- **Clean Architecture**: Separation of concerns and single responsibility

### Performance Optimizations
- **Lazy Loading**: Dynamic script loading for translations
- **Efficient CSS**: Modular imports with minimal unused styles
- **Image Optimization**: WebP format support and proper sizing
- **Caching**: LocalStorage for language preferences and rate limiting

## Features Overview

### Multilingual Support
- Automatic language detection
- localStorage persistence
- Dynamic content switching
- Support for HTML content in translations

### Contact Form Security
- Input sanitization (XSS prevention)
- Rate limiting (3 messages per minute)
- Client-side validation
- Spam detection patterns
- Real-time validation feedback

### Responsive Design
- Mobile-first CSS approach
- Flexible grid layouts
- Touch-friendly interactions
- Optimized mobile navigation

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

**Peter** - AI Developer & Machine Learning Engineer
- Email: dev.peter.ai@gmail.com
- Location: Karlstad, Värmland
- Phone: +46 704893020

---

⭐ **Star this repository if you find it helpful!**

Built with  using modern web technologies
