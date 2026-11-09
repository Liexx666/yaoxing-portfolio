# YaoXing Portfolio Design System
Status: approved implementation direction for the first local version, 2026-11-08.
This is a web interpretation of Apple design principles, not Apple's native optical Liquid Glass renderer.

## Inputs and decisions
Generated with UI UX Pro Max CLI 2.15.0 and its local Python search engine.
The initial recommendation is preserved in GENERATED.md for provenance. Its luxury gold palette, Cormorant/Montserrat typography, and scroll storytelling are rejected for this project.
A focused style query returned Liquid Glass; a focused color query returned Portfolio/Personal (monochrome plus blue). These relevant results inform this specification. The user's explicit cool blue, no-green, dual-theme and accessibility requirements take precedence.
React guidance: local state via useState; test observable behavior.
Source: https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
Apple references:
- https://developer.apple.com/design/human-interface-guidelines/
- https://developer.apple.com/design/human-interface-guidelines/materials
- https://developer.apple.com/documentation/technologyoverviews/adopting-liquid-glass

## Composition
Editorial, asymmetric first screen with one main action: View projects.
Sequence: Home > Projects > About > Skills > Interests > Resume > Contact.
One anchor-based document avoids unnecessary routing and keeps each section shareable.
Project previews use actual captures from running source code. Label local demo data and the Java terminal interface accurately; never replace either with an invented UI.
Glass is used for navigation, layered hero accents, and selected content cards. Keep smaller supporting cards opaque so material still expresses hierarchy.
No fabricated project metrics, proficiency percentages, employers, testimonials, or availability claims.

## Semantic color tokens
CSS source of truth: src/styles/tokens.css.
| Token | Light | Dark | Role |
| --- | --- | --- | --- |
| bg | #F7F8FA | #11141A | Page |
| surface | #FFFFFF | #1B2029 | Content |
| surface-soft | #EEF1F6 | #222A36 | Inset/quiet surface |
| text | #1B2029 | #EEF1F7 | Main text |
| muted | #5E6675 | #B0B9C9 | Body supporting text |
| faint | #626B7C | #A4AFC2 | Captions and eyebrow labels |
| blue | #3869AD | #9BBDF5 | Action and emphasis |
| on-blue | #FFFFFF | #15233A | Action label |
| blue-soft | #E8EFF9 | #283C58 | Tinted accent surface |
| line | #E0E4EB | #343E50 | Decorative borders |

Measure text contrast in the rendered context, including glass surfaces. Normal text target is at least 4.5:1. Decorative hairlines do not identify controls.
Use explicit icons and text for statuses, never color alone.

## Typography
Native system stack: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica Neue, Arial, sans-serif.
No external font request; do not redistribute Apple's proprietary font files.
Hero: 70–94px desktop / 64–91px mobile, weight 650, line-height 0.99–1.01.
Section headings: 32–48px, weight 600, line-height 1.1–1.15.
Body: 14–16px, line-height 1.6–1.85.
Eyebrows: 9–11px, uppercase, letter-spacing 0.16em; supporting decoration only.
Keep long copy readable and allow wrapping. Never disable browser zoom.

## Spacing and geometry
Base rhythm 4px / 8px. Semantic spacing tokens: 4, 8, 12, 16, 24, 32, 48, 64, 96px.
Content max-width 1160px. Gutters desktop 48px, tablet 32px, mobile 20px.
Section padding 70px desktop and 46px mobile, with larger narrative breaks where needed.
Radii: 12px small, 20px medium, 28px cards, 36px large, pill for actions.
Hero artwork may use sculptural radii independently of interactive controls.

## Elevation and materials
Subtle shadow: 0 2px 6px rgba(28,44,70,.025).
Floating shadow: 0 24px 64px -24px rgba(36,58,96,.2).
Dark mode uses darker shadows and defined borders.
Navigation uses 20px blur and an opaque fallback if backdrop-filter is unsupported.
Hero is CSS geometry and text. No downloaded image, video, canvas rendering, or expensive animation loop.

## Motion
Press 120ms; controls 220ms; initial reveal 700ms.
Easing: cubic-bezier(.22,1,.36,1).
Animate opacity and transform; avoid layout animation or continuous decorative loops.
Reduced motion disables reveal, smooth scrolling, and transitions.
Reduced transparency / increased contrast prefer opaque surfaces.
Content remains readable without animation. Do not depend on animation-end to set state.

