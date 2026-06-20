# Likhith Krishna Gowdeti Portfolio

Full-stack portfolio website built with Angular, React, and Node.js.

## Tech Stack

- Angular standalone app for the main recruiter-facing portfolio
- React custom element embedded inside Angular for the skills intelligence panel
- Node.js + Express API for contact form submissions
- TypeScript, responsive CSS, and production build scripts

## Local Preview

```bash
pnpm install
pnpm dev
```

Open the portfolio at `http://localhost:4200`.

The contact API runs at `http://localhost:3001` and stores local submissions in `apps/api/data/inquiries.json`.

## Production Build

```bash
pnpm build
```

Angular output is generated under `apps/portfolio/dist/portfolio`.

## GitHub Push

```bash
git init
git add .
git commit -m "Build full-stack portfolio"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

## Notes

- Update contact details in `apps/portfolio/src/app/data/profile.ts`.
- The contact form opens the recruiter's email client and also posts to the local Node API during development.
- For deployment, host the Angular build on GitHub Pages, Netlify, Vercel, or any static host. Deploy the Node API separately if you want server-side contact storage in production.
