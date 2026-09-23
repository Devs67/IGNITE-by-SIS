# Sreenidhi IGNITE — website

Source for **https://ignitebysis.com**, the site for Sreenidhi IGNITE 2026–27
(Hackathon & Makeathon, 15–16 October 2026, Sreenidhi International School).

Built with Vite, React, Tailwind CSS and Motion.

## Run locally

```bash
npm install
npm run dev
```

## Deploy

Push to `main`. The GitHub Actions workflow in `.github/workflows/deploy.yml`
builds the site and publishes it to GitHub Pages (custom domain in `public/CNAME`).

## Where things live

- Pages and their order: `src/pages.ts`
- Text content (FAQs, challenges, vision/mission…): `src/data/igniteData.ts`
- Sections: `src/components/`
- Photos: `src/assets/images/gallery/` (web copies; originals are kept in `Images/`, not committed)
