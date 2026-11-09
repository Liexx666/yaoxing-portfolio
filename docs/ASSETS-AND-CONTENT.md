# Visual assets and content provenance
Updated 2026-11-09.

## User screenshot
public/images/valorant-rank.png is an unmodified copy of the screenshot supplied in this chat.
Dimensions: 630 x 460.
SHA-256: 266FB61A54900DBE11B1DC1EDBBEBEAD3F10C726016C8F167C8B88A4377C5001.
It shows a rank snapshot, not a live rating feed. The caption and alt text reflect that.

## Personal statements
Monash Cup 2026 championship, tournament MVP, JDG (Jingdong Gaming) youth training, Riot ID Kn1ghT9#KniT9, China Valorant ID Kn1ghT9#4533, favourite music Jazz, four TV titles and email liexx999@163.com were explicitly supplied by the owner.
The rank screenshot is not represented as evidence for the competition results or youth training.
No dates, team tenure, salaries, professional contract, extra tournament placements, tracker URLs, or claims of current employment were added.
The English version expresses the same statements as the Chinese version.

## Original decorative artwork
public/images/pixel-sprites.svg contains small original pixel-style stars, cloud, ghost, cat, and planet, authored as SVG.
public/images/guitar-study.svg is the earlier original illustration, retained but no longer displayed. The guitar card now uses the credited photograph below.
public/favicon.svg is an original star mark for YaoXing.
The animated background uses CSS transforms/opacity and local SVG assets, with no remote image provider, GIF/video dependency, or tracking.

## Guitar photograph
- Website asset: public/images/guitar-photo.jpg, 1200 x 1704 JPEG.
- Photographer: Chris Hardy; original page: https://unsplash.com/photos/a-close-up-of-an-acoustic-guitar-on-a-black-background-kXK4dYneOpo
- License: https://unsplash.com/license (free Unsplash photograph, not Unsplash+).
- Official image: https://images.unsplash.com/photo-1588690224648-20426ab6274a?auto=format&fit=max&w=1200&q=85&fm=jpg
- SHA-256: BD103C1ABA3E6D9846ADF509AE94692FB0E8BF2956309443843E8D80E9F53F04.
- Visible source credit in both languages. This is stock photography, not a claim to show the owner's guitar.
- CSS brightness/saturation dims the display in dark mode; the downloaded photo is not repainted or generated.
- To replace with a personal photograph: update hobbies.guitar.image, source/credit and paired alt text; review desktop/mobile crops and remove the stock credit only when actually replacing it.

## Approved resume and contact
The owner explicitly requested publishing the supplied Chinese resume in the site and supplied liexx999@163.com as contact email.
public/resume/yaoxing-resume.pdf was exported with Word's fixed-format API from the original DOCX opened read-only. The owner corrected the education period on 2026-11-09 to February 2025 through the end of 2028 (expected). The website PDF was re-exported with only this range changed in memory; the original document was closed without saving and remains outside the project.
Original DOCX SHA-256 before/after: 29A099E71392F2B8F107E51E2062C43068CE8692240AECA8BBED9DB39C3136DD.
PDF SHA-256: 2E7E6E7BA42216D1BD34EC3C0880B41A170DCEA23CBC4076E7C45F4B10F12E24.
Poppler confirms one A4 page; the rendered page was visually inspected for legibility, clipping and layout.
The Chinese interface uses the approved Chinese PDF; the English interface now uses the complete translated PDF described below.
The site has not been uploaded or deployed publicly as part of this change.

## Real project captures
public/images/projects/agileflow-board.png and roguelike-terminal.png were captured from the owner's running public source projects.
The earlier portfolio board illustration was replaced rather than relabelled.
See PROJECT-SCREENSHOTS.md for exact source commits, demo-data scope, runtime method and SHA-256 hashes.

## Corrected personal profile (2026-11-09)
The owner explicitly supplied the following corrections: Monash enrolment in February 2025; expected graduation at the end of 2028; born in Shanghai in 2006.
Both English and Chinese About sections use the same paired data in src/data/portfolio.ts. No full birth date, current age, nationality or current location was inferred.
The downloadable PDF uses the corrected education range. Birth information was added to the website's About text; no unrelated resume content was added.

## QA case study and English resume (2026-11-09)
The owner clarified that their main AgileFlow responsibility was QA, and recalled solving progress-alignment difficulties with a test-case checklist or similar list. The site describes that process generically. No specific spreadsheet, application, meeting cadence, time-saving number or supporting artifact link is invented. Existing game content remains; no new game challenge narrative was added.
The English PDF translates every substantive source topic, with the corrected education period. It does not add the website's new checklist story as an extra resume claim. The original source's contact details and the 40 automated checks / 6 precision checks are preserved; the latter are attributed to the supplied resume, not independently rerun for this translation.
English asset: public/resume/yaoxing-resume-en.pdf, one A4 page, 76750 bytes.
English SHA-256: 65896283ADC3970E7104B0CCEBA67E582E0E0FB76D22751641AECEC2BD635C7B.
Generator: scripts/generate-resume-en.py, using local ReportLab with embedded Arial fonts; no external translation or data upload.
Text extraction checks cover the full list of source topics, corrected dates and embedded contact/project links. The final page was rendered and visually inspected for clipping and missing content.
