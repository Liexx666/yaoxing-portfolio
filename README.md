# YaoXing Portfolio
A personal portfolio built with React, TypeScript, Vite and Tailwind CSS, with a cool-blue design system inspired by Apple interface principles.

Live website: https://yaoxing-portfolio.vercel.app/

Source: https://github.com/Liexx666/yaoxing-portfolio

## Run locally on this computer
Open PowerShell:
```powershell
cd C:\Users\liexx\Desktop\Li_web
.\start.ps1
```
Preview: http://127.0.0.1:5173
Stop the server with Ctrl+C. This server binds only to this computer.
If port 5173 is already occupied by this project's preview, use the existing browser tab.

npm is currently project-local, so development commands on this computer are:
```powershell
.\scripts\npm.ps1 run build
.\scripts\npm.ps1 run lint
.\scripts\npm.ps1 test
```
The helper does not alter global PATH. A fresh checkout should use a normal Node.js LTS installation with npm:
```powershell
npm ci
npm run dev
npm run build
```
Vite requires a supported Node version (use current LTS; package.json records the minimum).

## Structure and learning map
- src/data/portfolio.ts — editable profile, verified project descriptions and skills. TypeScript checks each project against the Project shape.
- src/components/ — Header, Hero, Projects, ProjectDialog, About, Contact. Each React function returns the UI for one responsibility.
- src/hooks/useTheme.ts — theme preference, OS subscription and cleanup; storage errors do not break rendering.
- src/styles/tokens.css — semantic light/dark tokens. Change a token once to update all components that use it.
- src/styles/global.css — layout, materials, responsive rules, motion preferences and Tailwind integration.
- tests/portfolio.spec.ts — user-observable browser behavior and axe accessibility checks.
- design-system/li-portfolio/MASTER.md — reviewed design specification; GENERATED.md preserves raw Skill output.
- docs/ — setup/security review, deployment instructions and validation notes.

Think of data as ingredients, components as reusable recipes, and design tokens as shared measurements.
React state handles the selected project, mobile menu and theme. A small React Context shares the current language across components; no additional state or translation library is required.
The native dialog provides browser-managed focus containment; effect cleanup restores scrolling and closes it when the selection changes.
Project rendering is O(n) in the number of displayed projects. The current two-project collection needs no pagination, memoization or virtualisation.
The only observer watches a small, fixed number of sections for navigation state; there is no per-frame scroll loop.

## Customize
Edit profile.displayName, projects, skillGroups, and education in src/data/portfolio.ts.
The owner-approved email is liexx999@163.com. Contact uses a visible mailto link; no message is sent by the site itself.
For a PDF, follow public/resume/README.md. The PDF view/download UI activates only after profile.resumePdf is configured.
AgileFlow opens the supplied login URL. Its actual local Sprint board screenshot is labelled as demo data.
The Roguelike repository comes from the supplied resume. The confirmed public AgileFlow repository is linked in its project details.

## Architecture
This version is a single-page static site with native anchor links. Seven modules are available without route loading.
There is no need for FastAPI: all content is static, GitHub/contact links work without server secrets, and no form submission is offered.
Add a backend only when a concrete dynamic feature justifies its operation and security cost.

## Validation
Browser tests use the installed Google Chrome through Playwright. On another machine install Chrome or update playwright.config.ts to the available browser.
Tests cover navigation, project dialogs/focus, themes and OS changes, unavailable storage, mobile menu, responsive viewport widths, reduced motion, skip links, both languages, and both themes with axe.
Automated checks do not establish real iPhone/iPad Safari behavior or full WCAG conformance. See docs/VALIDATION.md.

## Deployment
See docs/DEPLOYMENT.md. Initial main commit 1f75e0a was pushed to GitHub and deployed to Vercel with owner-guided approval. The production URL was checked on 2026-11-09.
Original private resume is never required for builds.

## 中英文同步维护
网站提供简体中文和英文。右上角的“中文 / EN”按钮一键切换，首次访问根据浏览器语言选择，之后记住上次选择。
你可以继续只用中文提出修改要求。项目 AGENTS.md 要求后续修改同时更新中英文，不需要重复提出翻译要求。

- src/i18n/messages.ts：导航、按钮、段落标题、辅助提示与页面元数据。中文必须实现与英文相同的文案键。
- src/data/portfolio.ts：个人介绍、项目、贡献和技能，使用 localized(英文, 中文) 成对维护。
- src/i18n/LocaleProvider.tsx：语言状态、保存偏好、页面 lang、标题和描述。
- src/hooks/useLocale.ts：组件获取当前语言和对应文案。
- tests/localization.spec.ts：语言切换、偏好保存、双语布局、主题互不干扰和无障碍验证。

