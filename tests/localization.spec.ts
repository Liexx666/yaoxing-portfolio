import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('one click translates all sections and metadata without reloading or resetting theme/navigation', async ({ page }) => {
  await page.goto('/#about')
  await page.getByRole('button', { name: 'Dark theme', exact: true }).click()
  await page.evaluate(() => { document.body.dataset.languageTest = 'same-document' })
  await page.getByRole('button', { name: '切换为中文', exact: true }).click()
  await expect(page.locator('html')).toHaveAttribute('lang', 'zh-CN')
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  await expect(page).toHaveURL(/#about$/)
  expect(await page.locator('body').getAttribute('data-language-test')).toBe('same-document')
  await expect(page).toHaveTitle('YaoXing — 好奇心，代码，与无限可能。')
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /蒙纳士大学/)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('好奇心。代码。无限可能。')
  for (const name of ['让想法，落地成真。', '持续学习。 不断构建。', '不止工具，更有思考。', '用一份简历，了解更多。']) {
    await expect(page.getByRole('heading', { name, exact: true })).toBeVisible()
  }
  await expect(page.getByRole('link', { name: '下载简历', exact: true })).toBeVisible()
  await expect(page.getByRole('link', { name: 'liexx999@163.com', exact: true })).toBeVisible()
  await page.getByRole('button', { name: '了解项目', exact: true }).click()
  const dialog = page.getByRole('dialog')
  await expect(dialog.getByRole('heading', { name: '我的贡献' })).toBeVisible()
  await expect(dialog.getByText('排查跨午夜工时归属问题，以及短时工时记录的精度问题。')).toBeVisible()
  await expect(dialog.getByRole('link', { name: '访问应用' })).toHaveAttribute('href', 'https://agileflow-deploy.onrender.com/login/')
  await dialog.getByRole('button', { name: '关闭项目详情' }).click()
  await page.getByRole('button', { name: '探索游戏项目' }).click()
  await expect(dialog.getByRole('heading', { name: 'Roguelike 游戏', exact: true })).toBeVisible()
  await expect(dialog.getByRole('link', { name: '在 GitHub 查看' })).toHaveAttribute('href', 'https://github.com/Liexx666/fit2099-Roguelike-game')
  await page.keyboard.press('Escape')
  await page.getByRole('button', { name: 'Switch to English', exact: true }).click()
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await expect(page).toHaveTitle('YaoXing — Curiosity. Code. Possibility.')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Curiosity.Code.Possibility.')
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
})

test('explicit language survives reload and repeated switching', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: '切换为中文', exact: true }).click()
  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('lang', 'zh-CN')
  await expect(page.getByRole('button', { name: 'Switch to English', exact: true })).toBeVisible()
  for (let i = 0; i < 3; i++) {
    await page.getByRole('button', { name: 'Switch to English', exact: true }).click()
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
    await page.getByRole('button', { name: '切换为中文', exact: true }).click()
    await expect(page.locator('html')).toHaveAttribute('lang', 'zh-CN')
  }
  expect(await page.evaluate(() => localStorage.getItem('li-locale'))).toBe('zh')
})

test.describe('Chinese browser defaults', () => {
  test.use({ locale: 'zh-CN' })
  test('detects Chinese, respects a saved English preference, ignores invalid preferences', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('html')).toHaveAttribute('lang', 'zh-CN')
    await page.getByRole('button', { name: 'Switch to English', exact: true }).click()
    await page.reload()
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
    await page.evaluate(() => localStorage.setItem('li-locale', 'invalid'))
    await page.reload()
    await expect(page.locator('html')).toHaveAttribute('lang', 'zh-CN')
  })
  test('switches in memory when storage is unavailable', async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    await page.addInitScript(() => {
      Object.defineProperty(window, 'localStorage', { get() { throw new Error('Storage blocked') } })
    })
    await page.goto('/')
    await expect(page.locator('html')).toHaveAttribute('lang', 'zh-CN')
    await page.getByRole('button', { name: 'Switch to English', exact: true }).click()
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
    await page.getByRole('button', { name: '切换为中文', exact: true }).click()
    await expect(page.locator('html')).toHaveAttribute('lang', 'zh-CN')
    expect(errors).toEqual([])
  })
})

test('language switching preserves an expanded mobile menu and works with mobile theme controls', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 844 })
  await page.goto('/')
  await page.getByRole('button', { name: 'Open menu', exact: true }).click()
  await page.getByRole('button', { name: '切换为中文', exact: true }).click()
  const nav = page.getByRole('navigation', { name: '移动端导航' })
  await expect(nav).toBeVisible()
  await expect(page.getByRole('button', { name: '收起菜单', exact: true })).toHaveAttribute('aria-expanded', 'true')
  await nav.getByRole('link', { name: '技能', exact: true }).click()
  await expect(nav).not.toBeVisible()
  await expect(page).toHaveURL(/#skills$/)
  await page.getByRole('button', { name: /外观:/ }).click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
  await page.getByRole('button', { name: /外观:/ }).click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  await page.getByRole('button', { name: 'Switch to English', exact: true }).click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
})

for (const locale of ['en', 'zh'] as const) {
  for (const width of [320, 375, 390, 768, 980, 1024, 1440]) {
    test('bilingual header and content fit: ' + locale + ' at ' + width, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 })
      await page.goto('/')
      if (locale === 'zh') await page.getByRole('button', { name: '切换为中文', exact: true }).click()
      const dimensions = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, viewport: innerWidth }))
      expect(dimensions.scroll).toBeLessThanOrEqual(dimensions.viewport)
      const languageSwitch = page.locator('.language-switch')
      await expect(languageSwitch).toBeInViewport()
      const box = await languageSwitch.boundingBox()
      expect(box!.height).toBeGreaterThanOrEqual(44)
      expect(box!.x + box!.width).toBeLessThanOrEqual(width)
      const logo = await page.locator('.nav-shell .wordmark').boundingBox()
      const actions = await page.locator('.nav-actions').boundingBox()
      expect(logo!.x + logo!.width).toBeLessThanOrEqual(actions!.x)
      expect(await page.locator('h1').evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true)
      const copyBox = (await page.locator('.hero-copy').boundingBox())!
      expect(copyBox.x).toBeGreaterThanOrEqual(0)
      expect(copyBox.x + copyBox.width).toBeLessThanOrEqual(width)

      if (width <= 980) {
        await page.getByRole('button', { name: locale === 'en' ? 'Open menu' : '展开菜单', exact: true }).click()
        const nav = page.getByRole('navigation', { name: locale === 'en' ? 'Mobile navigation' : '移动端导航' })
        await nav.getByRole('link', { name: locale === 'en' ? 'Projects' : '项目', exact: true }).click()
        await expect(page).toHaveURL(/#projects$/)
        await expect(nav).not.toBeVisible()
      }
    })
  }
  for (const theme of ['light', 'dark'] as const) {
    test('bilingual accessibility: ' + locale + ' ' + theme, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' })
      await page.goto('/')
      await page.getByRole('button', { name: theme === 'light' ? 'Light theme' : 'Dark theme', exact: true }).click()
      if (locale === 'zh') await page.getByRole('button', { name: '切换为中文', exact: true }).click()
      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze()
      expect(results.violations).toEqual([])
      await page.getByRole('button', { name: locale === 'en' ? 'Explore project' : '了解项目', exact: true }).click()
      const modalResults = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze()
      expect(modalResults.violations).toEqual([])
    })
  }
}
