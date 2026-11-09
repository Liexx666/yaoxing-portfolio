import { test, expect } from '@playwright/test'

test('YaoXing branding and both interest stories are present in both languages', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle('YaoXing — Curiosity. Code. Possibility.')
  await expect(page.locator('.nav-shell .wordmark')).toContainText('YaoXing')
  await expect(page.locator('.site-footer')).toContainText('YaoXing')
  await expect(page.locator('main')).not.toContainText(/\bLi\b/)
  await page.getByRole('navigation', { name: 'Main navigation', exact: true }).getByRole('link', { name: 'Interests', exact: true }).click()
  await expect(page).toHaveURL(/#interests$/)
  await expect(page.getByRole('heading', { name: 'A few other sides of me.' })).toBeInViewport()
  const section = page.locator('#interests')
  await expect(section.getByText('Monash Cup 2026 · Champion', { exact: true })).toBeVisible()
  await expect(section.getByText('Tournament MVP', { exact: true })).toBeVisible()
  await expect(section).toContainText('Previously participated in youth training at JDG (Jingdong Gaming).')
  await expect(section).toContainText('Kn1ghT9#KniT9')
  await expect(section).toContainText('Kn1ghT9#4533')
  await expect(section).toContainText('Jazz is my favourite kind of music')
  for (const show of ['Slow Horses', 'Bodyguard', 'The Capture', 'Sherlock (BBC)']) await expect(section.locator('.series-list')).toContainText(show)
  await expect(section.getByText('Chris Hardy / Unsplash')).toBeVisible()
  const rank = section.locator('.rank-figure img')
  await expect(rank).toBeVisible()
  await expect.poll(() => rank.evaluate((image) => (image as HTMLImageElement).naturalWidth)).toBe(630)
  await expect(section.locator('.rank-figure a')).toHaveAttribute('href', '/images/valorant-rank.png')
  await page.getByRole('button', { name: '切换为中文', exact: true }).click()
  await expect(page).toHaveTitle('YaoXing — 好奇心，代码，与无限可能。')
  await expect(section.getByRole('heading', { name: '生活，还有另一面。' })).toBeVisible()
  await expect(section.getByText('Monash Cup 2026 · 冠军', { exact: true })).toBeVisible()
  await expect(section.getByText('赛事 MVP', { exact: true })).toBeVisible()
  await expect(section).toContainText('曾在 JDG（Jingdong Gaming）参加青训。')
  await expect(section.getByText('Chris Hardy / Unsplash')).toBeVisible()
  await expect(section).toContainText('最喜欢的音乐是爵士乐（Jazz）')
  for (const show of ['流人', '贴身保镖', '真相捕捉', '福尔摩斯（BBC 版）']) await expect(section.locator('.series-list')).toContainText(show)
  await expect(page.locator('.star-signature')).toContainText('星，是星星的星。')
})

test('Riot ID copy action writes the exact ID and announces success', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write'])
  await page.goto('/#interests')
  await page.getByRole('button', { name: 'Copy Riot ID', exact: true }).click()
  await expect(page.getByRole('status')).toHaveText('Riot ID copied.')
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('Kn1ghT9#KniT9')
})

test('blocked clipboard provides a useful fallback in both languages', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: async () => { throw new Error('Clipboard blocked') } },
    })
  })
  await page.goto('/#interests')
  await page.getByRole('button', { name: 'Copy Riot ID', exact: true }).click()
  await expect(page.getByRole('status')).toHaveText('Copy unavailable. Select the Riot ID above to copy it manually.')
  await page.getByRole('button', { name: '切换为中文', exact: true }).click()
  await page.getByRole('button', { name: '复制游戏账号', exact: true }).click()
  await expect(page.getByRole('status')).toHaveText('暂时无法复制，请选中上方账号手动复制。')
})

test.describe('ambient animation controls', () => {
  test.use({ reducedMotion: 'no-preference' })

  test('background animation can pause, persists, and remains independent of language/theme', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('html')).toHaveAttribute('data-motion', 'running')
    const sprite = page.locator('.ambient-sprite').first()
    expect(await sprite.evaluate((element) => getComputedStyle(element).animationPlayState)).toBe('running')
    await page.getByRole('button', { name: 'Pause background animations', exact: true }).click()
    await expect(page.locator('html')).toHaveAttribute('data-motion', 'paused')
    expect(await sprite.evaluate((element) => getComputedStyle(element).animationPlayState)).toBe('paused')
    await page.getByRole('button', { name: '切换为中文', exact: true }).click()
    await expect(page.getByRole('button', { name: '继续背景动画', exact: true })).toHaveAttribute('aria-pressed', 'true')
    await page.getByRole('button', { name: '深色模式', exact: true }).click()
    await page.reload()
    await expect(page.locator('html')).toHaveAttribute('data-motion', 'paused')
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
    await page.getByRole('button', { name: '继续背景动画', exact: true }).click()
    await expect(page.locator('html')).toHaveAttribute('data-motion', 'running')
  })

  test('glass highlight follows the pointer, resets on leave, and stops when paused', async ({ page }) => {
    await page.goto('/')
    const panel = page.locator('.featured-project')
    await panel.scrollIntoViewIfNeeded()
    const box = (await panel.boundingBox())!
    await page.mouse.move(box.x + box.width * .2, box.y + box.height * .3)
    await expect.poll(() => panel.evaluate((element) => element.style.getPropertyValue('--glass-x'))).not.toBe('')
    const start = await panel.evaluate((element) => element.style.getPropertyValue('--glass-x'))
    await page.mouse.move(box.x + box.width * .8, box.y + box.height * .7)
    await expect.poll(() => panel.evaluate((element) => element.style.getPropertyValue('--glass-x'))).not.toBe(start)
    expect(await panel.evaluate((element) => getComputedStyle(element).transform)).toBe('none')
    await page.mouse.move(4, 4)
    await expect.poll(() => panel.evaluate((element) => element.style.getPropertyValue('--glass-x'))).toBe('')
    await page.getByRole('button', { name: 'Pause background animations', exact: true }).click()
    await panel.scrollIntoViewIfNeeded()
    const pausedBox = (await panel.boundingBox())!
    await page.mouse.move(pausedBox.x + 60, pausedBox.y + 60)
    expect(await panel.evaluate((element) => element.style.getPropertyValue('--glass-x'))).toBe('')
  })

  test('blocked storage does not prevent pausing', async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(window, 'localStorage', { get() { throw new Error('Storage blocked') } })
    })
    await page.goto('/')
    await page.getByRole('button', { name: 'Pause background animations', exact: true }).click()
    await expect(page.locator('html')).toHaveAttribute('data-motion', 'paused')
    await page.getByRole('button', { name: 'Resume background animations', exact: true }).click()
    await expect(page.locator('html')).toHaveAttribute('data-motion', 'running')
  })
})

test('reduced motion disables drifting, twinkling and pointer-driven glass', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'paused')
  await expect(page.locator('.ambient-toggle')).toBeDisabled()
  for (const selector of ['.ambient-sprite', '.twinkle-star', '.hero-sparkle']) {
    expect(await page.locator(selector).first().evaluate((element) => getComputedStyle(element).animationName)).toBe('none')
  }
  const panel = page.locator('.featured-project')
  await panel.hover()
  expect(await panel.evaluate((element) => element.style.getPropertyValue('--glass-x'))).toBe('')
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'running')
  await expect(page.getByRole('button', { name: 'Pause background animations', exact: true })).toBeEnabled()
})
