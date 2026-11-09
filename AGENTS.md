# YaoXing Portfolio project instructions

## 双语更新约定
用户默认使用中文描述需求。除非用户明确限定某个语言，所有网站内容修改、增加和删除都必须同步覆盖简体中文和英文，不必再次询问是否翻译。

- 保持两种语言的事实、功能、项目顺序和内容含义一致；英文应自然表达，不必逐字硬译。
- 界面文案统一维护在 src/i18n/messages.ts。中文必须符合英文文案的键结构。
- 个人资料、项目和技能维护在 src/data/portfolio.ts，使用 localized(英文, 中文)；两个参数都必须提供。
- 专有名称、编程语言名称和 URL 可以共享，名称使用 shared(...)。
- 不要在页面组件中加入只提供一种语言的新正文、按钮文字、提示、空状态或无障碍标签。
- 共享同一套页面组件，禁止复制两份页面后分别修改。
- 新组件使用 useLocale() 读取语言、文案和 localize(...)。
- 切换语言不得重置主题、导航目标、菜单状态或项目内容。
- 保持右上角一键语言切换，当前只需中文和英文；记住访客选择，存储不可用时仍能切换。
- 两种语言都要检查桌面和移动端布局、项目详情、键盘操作和无障碍标签。
- 涉及新功能时，实现和验证必须同时覆盖两种语言；不得只修改中文或只修改英文后交付。

## Existing engineering constraints
Preserve the Apple-inspired design system in design-system/li-portfolio/MASTER.md.
Never fabricate personal experience, metrics, contact details or project links.
Keep secrets and private resumes out of source control.
Use the existing pure frontend architecture unless a real requirement needs a backend.
Inspect and preserve user edits. Do not delete or overwrite unrelated files.
Do not upload to GitHub or deploy publicly without the owner's confirmation.

## Local validation
Use scripts/npm.ps1 on this computer for npm commands; it handles the Node runtime PATH.
Run the production build and relevant Playwright tests for content/interaction changes.
Keep automated browser verification distinct from real iPhone/iPad/Safari verification.
