import { expect, test } from '@playwright/test';

const pagePath = '/novopen-5-test';

test.beforeEach(async ({ page }) => {
  await page.goto(pagePath, { waitUntil: 'domcontentloaded' });
  await expect(page.locator('.specifications')).toHaveAttribute('data-block-status', 'loaded');
});

test('decorates valid rows as associated terms and definitions', async ({ page }) => {
  const specifications = page.locator('.specifications');
  await expect(specifications.locator(':scope > dl')).toHaveCount(1);
  await expect(specifications.getByRole('term')).toHaveCount(7);
  await expect(specifications.getByRole('definition')).toHaveCount(7);
  await expect(specifications.getByRole('term').first()).toHaveText('Pen');
  await expect(specifications.getByRole('definition').first()).toHaveText('NovoPen 5');
  await expect(specifications.locator('.specifications-item')).toHaveCount(7);
});

test('omits malformed and unsupported authored fields', async ({ page }) => {
  const specifications = page.locator('.specifications');
  await expect(specifications).not.toContainText('Value without a label is ignored');
  await expect(specifications).not.toContainText('Label without a value is ignored');
  await expect(specifications).not.toContainText('Ignored third cell');
  await expect(specifications).toContainText('Valid value retained');
});

test('reflows long values without horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 });
  const result = await page.locator('.specifications').evaluate((element) => {
    const item = element.querySelector('.specifications-item');
    return {
      columns: getComputedStyle(item).gridTemplateColumns.split(' ').length,
      viewportOverflow: document.documentElement.scrollWidth > window.innerWidth,
      blockOverflow: element.scrollWidth > element.clientWidth,
    };
  });

  expect(result).toEqual({
    columns: 1,
    viewportOverflow: false,
    blockOverflow: false,
  });
});
