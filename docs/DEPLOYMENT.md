# GitHub and Vercel deployment
Initial production deployment verified on 2026-11-09 after the owner's guided GitHub push and Vercel deployment.
- Live URL: https://yaoxing-portfolio.vercel.app/
- GitHub: https://github.com/Liexx666/yaoxing-portfolio
- Initial main commit: 1f75e0a59b4a39e999ccbdcd08eb5fabf94339e5
- Framework Vite; root ./; build npm run build; output dist; install npm ci; no environment variables.
- Read-only browser checks: HTTP 200, both languages, theme/language persistence, mobile menu, QA case, and both real PDF downloads.
- All four content images and two PDFs returned HTTP 200 and matched local SHA-256 hashes. No page errors or failed requests observed in the run.
- These are focused production checks; no real-device Safari or measured Core Web Vitals guarantee is claimed.

Future public uploads/deployments should stay within the owner's authorization.

## Before publishing
Review src/data/portfolio.ts, project descriptions and the intended PDF/email.
Confirm permission to publish any team-project source or screenshots.
Run build and browser tests. Check narrow layouts and both themes.
.gitignore excludes tooling, local test output, environment files and private resume documents.

## GitHub
A local Git repository can be initialized independently of any remote.
Create an empty GitHub repository under the intended account when ready.
Then run these commands only after reviewing the staged files:
```powershell
git status
git add .
git diff --cached --stat
git commit -m "Build personal portfolio"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```
Replace the explicit URL placeholder with the real GitHub repository URL.
Never embed access tokens in remote URLs or source files.
Do not force-push an existing repository.

## Vercel
Official reference: https://vercel.com/docs/frameworks/frontend/vite
After public deployment is approved, import the chosen GitHub repository.
Framework: Vite.
Install command: npm ci.
Build command: npm run build.
Output directory: dist.
Root: repository root.
No environment variables or Python service are needed.
The native hash links need no SPA route rewrite. Do not add an unnecessary catch-all.
Check the deployment build log, live page, theme persistence, mobile menu, project links and PDF before calling deployment verified.

## Future backend
FastAPI and Render can be evaluated when a genuine server feature is chosen.
A static portfolio alone does not justify a backend, database, authentication, or secret keys.
Do not move credentials into VITE_ variables: they become public browser code.

## Performance monitoring
@vercel/speed-insights 2.1.0 is installed locally and integrated in src/main.tsx through the /react entry point. It is mounted once, outside the language-dependent component tree, only when import.meta.env.PROD is true. Local Vite development does not load the monitoring script.
The production-preview check confirmed one /_vercel/speed-insights/script.js injection tagged as the React SDK, and no duplicate after language/theme switching. The tracking script was stubbed for this local check; it does not prove actual telemetry delivery.
Pending: guided Git commit/push, a successful Vercel redeploy, then check the live tracking script and dashboard events. The currently verified initial live deployment predates this integration.
Current official guidance: https://vercel.com/docs/speed-insights/quickstart and https://vercel.com/docs/speed-insights/limits-and-pricing
The basic tier is free on Hobby and provides RES; detailed Core Web Vitals require Plus. Monitoring informs optimisation but does not automatically speed up the site. No Plus upgrade, custom endpoint, API secret, or Vercel CLI is needed for this Git-based setup.
