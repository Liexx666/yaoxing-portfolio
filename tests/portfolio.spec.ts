import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('portfolio renders with no runtime errors and functional anchor navigation', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Curiosity.Code.Possibility.')
  await page.getByRole('link', { name: 'View projects', exact: true }).click()
  await expect(page).toHaveURL(/#projects$/)
  await expect(page.getByRole('heading', { name: 'Ideas, made tangible.' })).toBeInViewport()
  await expect(page.getByRole('link', { name: 'Find me on GitHub' })).toHaveAttribute('href', 'https://github.com/Liexx666')
  await expect(page.getByRole('link', { name: 'View PDF', exact: true })).toHaveAttribute('href', '/resume/yaoxing-resume-en.pdf')
  await expect(page.locator('a[href="#"], a[href=""]')).toHaveCount(0)
  expect(errors).toEqual([])
})

test('project dialog supports keyboard dismissal and restores focus', async ({ page }) => {
  await page.goto('/#projects')
  const trigger = page.getByRole('button', { name: 'Explore project', exact: true })
  await trigger.click()
  const dialog = page.getByRole('dialog')
  await expect(dialog).toBeVisible()
  await expect(dialog.getByRole('heading', { name: 'My contributions' })).toBeVisible()
  await expect(dialog.getByRole('link', { name: 'Visit application' })).toHaveAttribute('href', 'https://agileflow-deploy.onrender.com/login/')
  await page.keyboard.press('Escape')
  await expect(dialog).not.toBeVisible()
  await expect(trigger).toBeFocused()
  await page.getByRole('button', { name: 'Discover the game' }).click()
  await expect(dialog.getByRole('link', { name: 'View on GitHub' })).toHaveAttribute('href', 'https://github.com/Liexx666/fit2099-Roguelike-game')
  await dialog.getByRole('button', { name: 'Close project details' }).click()
  await expect(dialog).not.toBeVisible()
})

test('appearance follows system, persists explicit preference, and handles blocked storage', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' })
  await page.goto('/')
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  await page.getByRole('button', { name: 'Light theme', exact: true }).click()
  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
  await page.getByRole('button', { name: 'System theme', exact: true }).click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  await page.emulateMedia({ colorScheme: 'light' })
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', { get() { throw new Error('Storage blocked') } })
  })
  await page.reload()
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await page.getByRole('button', { name: 'Dark theme', exact: true }).click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
})

for (const width of [320, 375, 390, 768, 1024, 1440]) {
  test('layout fits viewport at ' + width + 'px', async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    const dimensions = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, viewport: innerWidth }))
    expect(dimensions.scroll).toBeLessThanOrEqual(dimensions.viewport)
    if (width < 768) {
      const toggle = page.getByRole('button', { name: 'Open menu' })
      await toggle.click()
      const nav = page.getByRole('navigation', { name: 'Mobile navigation' })
      await expect(nav).toBeVisible()
      await nav.getByRole('link', { name: 'Skills', exact: true }).click()
      await expect(nav).not.toBeVisible()
      await expect(page).toHaveURL(/#skills$/)
    }
  })
}

test('keyboard skip link and reduced motion remain usable', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.locator('#main')).toBeFocused()
  expect(await page.locator('.hero-copy').evaluate((element) => getComputedStyle(element).animationName)).toBe('none')
  expect(await page.locator('html').evaluate((element) => getComputedStyle(element).scrollBehavior)).toBe('auto')
})

for (const theme of ['light', 'dark'] as const) {
  test('automated accessibility checks: ' + theme, async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: theme === 'light' ? 'Light theme' : 'Dark theme', exact: true }).click()
    await page.locator('.hero-copy').evaluate(async (element) => { await Promise.all(element.getAnimations().map((animation) => animation.finished)) })
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze()
    expect(results.violations).toEqual([])
    await page.getByRole('button', { name: 'Explore project', exact: true }).click()
    const modalResults = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze()
    expect(modalResults.violations).toEqual([])
  })
}
