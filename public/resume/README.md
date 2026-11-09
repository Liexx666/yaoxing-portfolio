# Approved bilingual resumes

The owner approved both PDFs for this portfolio. profile.resumePdf in src/data/portfolio.ts is now a localized English/Chinese path pair:
- Chinese: /resume/yaoxing-resume.pdf
- English: /resume/yaoxing-resume-en.pdf

Contact.tsx resolves the path with localize(...), so both View and Download change immediately with the language button. Each version identifies its own document language. Neither action requires a backend.

## Source and fidelity
The Chinese PDF was initially exported from the original Word resume. On 2026-11-09 the owner corrected the education period to February 2025 through the end of 2028 (expected); only that range was changed in memory before re-exporting the website PDF. The original Word file remains outside this project, unchanged.

The English PDF is a complete translation of the substantive Chinese resume content, with those corrected dates. It retains the original contact details, education, scores, tools, certificates/study, both projects, and algorithms/testing practice. The title uses the English name YaoXing Li. ISTQB preparation is explicitly exam preparation, not a certification. The 40/6 test figures are source-resume claims, not a new independently verified regression result.
The new website QA checklist case study is separate editorial content based on the owner's chat explanation; it was not added as a fabricated extra resume achievement.

## Rebuild the English PDF
Optional script: scripts/generate-resume-en.py. Requires Python with reportlab; it is not required for npm build or runtime.
Run from the repository root:
    python scripts/generate-resume-en.py
On this computer, use the configured bundled Python with reportlab, since the default Python installation may not include it.
The script uses Windows Arial when available and bundled ReportLab Vera otherwise. It checks column heights and fails rather than silently clipping content. Recheck the PDF rendering after every edit.

Both PDFs are one A4 page. Every final page was rendered with Poppler and inspected visually. The approved PDFs have individual .gitignore exceptions; other resumes and DOCX files remain ignored.
Future Chinese content requests must be reflected in both language versions. Resume content changes also require updating the English translation and rendering both PDFs as appropriate; no automatic translation service is used.
