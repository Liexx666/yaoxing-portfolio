# Validation report
Date: 2026-11-09. Scope: local Windows implementation with English and Simplified Chinese.

## Passed
- TypeScript project compilation and Vite production build.
- oxlint on application, tests and configuration: no warnings/errors.
- Playwright in installed Google Chrome: 57 tests passed in the final complete run.
- Language switching updates all sections, project descriptions/contributions, buttons, accessibility labels, document language, page title and meta description.
- No page reload when switching; current theme, hash navigation target and expanded mobile menu are preserved.
- Explicit language preference survives reload and repeated switching.
- Chinese browsers default to Chinese; saved English takes priority; invalid preferences fall back to browser detection.
- Blocked localStorage does not prevent either language or theme switching.
- Both languages fit at 320, 375, 390, 768, 980, 1024 and 1440 CSS pixels; header controls remain reachable and the hero heading does not overflow.
- Mobile menu, compact mobile theme control, anchor navigation, original project destinations, Escape dismissal and focus return.
- Keyboard skip link and reduced-motion settings.
- axe WCAG A/AA automated rules (including 2.1 and 2.2) report zero violations for the page and project dialog across both languages and both themes.
- Fourteen final screenshots captured; desktop and mobile screenshots reviewed for English/Chinese and light/dark variants.
- Screenshot capture reported no JavaScript runtime errors.
- No additional dependency, backend, online translation service or API key is needed.
- Root AGENTS.md records that subsequent Chinese requests require both language versions to be updated.

## Implementation
src/i18n/messages.ts holds matching interface-copy keys.
src/data/portfolio.ts uses localized(English, Chinese) pairs for profile/project/skill content; shared(...) preserves proper names.
LocaleProvider shares one language setting through React Context and updates page metadata.
Both languages reuse the same components and actual links.
Mobile theme controls cycle Light > Dark > System. Navigation expands below 981px to leave space for language switching.
The original Word resume is unchanged. The Chinese interface uses the approved Chinese PDF; the English interface uses the complete English translation. Both use the owner-approved email address.

## Production build
Main JS approximately 274.23 kB / gzip 87.65 kB.
CSS approximately 45.22 kB / gzip 10.75 kB.
HTML approximately 1.78 kB / gzip 0.87 kB.
No remote font or image download is required at runtime.

## Limits
Chrome viewport emulation does not verify real iPhone/iPad hardware or Safari.
No Safari/Firefox run, field Core Web Vitals measurement, manual screen-reader audit or full WCAG conformance is claimed.
The two language views share the same static page URL. There are no separate server-rendered language routes.
Existing external destinations are preserved; tests verify hrefs, not authenticated functionality or future uptime.
No production deployment or GitHub upload has been performed.

## Windows terminal startup regression
The earlier VS Code failure was reproduced with PATH limited to Windows system directories.
scripts/npm.ps1 temporarily prepends the selected Node directory for npm child processes, then restores PATH in finally.
start.ps1 uses system npm only when both node.exe and npm.cmd resolve; otherwise it uses the local helper.
The restricted-PATH build and startup were verified in the prior fix, including HTTP 200 and restoration of the original PATH. Those startup files are unchanged in the bilingual update.


## Starfield, material and interests update
- Final complete run: 42 tests passed, including the existing bilingual/theme/accessibility regressions.
- New behavior verified: YaoXing identity, both translated hobby stories, original rank image loading, exact Riot ID copying and blocked-clipboard feedback.
- Verified animation pause/resume, saved pause preference, language/theme independence, unavailable storage, and reduced-motion preference changes.
- Verified pointer-following highlight changes, no card transform, cleanup on pointer leave, and disabled pointer updates while paused.
- Screenshot review found mobile clipping that the original root-overflow assertion missed: the decorative hero artwork enlarged the grid track. Changed the mobile track to minmax(0, 1fr), adjusted small-screen Latin heading size, and added explicit hero-copy viewport bounds to both-language tests.
- Smoothed ambient gradient boundaries after visual review.
- Final screenshot capture: 21 images, no JavaScript runtime errors.
- The Valorant source and project copy have matching SHA-256 hashes.
- Assets and owner-provided statements are documented in ASSETS-AND-CONTENT.md.
- This is a CSS/SVG interpretation of frosted and liquid glass; native Apple optical refraction and a measured 60fps guarantee are not claimed.
- Real-device Safari and performance field measurements remain unverified.


## Real product screenshots
- Final complete run: 48 portfolio browser tests passed.
- Confirmed both images load at their exact original dimensions, open full originals, appear in detail dialogs, and remain inside 320/390/768/1440px viewports.
- Both language versions use accurate local-run and demo-data captions. AgileFlow's public source link is verified against the cloned public repository.
- Rechecked existing theme, animation, language, keyboard and automated accessibility behavior.
- Reviewed eight project-section screenshots across both languages, both themes and desktop/mobile widths.
- AgileFlow: real HTTP 200 Sprint board, six local demo tasks, zero browser page errors.
- Java: compiled unchanged sources, captured real map/action output, verified an input advances the running game.
- Both cloned repositories had clean tracked source status after capture.
- Detailed source hashes and capture scope are in PROJECT-SCREENSHOTS.md.

