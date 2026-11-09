# Real project screenshot provenance

Captured locally on 2026-11-08 for the portfolio.

## AgileFlow
- Public source: https://github.com/Liexx666/agileflow-deploy
- Commit: 31f6d36603b3c07706fcede796eb2e95932f9ede
- Started Django 5.2.17 from an unchanged checkout on http://127.0.0.1:8101.
- Used a new SQLite database inside the ignored preview directory. The bootstrap asserted the database engine and resolved path before applying migrations.
- Did not use run.py, seed_backlog, a shared Neon database, or a production account.
- Created a local Preview User with an unusable password, one sprint, and six explicitly labelled demo tasks.
- Used the application's own City / Cyber Night wallpaper and dark mode (body data-theme=city, data-mode=dark; computed background points to city_dark.svg) and real /sprint-board/1/ route.
- Authentication used a local Django test session held in process memory, not a stored production credential.
- Browser response: HTTP 200, six rendered task cards, no JavaScript page errors.
- No product templates, styles, or tracked source files were changed.
- Screenshot: public/images/projects/agileflow-board.png
- Size: 1440 x 1000, 382723 bytes.
- SHA-256: 38D384B1E80DF6E29E756E35DAF5F914BEC65D6EE131FD9D7ACE946BDF2DB75A.

## Java Roguelike / Garbage Collection Inc.
- Public source: https://github.com/Liexx666/fit2099-Roguelike-game
- Commit: 4ca6b4501aa44010edab482857376e045bc7d533
- Compiled the unchanged src/main/java sources with the installed Java 17 compiler and UTF-8.
- Ran the real game.Application entry point.
- This project is an ASCII console game, not a graphical pixel-art game.
- A temporary local xterm.js page displayed the running Java process's stdout/stderr without replacing the map or menu text. It is a terminal display adapter for capture, not a new game frontend shipped with the portfolio.
- The screenshot shows the initial facility map and the first worker's actual action menu.
- After capture, sent the menu's "5" action to the real process and verified that Bob did nothing and play advanced to Tom.
- Used the repository's supported no-key/offline weather mode. No API key was provided.
- No Java source was changed. The compiled classes and runtime transcript remain under .tooling.
- Screenshot: public/images/projects/roguelike-terminal.png
- Size: 979 x 1033, 80112 bytes.
- SHA-256: 4B001C32D09520CAECB1259EA31254451588E1CBCD10B7F584CF99389AD93B3C.

## Website integration
Both screenshots are direct browser/terminal captures, with no generated replacement UI or changes to product text.
Cards and detail dialogs link to the full original image and preserve the aspect ratio.
English and Chinese captions explain local demo data and the terminal interface. The actual English product pixels are not translated or repainted.
AgileFlow's confirmed public source is now linked in its detail dialog.
The previous illustrative Kanban markup has been removed, and the game no longer uses a generic code illustration.

## Capture tooling
Ignored working area: .tooling/project-previews/
- bootstrap_agileflow.py: local-only SQLite setup and temporary authentication.
- terminal/server.mjs: local Java stdio transport; no shell prompt or OS command execution.
- terminal/index.html: xterm.js display of live game output.
- capture-products.mjs: original real screenshots and runtime assertions.
- capture-agileflow-dark.mjs: AgileFlow-only recapture, asserting the actual City/dark attributes before capture; no CSS injection or product repainting.
The temporary runtime environments are not needed to build or deploy the static portfolio.

## Verification boundary
This demonstrates the captured local screens and a single game input, not full regression of either application.
No claim is made about production login, cloud database health, attachment storage, all game features, or externally hosted uptime.