## Responsive and input
Mobile <768px: stacked hero and projects, expandable navigation, two-column skills.
Tablet 768–1100px: reduced gutters and artwork, compact header.
Desktop >1100px: full editorial layout and four-column skills.
Check 320, 375, 390, 768, 1024, 1440px and 200% zoom.
Touch controls target 44×44 CSS px; desktop text links remain keyboard accessible.
Use native dialog for keyboard containment, Escape close and focus return.
Theme options: Light / Dark / System. Default follows OS. Store preference defensively.

## Content editing and extension
Edit src/data/portfolio.ts for identity, education, skills and projects.
Do not add an email, PDF path, GitHub source link or project claim until supplied or verified.
PDF null displays a deliberate coming-soon state. When configured, view and download become available.
Use the master for all future sections. A page-specific exception belongs under pages/ and must explain the reason.


## Bilingual experience
Support English (en) and Simplified Chinese (zh-CN) through one shared component tree.
A top-right language button shows 中文 on the English page and EN on the Chinese page.
Default follows the browser language (Chinese for zh, English otherwise); saved explicit preference takes priority. Storage failure must not prevent switching.
Keep theme, navigation target and expanded mobile menu when language changes.
Maintain matching text in src/i18n/messages.ts and paired content in src/data/portfolio.ts.
The user's Chinese requests imply updating both languages; see the root AGENTS.md.
Update the document language, title, description and accessible names with the selected locale.
Add PingFang SC and Microsoft YaHei to system font fallbacks. Chinese headings use more generous line-height and adjusted type sizes; do not retain overly tight Latin tracking.
At widths up to 980px use the expandable navigation. Below 768px collapse theme options into one cycling icon, leaving room for the always-visible language action.
Verify both languages and themes, including 320px-wide screens and project dialogs. Never use country flags as language labels.


## YaoXing starfield and material update
Requested by the owner on 2026-11-08.
Use YaoXing as the display name, with a small four-point star brand mark; retain real URLs and existing project directory names.
Connect Xing to the Chinese word for star through the bilingual star-signature copy.
Add a soft, animated blue sky with original pixel-style clouds, a ghost, a cat, a planet, and slow twinkling stars.
Keep the background pointer-transparent and hidden from assistive technology.
Background drift must pause through the visible control, follow reduced-motion preferences, and pause when the page is hidden.
Use transform/opacity animation with long cycles; avoid flashing, fast particles, or decorative event loops.
Selected glass-panel surfaces use translucent gradient material, 22px backdrop blur, a defined edge and inset reflection.
Pointer-driven highlights update at most once per animation frame through useGlassInteraction; do not tilt the content or animate the card's bounds.
Disable pointer-driven motion for reduced motion, explicit pause and coarse pointers. Provide opaque fallbacks for unsupported blur, reduced transparency and increased contrast.
Interests contains a Valorant card with the owner's original rank screenshot, supplied achievements, training statement and Riot ID, plus a credited guitar photograph, Jazz preference, and a four-title TV list.
Never present stock photography as the owner's guitar. Both languages show the same achievements, music preference, TV list and photo credit.


## Actual project images
AgileFlow uses the captured local Sprint board; the Roguelike uses its real Java ASCII console.
Keep each capture's aspect ratio and provide a full-original link. Do not crop away the game menu or redraw the product.
Use localized captions/alt text while preserving the actual English product pixels.
Capture provenance is in docs/PROJECT-SCREENSHOTS.md.

## Personal content and photography refinement
Use a real, dark-background guitar photograph with visible source credit. Apply presentation-only brightness .93 in light mode and .72 in dark mode; preserve visible wood and string detail. Never add a light illustration backing on mobile.
Keep international and China Valorant IDs in vertically ordered, independently copyable rows. Use a single polite status region identifying the selected account after success.
Place the TV list in a restrained full-width card with four text entries. Two columns on mobile, no invented posters or external show links.
Use the approved Chinese resume in Chinese and the translated English resume in English, with clear language disclosure; visible contact email must match its mailto destination.

## QA case study and resume language
Use an optional caseStudy field on project data. Render the AgileFlow case as a quiet inset section in its existing detail dialog: role, challenge, approach, takeaway. Keep the native dialog's scroll and keyboard behaviour; avoid a separate page or fabricated artifact download.
Resolve localized PDF paths from the active language so View and Download always agree. Keep the English translation complete and disclose certification preparation accurately.
