import { test, expect } from '@playwright/test'

for (const locale of ['en', 'zh'] as const) {
  test('both region IDs copy independently in ' + locale, async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write'])
    await page.goto('/#interests')
    if (locale === 'zh') await page.getByRole('button', { name: '切换为中文', exact: true }).click()
    const global = page.getByRole('button', { name: locale === 'en' ? 'Copy Riot ID' : '复制游戏账号', exact: true })
    const china = page.getByRole('button', { name: locale === 'en' ? 'Copy China Valorant ID' : '复制国服游戏账号', exact: true })
    await global.click()
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('Kn1ghT9#KniT9')
    await china.click()
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('Kn1ghT9#4533')
    await expect(page.getByRole('status')).toHaveText(locale === 'en' ? 'China Valorant ID copied.' : '国服游戏账号已复制。')
    await global.click()
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('Kn1ghT9#KniT9')
  })

  test('matching resume language can be viewed and downloaded in ' + locale, async ({ page, request }) => {
    await page.goto('/#resume')
    if (locale === 'zh') await page.getByRole('button', { name: '切换为中文', exact: true }).click()
    const filename = locale === 'en' ? 'yaoxing-resume-en.pdf' : 'yaoxing-resume.pdf'
    const url = '/resume/' + filename
    await expect(page.getByRole('link', { name: locale === 'en' ? 'View PDF' : '查看 PDF', exact: true })).toHaveAttribute('href', url)
    const response = await request.get(url)
    expect(response.ok()).toBe(true)
    expect(response.headers()['content-type']).toContain('application/pdf')
    expect((await response.body()).subarray(0, 5).toString()).toBe('%PDF-')
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.getByRole('link', { name: locale === 'en' ? 'Download' : '下载简历', exact: true }).click(),
    ])
    expect(download.suggestedFilename()).toBe(filename)
    expect(await download.failure()).toBeNull()
    await expect(page.getByRole('link', { name: 'liexx999@163.com', exact: true })).toHaveAttribute('href', 'mailto:liexx999@163.com')
    await expect(page.locator('#resume')).toContainText(locale === 'en' ? 'English resume (PDF).' : '中文 PDF 简历')
  })
}

test('real guitar photo loads, credits the photographer and dims for dark mode', async ({ page }) => {
  await page.goto('/#interests')
  const photo = page.locator('.guitar-figure img')
  await photo.scrollIntoViewIfNeeded()
  await expect(photo).toHaveAttribute('src', '/images/guitar-photo.jpg')
  await expect.poll(() => photo.evaluate(el => (el as HTMLImageElement).naturalWidth)).toBe(1200)
  await expect(page.locator('.guitar-figure a')).toHaveAttribute('href', /unsplash.com\/photos\//)
  await page.getByRole('button', { name: 'Light theme', exact: true }).click()
  const brightness = () => photo.evaluate(el => Number(getComputedStyle(el).filter.match(/brightness\(([^)]+)\)/)?.[1]))
  const light = await brightness()
  await page.getByRole('button', { name: 'Dark theme', exact: true }).click()
  expect(await brightness()).toBeLessThan(light)
})