## Personal content, dark product capture and resume refinement
- Complete browser run: 53 passed in 42.4s. Production build and oxlint passed.
- Both international and China Valorant IDs copy their exact respective values in both languages, including switching between the two actions.
- Guitar photograph loads at 1200px width, has a visible linked source credit, and uses lower computed brightness in dark mode.
- Paired content includes Jazz and Slow Horses / Bodyguard / The Capture / Sherlock (BBC).
- Both language UIs identify the resume as Chinese. Actual PDF response is HTTP 200 with application/pdf and a %PDF- signature. Download events complete with the correct filename in both languages.
- Visible email and mailto destination match liexx999@163.com.
- Word exported the original read-only; source SHA-256 before and after matched. Poppler confirms one A4 page, visually reviewed in full with no clipping or missing text found.
- AgileFlow was recaptured in the actual application's City / Cyber Night dark mode. Asserted body data-theme=city, data-mode=dark, and computed city_dark.svg background. Six demo tasks rendered and no JavaScript page errors were observed.
- The Java screenshot was preserved; the Java application was not rerun for this content update.
- The existing portfolio preview remains on 127.0.0.1:5173. Temporary AgileFlow runs only locally; no production data or public deployment was used.

- Final content review: Chinese dark desktop/mobile, English light mobile, and Chinese dark resume section screenshots inspected. Photography, account ordering, four-title list and PDF actions are legible. Lazy-loaded images were explicitly scrolled into view and decoded before the English mobile capture.
- Content review capture observed zero JavaScript page errors.
- Temporary Django capture process stopped after screenshot verification; the portfolio preview was retained.
- Verified dist/resume/yaoxing-resume.pdf has the same SHA-256 as the approved public PDF, and the narrow Git ignore exception includes that specific file only.

## Education and birthplace correction (2026-11-09)
- English and Chinese profiles now state born in Shanghai in 2006, with Monash education from February 2025 to the end of 2028 (expected).
- Paired content remains in profile.background and profile.educationPeriod; About renders these shared fields without duplicating locale-specific components.
- Browser checks confirmed the exact two-language facts and education-period bounds at 390px and 1440px, with zero page errors. Reviewed English light mobile and Chinese dark desktop layouts.
- Production build and oxlint passed. The existing browser regression suite was rerun after this update: 53 passed in 39.7s.
- Corrected only the education date in the public resume PDF, exporting from a read-only original with in-memory edits. Original SHA-256 unchanged. Poppler confirms one A4 page; pypdf extraction confirms 2025.02 and removes 2024.06; rendered full-page review found no clipping or missing text.
- Final review also inspected Chinese dark mobile and English light desktop About screenshots. All four requested locale/viewport combinations retain readable birth and education facts.

## QA case study and English resume (2026-11-09)
- Final complete browser run: 57 passed in 40.6s. TypeScript/Vite build and oxlint passed.
- AgileFlow now foregrounds the owner-confirmed QA role. An optional localized case study covers role, progress-alignment challenge, test-case checklist approach and learning; the game retains its previous content without a fabricated case study.
- Verified the case in both languages, mobile dialog reading at 320px, all four labelled case sections, Escape dismissal, and absence of the QA case in the game dialog.
- English resume View/Download resolve to yaoxing-resume-en.pdf; Chinese actions resolve to yaoxing-resume.pdf. Verified both HTTP/PDF responses and actual successful download events, correct filenames, immediate language switching without reload, and saved language preference after reload.
- Both language/theme page and dialog axe checks passed, including the added case section. This remains automated checking rather than a full accessibility certification.
- English PDF: one A4 page, 76750 bytes; embedded fonts and clickable contact/project links. Every substantive source topic was checked in text extraction, including corrected dates, source score values, both projects, course/certificate distinctions and testing details. The complete rendered page was inspected; no clipping, missing text or broken glyphs found.
- The source resume's 40/6 automated-check figures are translated claims from that document; they were not rerun or newly verified in this portfolio task.
- Reviewed four dark-theme QA-case screenshots across English/Chinese and desktop/mobile widths, plus both language resume sections. Browser capture observed no page errors.
- Original Word SHA-256 unchanged; Chinese PDF unchanged in this step. Both approved PDFs have narrow .gitignore exceptions. Production dist contains the same English PDF SHA-256 as public.
- Optional scripts/generate-resume-en.py rebuilds the English PDF from reviewed translation content. Python/ReportLab is not an application runtime/build dependency.
- No public upload or deployment occurred. Real-device Safari and field performance remain unverified.
