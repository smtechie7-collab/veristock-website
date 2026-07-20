# VERISTOCK PRO Official Website

The official website, landing page, support center, and legal privacy/terms portal for **VERISTOCK PRO** — the advanced offline-first retail ERP built by SM Technologies.

## 🚀 Features

- **Material 3 Design:** Responsive layout utilizing rounded corners (`16px`), glassmorphism, dynamic animations, and responsive spacing.
- **Light & Dark Theme Toggle:** Synchronized with local storage preferences and device themes.
- **Zero Third-Party Dependencies:** Built entirely with raw, valid HTML5, CSS3, and Vanilla ES6 JavaScript. No React, Angular, Tailwind, or Bootstrap.
- **Lighthouse Performance Optimized:** Preloaded fonts, optimized inline SVG graphics, lazy-loaded visual assets, and strict code footprints.
- **Play Store Compliant:** Fully integrated legal pages including Privacy Policy, Terms of Service, and a functional self-serve Cloud Account Deletion form.

---

## 📂 Project Structure

```text
veristock-website/
├── assets/
│   ├── css/
│   │   └── style.css            # Custom CSS variables, themes, animations & layouts
│   ├── js/
│   │   └── main.js              # Vanilla JS for toggles, slide carousels, forms & keyboard navigation
│   └── images/
│       └── logo.svg             # The vector brand shield logo path-derived from Android XML
├── pages/
│   ├── privacy-policy/
│   │   └── index.html           # Google Play Policy compliant privacy disclosure
│   ├── terms/
│   │   └── index.html           # B2B SaaS terms and conditions
│   ├── account-deletion/
│   │   └── index.html           # Self-serve/manual account deletion instructions and form
│   └── support/
│       └── index.html           # Customer support page with FAQs and email guides
├── index.html                   # Main page with Hero, Features, Screenshots, FAQ, and Contacts
├── sitemap.xml                  # SEO search engine index map
├── robots.txt                   # Crawler directives
├── manifest.webmanifest         # PWA configurations
├── AI_WEBSITE_CONTEXT.md        # AI Agent manual linking the site with the Android codebase
└── README.md                    # This file
```

---

## 🛠️ Local Development

This website has **zero build dependencies** and can be run locally using any standard static file server.

### Option 1: Live Server (VS Code Extension)
Right-click on `index.html` and click **Open with Live Server**.

### Option 2: Python HTTP Server (Built-in)
If you have Python installed, run this command in the project root:
```bash
python -m http.server 8000
```
Then open [http://localhost:8000](http://localhost:8000) in your browser.

### Option 3: Node.js static server
If you have npm installed, run:
```bash
npx http-server . -p 8000
```

---

## 🚢 Deployment

### 1. GitHub Pages (Recommended Free Hosting)
1. Push this repository to a public/private GitHub repository.
2. In the repository settings, go to **Pages** on the left menu.
3. Under **Build and deployment**, select **Deploy from a branch**.
4. Set the branch to `main` (or your default branch) and folder to `/ (root)`. Click **Save**.
5. Your site will be live at `https://<username>.github.io/veristock-website/`.

### 2. Cloudflare Pages
1. Connect your GitHub account to the Cloudflare dashboard.
2. Select **Pages** -> **Create a project** -> **Connect to Git**.
3. Choose the `veristock-website` repository.
4. Set the **Framework preset** to `None` (Static HTML).
5. Leave the build command and output directory blank. Click **Save and Deploy**.
6. Set your custom domain `veristockpro.com` in the Cloudflare Page settings.
