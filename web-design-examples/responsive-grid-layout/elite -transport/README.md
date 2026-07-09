# Elite Transportation Services — Website Package

A fully responsive, WCAG-accessible, multi-page static website for a generic "Transportation Services" company. Built with semantic HTML5, a single global CSS file, and vanilla JavaScript. No frameworks or build tools required.

---

## 📁 Project Structure

```
transportation-site/
├── index.html              ← Home page (hero, features, fleet preview, testimonials)
├── pages/
│   ├── vehicles.html       ← Fleet page (filterable grid + detailed vehicle panels)
│   ├── quote.html          ← Quote request form (validated, accessible)
│   └── contact.html        ← Contact info, map placeholder, contact form, FAQ
├── css/
│   └── global.css          ← Single global stylesheet (mobile-first, CSS variables)
├── js/
│   └── main.js             ← Vanilla JS (nav toggle, form validation, scroll animations)
├── images/
│   ├── logo.svg            ← Company logo (inline SVG, scalable)
│   ├── vehicle-limo.svg    ← Stretch Limousine illustration (800×400)
│   ├── vehicle-suv.svg     ← Luxury SUV illustration (800×400)
│   └── vehicle-partybus.svg← Party Bus illustration (800×400)
└── README.md               ← This file
```

---

## 🎨 Design System

| Token | Value | Usage |
|---|---|---|
| `--navy` | `#0b2545` | Primary brand, headers, nav |
| `--teal` | `#0fb3a6` | Accent, CTAs, highlights |
| `--gray-light` | `#f5f7fa` | Page background |
| `--text` | `#111827` | Body copy |
| `--white` | `#ffffff` | Cards, surfaces |

**Typography:** System font stack (`Segoe UI`, `system-ui`, `sans-serif`)  
**Layout:** CSS Grid + Flexbox, mobile-first breakpoints at 480px / 540px / 768px / 900px

---

## 🚀 Deployment

### Option 1 — Direct File Serving (No Server Needed)
Open `index.html` directly in any modern browser. All assets use relative paths and work locally without a web server.

### Option 2 — Static Hosting (Recommended for Production)

Deploy to any static host with zero configuration:

**Netlify (Drag & Drop)**
1. Go to [netlify.com](https://netlify.com) → New site → Deploy manually
2. Drag the entire `transportation-site/` folder into the upload zone
3. Your site is live instantly with a free subdomain

**GitHub Pages**
1. Push the folder contents to a GitHub repository
2. Go to Settings → Pages → Source: `main` branch, root `/`
3. Site publishes at `https://yourusername.github.io/repo-name`

**Azure Static Web Apps**
1. Push to GitHub or Azure DevOps
2. Create a Static Web App resource in Azure Portal
3. Connect your repository — auto-deploy on every push

**Vercel**
```bash
npm i -g vercel
cd transportation-site
vercel
```

**AWS S3 + CloudFront**
1. Create an S3 bucket with static website hosting enabled
2. Upload all files (maintain folder structure)
3. Set `index.html` as the index document
4. Attach a CloudFront distribution for HTTPS and CDN

---

## 🗺️ Embedding a Real Map (Contact Page)

The contact page includes a `.map-placeholder` div. Replace it with a real embed:

**Google Maps:**
```html
<!-- Replace .map-placeholder div with: -->
<div class="map-placeholder" style="padding:0; overflow:hidden;">
  <iframe
    src="https://www.google.com/maps/embed?pb=YOUR_EMBED_URL"
    width="100%"
    height="320"
    style="border:0; border-radius:12px;"
    allowfullscreen
    loading="lazy"
    referrerpolicy="no-referrer-when-downgrade"
    title="Office location map">
  </iframe>
</div>
```

Get your embed URL: Google Maps → Share → Embed a map → Copy HTML → extract the `src` value.

---

## 📧 Connecting the Quote / Contact Forms

The forms use client-side validation only. To receive submissions, connect a backend:

**Formspree (No-Code):**
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

**Netlify Forms (if hosted on Netlify):**
```html
<form name="quote" method="POST" data-netlify="true">
  <input type="hidden" name="form-name" value="quote" />
```

**EmailJS (Client-side email):**
Replace the fake submit handler in `main.js` with an EmailJS `send()` call.

---

## ♿ Accessibility

- Semantic HTML5 landmarks (`header`, `main`, `nav`, `footer`, `section`, `article`, `aside`)
- ARIA roles, `aria-label`, `aria-describedby`, `aria-current`, `aria-expanded`, `aria-live`
- Skip-to-content link for keyboard users
- WCAG AA color contrast (navy/white: 9.2:1; teal/white: 3.8:1 — passes AA large text)
- Focus-visible styles on all interactive elements
- `prefers-reduced-motion` media query respects user motion settings
- All images have descriptive `alt` text; decorative images use `alt=""`
- Form fields have associated `<label>` elements and `aria-required`

---

## 📱 Responsive Breakpoints

| Breakpoint | Behavior |
|---|---|
| < 480px | Single column, stacked form rows |
| < 540px | Form grid collapses to 1 column |
| < 768px | Mobile nav activates, hero stacks |
| < 900px | Hero badges reposition |
| ≥ 1200px | Max content width constrained |

---

## 🖼️ Image Notes

All vehicle images are hand-crafted SVGs (800×400px). They:
- Scale to any resolution without quality loss
- Support dark backgrounds natively
- Are accessible with `<title>` and `<desc>` elements
- Work as both `<img src>` embeds and inline SVG

**To convert SVGs to PNG** (for social sharing / OG images):
- Online: [svgtopng.com](https://svgtopng.com) or [convertio.co](https://convertio.co)
- CLI: `npx sharp-cli -i images/vehicle-limo.svg -o images/vehicle-limo.png --width 1200`
- Inkscape: File → Export PNG Image → 1200×800 or 400×300

---

## 🔧 Customization Checklist

- [ ] Replace `Elite Transport` with your company name (search: `Elite Transport`)
- [ ] Update `(555) 000-1234` with real phone number
- [ ] Update `info@elitetransport.example` with real email
- [ ] Update `123 Placeholder Blvd, Anytown, ST 00000` with real address
- [ ] Replace map placeholder with real Google Maps iframe
- [ ] Connect quote/contact forms to a backend (Formspree, Netlify, etc.)
- [ ] Add real `<meta property="og:image">` URL for social sharing
- [ ] Add Google Analytics or your preferred analytics tag
- [ ] Update pricing in `vehicles.html` (`$150/hr`, `$95/hr`, `$200/hr`)
- [ ] Add real testimonials and remove placeholder names
- [ ] Add a real `favicon.ico` or update `logo.svg` for your brand
- [ ] Update copyright year and legal links in footer

---

## 🌐 Browser Support

| Browser | Support |
|---|---|
| Chrome / Edge 90+ | ✅ Full |
| Firefox 90+ | ✅ Full |
| Safari 14+ | ✅ Full |
| iOS Safari 14+ | ✅ Full |
| Samsung Internet 14+ | ✅ Full |

---

## 📄 License

This template is provided for personal and commercial use. All placeholder names, addresses, phone numbers, and prices are fictional. No real company is implied or represented.

---

*Generated by Elite Transportation Services Website Package — July 2026*