例如，收到“把介绍改成某段中文”时，同一次修改应更新：
```ts
introduction: localized(
  'The matching natural English introduction.',
  '你要求更新的中文介绍。',
)
```
两种语言共用组件与功能，切换时不重新加载页面。专有名称、代码示例和网址保持原样。
翻译是经过编辑的本地内容，不调用在线翻译服务，不需要 API Key 或后端。


## 星星、动态背景与兴趣板块
展示名为 YaoXing。首屏、导航、页脚、页面标题和星星图标使用统一品牌。
动态背景由本地 SVG 像素素材与 CSS 动画组成，可通过右下角控件暂停；减少动态效果和后台标签页会停止动画。
src/hooks/useGlassInteraction.ts 使用单个委托监听器和 requestAnimationFrame 更新玻璃高光，不在鼠标移动时触发 React 渲染，也不倾斜正文。
src/styles/experience.css 维护新的背景、磨砂材质、悬停高光、兴趣卡片和品牌适配。
src/components/Hobbies.tsx 展示 Valorant、吉他与爵士乐、英剧美剧；src/data/portfolio.ts 的 hobbies 维护成对的中英文内容。
吉他使用已注明来源的 Unsplash 实拍配图，深色模式通过 CSS 降低亮度；不是本人的吉他照片。兴趣板块也包含爵士乐和英剧美剧片单。替换照片的步骤见 docs/ASSETS-AND-CONTENT.md。
比赛、MVP、青训和账号信息来自本人在对话中的明确提供；段位图标明为截图而非实时数据。
保留现有 li-theme / li-locale 存储键，以继续使用之前保存的语言和主题选择。


## 真实项目截图
Projects 现在展示由公开源码实际运行后拍摄的截图：AgileFlow 本地 Sprint 看板（示例数据）和 Java 肉鸽终端地图/菜单。
src/components/ProjectScreenshot.tsx 统一处理原图链接、图片尺寸、替代文字和双语说明。
截图显示在首页卡片和项目详情中；点击图片可打开完整原图。
源仓库版本、拍摄方式及限制记录在 docs/PROJECT-SCREENSHOTS.md。
正式作品集仍是纯前端；拍摄用 Python/Java 服务不参与部署。

## 已确认的个人内容（2026-11-08）
- Riot ID：Kn1ghT9#KniT9；国服 Valorant ID：Kn1ghT9#4533，两者各有复制按钮。
- 最喜欢爵士乐；剧集包括《流人》《贴身保镖》《真相捕捉》和 BBC 版《福尔摩斯》。英文页同步维护对应名称。
- 联系邮箱：liexx999@163.com。
- 简历使用本人指定 Word 原件直接导出的中文 PDF，位于 public/resume/yaoxing-resume.pdf。中文页面使用此文件；英文页面使用完整翻译的 public/resume/yaoxing-resume-en.pdf。两种语言都支持查看和下载。原始 DOCX 不参与构建、不复制进网站。
- AgileFlow 使用原项目 City / Cyber Night 壁纸及 dark mode 的真实本地截图；仍标明示例数据。

## 个人资料更正（2026-11-09）
About 展示 2006 年出生于上海；教育卡片显示 2025 年 2 月入学，预计 2028 年底毕业。中英文同步维护。
资料字段是 profile.background 与 profile.educationPeriod，均位于 src/data/portfolio.ts；About.tsx 读取字段并显示。
网站 PDF 同步更正教育日期，桌面 Word 原件未修改。

## QA 案例与英文简历（2026-11-09）
AgileFlow 重点展示团队 QA 角色、验收测试、缺陷反馈和回归检查。详情增加一个由本人描述整理的案例：用测试用例清单与开发者对齐待测内容和进度。未虚构清单工具、效率数字或新的游戏项目经历。
Project.caseStudy 是可选字段，只有 AgileFlow 配置；游戏保留现有源码截图和项目内容。中英文共用 ProjectDialog，不复制两套组件。
profile.resumePdf 使用 localized(英文 PDF 路径, 中文 PDF 路径)，Contact.tsx 随语言切换解析文件。英文简历是中文简历完整翻译，沿用更正后的教育日期。
可选的 scripts/generate-resume-en.py 生成英文 PDF；React 网站构建不依赖 Python。详见 public/resume/README.md。

## 性能监测
Speed Insights 使用 @vercel/speed-insights/react，在 src/main.tsx 中挂载一次。import.meta.env.PROD 只在正式构建时启用它，本地开发和浏览器回归测试不会加载统计脚本。中英文、Light/Dark 共用同一份监测。
当前集成已通过本地构建与测试；实际采集需在推送并完成 Vercel 部署后检查。基础版用于观察体验评分，不会自动替网站提速。
