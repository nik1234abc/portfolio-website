# Nikhil Gadhwal Portfolio Website

Premium recruiter-focused portfolio site for senior Java backend, microservices, and cloud engineering opportunities.

## Stack

- React + Vite
- Tailwind CSS
- Framer Motion
- React Helmet Async
- Lucide icons

## Folder Structure

```text
website/
  public/
    CNAME
    favicon.svg
    og-cover.svg
    profile-photo.jpg
    profile-placeholder.svg
    Nikhil_Gadhwal_Resume.pdf
    site.webmanifest
    robots.txt
    sitemap.xml
  src/
    components/
    data/
    hooks/
    App.jsx
    index.css
    main.jsx
  index.html
  netlify.toml
  package.json
  postcss.config.js
  tailwind.config.js
  vite.config.js
```

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Start the dev server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

4. Preview the production build:

```bash
npm run preview
```

## Content Updates

- Main portfolio content lives in `src/data/portfolio.js`.
- Resume download file is `public/Nikhil_Gadhwal_Resume.pdf`.
- If you add a real GitHub profile URL, update `personal.github` in `src/data/portfolio.js`.
- Active profile image is `public/profile-photo.jpg`.
- If you replace the profile image later, keep the new file in `public/` and update `personal.profilePhoto`.

## SEO Setup

The site already includes:

- Page title and meta description
- Keyword metadata for backend-engineering search terms
- Open Graph tags
- Twitter card tags
- Canonical URL
- JSON-LD `Person` schema
- `robots.txt`
- `sitemap.xml`
- Favicon and web manifest

Before going live, confirm these values in `src/data/portfolio.js`:

- `seo.siteUrl`
- `personal.linkedin`
- `personal.github`

## Deployment

### Vercel

1. Push the `website` folder to GitHub.
2. Import the repo into Vercel.
3. Set the root directory to `website`.
4. Framework preset: `Vite`.
5. Build command: `npm run build`
6. Output directory: `dist`
7. Add the production domain `nikhilgadhwal.in` in Vercel project settings.

### Netlify

1. Connect the repo to Netlify.
2. Set base directory to `website`.
3. Build command: `npm run build`
4. Publish directory: `dist`
5. The included `netlify.toml` handles SPA routing.
6. Add `nikhilgadhwal.in` as a custom domain in Netlify domain settings.

### GitHub Pages

GitHub Pages works best here with the custom domain so the app can be served from `/` using the included `public/CNAME`.

1. Run:

```bash
npm install
npm run build
npm run deploy
```

2. In GitHub, enable Pages for the `gh-pages` branch.
3. Set the custom domain to `nikhilgadhwal.in`.
4. Ensure HTTPS is enabled in Pages settings.

If you ever deploy under a repository subpath instead of a custom domain, set the base path before building:

```bash
VITE_BASE_PATH=/your-repo-name/ npm run build
```

## Domain and DNS Setup for `nikhilgadhwal.in`

### Apex Domain

Point the root domain to your hosting provider:

- For Vercel or Netlify, add the provider-recommended A records or alias/ANAME records.
- For GitHub Pages, add the current GitHub Pages A records at your DNS provider.

### WWW Domain

Create a `CNAME` record for `www` that points to:

- Your Vercel or Netlify provided target, or
- `<your-github-username>.github.io` for GitHub Pages

### SSL

- Vercel, Netlify, and GitHub Pages all provide managed SSL after the DNS records are correct.
- Always force HTTPS once the certificate is active.

## Lighthouse and Performance Notes

- Keep project screenshots and future images compressed and modern (`.webp` or optimized `.png`).
- Replace placeholder assets with optimized files before launch.
- Avoid adding large animation libraries beyond Framer Motion.
- If you add analytics, prefer lightweight providers such as Plausible or Vercel Analytics.

## Future Extensions

The codebase is structured so you can add these easily:

- Blog or writing section
- More certifications
- Additional projects
- Testimonials or recommendations
- Contact form backend
- GitHub contribution graph
- Interview-prep content section
