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
- **Hosting:** Static files on Hostinger (Apache)

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
├── dist/                          # Production build (upload to Hostinger)
│   ├── .htaccess                  # SPA routing + MIME types
│   ├── index.html
│   ├── favicon.svg
│   └── assets/                    # JS/CSS bundles
├── .env                           # EmailJS credentials (DO NOT COMMIT)
├── index.html
├── package.json
├── postcss.config.js
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

### Method: Static File Hosting (Recommended)
**Important:** Use static hosting, NOT Node.js. Node.js deployment causes MIME type errors.

### Deploy Steps

#### 1. Build the Project
```bash
npm run build
```
This creates the `dist/` folder with all production files.

#### 2. Create Website in Hostinger
1. Log into hPanel → **Websites** → **Add Website**
2. Select **"Sitio web PHP/HTML personalizado"** (Custom PHP/HTML)
3. Do NOT select "App web de Node.js"
4. Choose your domain and complete setup

#### 3. Upload Files to public_html
1. Go to **Files** → **File Manager**
2. Navigate to `public_html`
3. Delete any existing files
4. Upload these files from `dist/` folder:
   - `.htaccess` (enable "Show Hidden Files" to see it)
   - `index.html`
   - `favicon.svg`
   - `assets/` folder (contains all JS/CSS)

#### 4. Verify File Structure
```
public_html/
├── .htaccess        # SPA routing + MIME types
├── index.html
├── favicon.svg
└── assets/
    ├── index-[hash].css
    ├── index-[hash].js
    ├── vendor-[hash].js
    ├── three-[hash].js
    ├── animation-[hash].js
    └── HeroScene-[hash].js
```

#### 5. Enable SSL
1. In hPanel: **Security** → **SSL**
2. Enable/Install SSL certificate
3. Wait for activation (few minutes)

### The .htaccess File
Located at `dist/.htaccess` - handles SPA routing and MIME types:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

<IfModule mod_mime.c>
  AddType application/javascript .js
  AddType text/css .css
  AddType image/svg+xml .svg
</IfModule>
```

### Why NOT Node.js on Hostinger
- Node.js deployment causes "MIME type text/plain" errors
- Static hosting handles MIME types correctly out of the box
- Vite builds are static files - no server needed
- Simpler, faster, more reliable

### Re-deploying Updates
1. Run `npm run build` locally
2. Upload new `dist/` contents to `public_html`
3. Overwrite existing files

### GitHub Repository
- URL: https://github.com/kaeczen/kaeczen-website
- Branch: main

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
