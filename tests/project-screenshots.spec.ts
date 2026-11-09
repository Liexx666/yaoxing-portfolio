import { test, expect } from '@playwright/test'

test('project cards load the actual product images and link the full originals', async ({ page }) => {
  await page.goto('/#projects')
  for (const [project, width, height] of [['agileflow', 1440, 1000], ['roguelike', 979, 1033]] as const) {
    const figure = page.locator('#projects .project-screenshot[data-project="' + project + '"]')
    const image = figure.getByRole('img')
    await image.scrollIntoViewIfNeeded()
    await expect.poll(() => image.evaluate((element) => (element as HTMLImageElement).naturalWidth)).toBe(width)
    expect(await image.evaluate((element) => (element as HTMLImageElement).naturalHeight)).toBe(height)
    await expect(figure.locator('a')).toHaveAttribute('href', project === 'agileflow' ? '/images/projects/agileflow-board.png' : '/images/projects/roguelike-terminal.png')
  }
  await expect(page.locator('.board-window, .game-art')).toHaveCount(0)
  await expect(page.getByText('Cyber Night · dark mode · local demo', { exact: true })).toBeVisible()
  await expect(page.getByText('Actual Java console capture · local run', { exact: true })).toBeVisible()
  const [original] = await Promise.all([
    page.waitForEvent('popup'),
    page.getByRole('link', { name: 'View full screenshot — AgileFlow', exact: true }).click(),
  ])
  await expect(original).toHaveURL(/\/images\/projects\/agileflow-board\.png$/)
  await original.close()
})

test('project details show real screenshots and the confirmed public source, in both languages', async ({ page }) => {
  await page.goto('/#projects')
  await page.getByRole('button', { name: 'Explore project', exact: true }).click()
  const dialog = page.getByRole('dialog')
  await expect(dialog.locator('img')).toHaveAttribute('src', '/images/projects/agileflow-board.png')
  await expect(dialog.getByRole('link', { name: 'View source code', exact: true })).toHaveAttribute('href', 'https://github.com/Liexx666/agileflow-deploy')
  await page.keyboard.press('Escape')
  await page.getByRole('button', { name: '切换为中文', exact: true }).click()
  await expect(page.getByText('赛博城市壁纸 · 深色模式 · 本地示例', { exact: true })).toBeVisible()
  await expect(page.getByText('Java ASCII 游戏真实终端截图 · 本地运行', { exact: true })).toBeVisible()
  await page.getByRole('button', { name: '探索游戏项目', exact: true }).click()
  await expect(dialog.locator('img')).toHaveAttribute('src', '/images/projects/roguelike-terminal.png')
  await expect(dialog.getByRole('link', { name: '查看完整截图 — Roguelike 游戏', exact: true })).toHaveAttribute('href', '/images/projects/roguelike-terminal.png')
})

for (const width of [320, 390, 768, 1440]) {
  test('real screenshots stay within the viewport at ' + width, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/#projects')
    for (const figure of await page.locator('#projects .project-screenshot').all()) {
      await figure.scrollIntoViewIfNeeded()
      const image = figure.locator('img')
      await expect.poll(() => image.evaluate((element) => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0)
      const bounds = (await figure.boundingBox())!
      expect(bounds.x).toBeGreaterThanOrEqual(0)
      expect(bounds.x + bounds.width).toBeLessThanOrEqual(width)
    }
  })
}
