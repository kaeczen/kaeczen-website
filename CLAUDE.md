# Kaeczen Website - Development Guide

## Quick Start

```bash
npm install        # Install dependencies
npm run dev        # Start dev server (localhost:5173)
npm run build      # Build for production
npm run preview    # Preview production build
npm start          # Run production server (Express)
```

## Project Overview

Bilingual (EN/ES) website for Kaeczen - a technology consultancy specializing in computational design, software development, and AI integration for the AEC industry.

**Company:** Kaeczen | **Registration:** El Salvador | **Operations:** Remote/International

## Tech Stack

- **Framework:** React 18 + Vite
- **3D:** Three.js (@react-three/fiber, @react-three/drei, @react-three/postprocessing)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion + GSAP
- **i18n:** react-i18next
- **Forms:** React Hook Form + Zod
- **Email:** EmailJS (@emailjs/browser)
- **Routing:** React Router v6
- **Server:** Express (for Hostinger deployment)

## Project Structure

```
/kaeczen web
├── src/
│   ├── components/
│   │   ├── 3d/                    # 3D components (desktop only)
│   │   │   ├── CanvasWrapper.jsx  # Conditional 3D rendering
│   │   │   ├── HeroScene.jsx      # Main hero 3D scene
│   │   │   ├── NodeNetwork.jsx    # Grasshopper-style nodes
│   │   │   └── ParticleSystem.jsx # Animated particles
│   │   ├── layout/
│   │   │   ├── Footer.jsx
│   │   │   ├── Layout.jsx
│   │   │   └── Navbar.jsx
│   │   ├── sections/              # Page sections
│   │   │   ├── About.jsx
│   │   │   ├── Contact.jsx        # EmailJS integration
│   │   │   ├── Expertise.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Product.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── Technology.jsx
│   │   │   └── WhyKaeczen.jsx
│   │   └── ui/
│   │       ├── Button.jsx
│   │       ├── Card.jsx
│   │       ├── LanguageSwitcher.jsx
│   │       ├── LoadingSpinner.jsx
│   │       └── SectionTitle.jsx
│   ├── hooks/
│   │   ├── useDeviceCapabilities.js  # Mobile/desktop detection
│   │   ├── useIntersectionObserver.js
│   │   └── useScrollAnimations.js    # GSAP ScrollTrigger
│   ├── i18n/
│   │   ├── config.js              # i18next configuration
│   │   └── locales/
│   │       ├── en.json            # English translations
│   │       └── es.json            # Spanish translations
│   ├── pages/
│   │   ├── Contact.jsx
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── Projects.jsx
│   │   ├── Services.jsx
│   │   └── Technology.jsx
│   ├── styles/
│   │   └── index.css              # Tailwind + custom classes
│   ├── App.jsx
│   ├── main.jsx
│   └── router.jsx
├── .env                           # EmailJS credentials (DO NOT COMMIT)
├── index.html
├── package.json
├── postcss.config.js
├── server.js                      # Express server for production
├── tailwind.config.js
└── vite.config.js
```

## Environment Variables

Create `.env` in project root:

```env
# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxx
```

**Current credentials are configured in .env** - Update if EmailJS account changes.

## EmailJS Integration

### Setup Location
- Component: `src/components/sections/Contact.jsx`
- Email recipients configured in EmailJS dashboard (not in code)

### Template Variables Used
The contact form sends these variables to EmailJS:
- `from_name` - Sender's name
- `from_email` - Sender's email
- `company` - Company name (or "Not provided")
- `message` - Message content
- `preferred_language` - "English" or "Espanol"

### Recipients
Emails are sent to (configured in EmailJS template):
- contact@kaeczen.com
- kaeczen@gmail.com

### How to Update EmailJS
1. Log into EmailJS dashboard
2. Update Email Service if needed (Gmail connected)
3. Update Template variables/recipients
4. Copy new credentials to `.env`

## Translation Files

### Locations
- English: `src/i18n/locales/en.json`
- Spanish: `src/i18n/locales/es.json`

### Key Sections
```json
{
  "nav": {},           // Navigation labels
  "hero": {},          // Hero section
  "about": {},         // About section
  "expertise": {},     // Expertise areas
  "product": {},       // Grasshopper MCP product
  "services": {},      // Service offerings
  "technology": {},    // Tech stack labels
  "projects": {},      // Featured projects
  "why": {},           // Why Kaeczen section
  "contact": {},       // Contact form + info
  "footer": {}         // Footer content
}
```

### Contact Email in Translations
Update `contact.info.email` in both files if email changes.

## Responsive Design

### Breakpoint Strategy
- **Mobile (< 1024px):** No 3D, CSS animations only, static backgrounds
- **Desktop (>= 1024px):** Full 3D experience with WebGL

### Key Hook
`useDeviceCapabilities.js` detects:
- Screen width
- WebGL support
- Reduced motion preference

### CSS Classes
- `.mobile-only` - Visible only on mobile
- `.desktop-only` - Visible only on desktop

## Brand Colors

Defined in `tailwind.config.js`:
```js
colors: {
  primary: '#2563EB',    // Blue
  secondary: '#10B981',  // Green
  dark: '#1F2937',       // Dark gray
  medium: '#6B7280',     // Medium gray
  light: '#F3F4F6',      // Light gray
  accent: '#3498DB'      // Accent blue
}
```

## Build Notes

### Vite Config
- Uses `esbuild` for minification (not terser)
- Manual chunks: vendor, three, animation
- Output: `dist/`

### Common Issues
- **Terser error:** Use `minify: 'esbuild'` in vite.config.js
- **WebGL on HTTP:** 3D requires HTTPS in production
- **EmailJS 412 error:** Reconnect Gmail service with proper permissions

## Deployment (Hostinger)

### Server Configuration
Express server in `server.js`:
- Serves static files from `/dist`
- SPA fallback (all routes -> index.html)
- Gzip compression enabled
- Default port: 3000

### Deploy Steps
1. Run `npm run build`
2. Upload entire project to Hostinger
3. Set environment variables in Hostinger panel
4. Set entry point: `server.js`
5. Start Node.js application

### Required Hostinger Settings
```
Node.js Version: 18.x or 20.x
Entry Point: server.js
Build Command: npm run build
Start Command: npm start
```

## Routes

### English
- `/` - Home
- `/services` - Services
- `/products` - Products
- `/technology` - Technology
- `/projects` - Projects
- `/contact` - Contact

### Spanish
- `/es` - Inicio
- `/es/servicios` - Servicios
- `/es/productos` - Productos
- `/es/tecnologia` - Tecnologia
- `/es/proyectos` - Proyectos
- `/es/contacto` - Contacto

## Key Components Reference

| Component | Location | Purpose |
|-----------|----------|---------|
| Contact Form | `src/components/sections/Contact.jsx` | EmailJS integration |
| 3D Hero | `src/components/3d/HeroScene.jsx` | Desktop 3D scene |
| Language Switch | `src/components/ui/LanguageSwitcher.jsx` | EN/ES toggle |
| Navbar | `src/components/layout/Navbar.jsx` | Responsive navigation |
| Device Detection | `src/hooks/useDeviceCapabilities.js` | Mobile/desktop logic |

## Future Enhancements (Planned)

- ShapeDiver configurator embeds
- Interactive demos section
- Blog/resources section
- Client portal

---

Last updated: January 2026
