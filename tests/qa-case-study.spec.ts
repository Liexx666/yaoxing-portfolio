import { test, expect } from '@playwright/test'

test('QA case study is available in both languages; the game has no invented case study', async ({ page }) => {
  await page.goto('/#projects')
  await page.getByRole('button', { name: 'Explore project', exact: true }).click()
  const dialog = page.getByRole('dialog')
  const study = dialog.getByRole('region', { name: 'Keeping development and QA in sync.' })
  await expect(study).toContainText('My main responsibility was QA')
  await expect(study).toContainText('test-case checklist')
  await expect(study.locator('dt')).toHaveText(['My role', 'The challenge', 'What I did', 'What I learned'])
  await page.keyboard.press('Escape')
  await page.getByRole('button', { name: '切换为中文', exact: true }).click()
  await page.getByRole('button', { name: '了解项目', exact: true }).click()
  const chineseStudy = dialog.getByRole('region', { name: '让开发与测试进度对齐。' })
  await expect(chineseStudy).toContainText('我主要负责 QA')
  await expect(chineseStudy).toContainText('测试用例清单')
  await expect(chineseStudy.locator('dt')).toHaveText(['我的职责', '遇到的问题', '我的做法', '收获与思考'])
  await page.keyboard.press('Escape')
  await page.getByRole('button', { name: '探索游戏项目', exact: true }).click()
  await expect(dialog.locator('.qa-case-study')).toHaveCount(0)
  await expect(dialog.getByRole('heading', { name: 'Roguelike 游戏', exact: true })).toBeVisible()
})

for (const locale of ['en', 'zh'] as const) {
  test('QA case study is readable in the mobile dialog in ' + locale, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 700 })
    await page.goto('/#projects')
    if (locale === 'zh') await page.getByRole('button', { name: '切换为中文', exact: true }).click()
    await page.getByRole('button', { name: locale === 'en' ? 'Explore project' : '了解项目', exact: true }).click()
    const study = page.locator('.qa-case-study')
    await study.locator('dd').last().scrollIntoViewIfNeeded()
    await expect(study.locator('dd').last()).toBeInViewport()
    for (const block of await study.locator('dd').all()) {
      expect(await block.evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true)
      const bounds = (await block.boundingBox())!
      expect(bounds.x).toBeGreaterThanOrEqual(0)
      expect(bounds.x + bounds.width).toBeLessThanOrEqual(320)
    }
    await page.keyboard.press('Escape')
    await expect(page.getByRole('dialog')).not.toBeVisible()
  })
}

test('switching languages updates both resume actions without a page reload', async ({ page }) => {
  await page.goto('/#resume')
  await page.evaluate(() => { document.body.dataset.resumeTest = 'same-page' })
  await expect(page.getByRole('link', { name: 'Download', exact: true })).toHaveAttribute('href', '/resume/yaoxing-resume-en.pdf')
  await page.getByRole('button', { name: '切换为中文', exact: true }).click()
  for (const name of ['查看 PDF', '下载简历']) await expect(page.getByRole('link', { name, exact: true })).toHaveAttribute('href', '/resume/yaoxing-resume.pdf')
  await expect(page.locator('body')).toHaveAttribute('data-resume-test', 'same-page')
  await page.reload()
  await expect(page.getByRole('link', { name: '下载简历', exact: true })).toHaveAttribute('href', '/resume/yaoxing-resume.pdf')
  await page.getByRole('button', { name: 'Switch to English', exact: true }).click()
  await expect(page.getByRole('link', { name: 'View PDF', exact: true })).toHaveAttribute('href', '/resume/yaoxing-resume-en.pdf')
})
