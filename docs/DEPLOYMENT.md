# GitHub and Vercel deployment
Deployment is prepared, not performed. Obtain the owner's confirmation before any public upload or deployment.

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
