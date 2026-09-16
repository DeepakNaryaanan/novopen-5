import { expect, test } from '@playwright/test';

const pagePath = '/novopen-5-test';
const usagePath = '/novopen-5-usage';
const libraryPath = '/block-library';
const blockSelector = [
  '.hero.product',
  '.hero:not(.product)',
  '.columns.product-intro',
  '.columns.feature',
  '.specifications',
  '.cards.downloads',
  '.cards.promotional',
  '.cards:not(.downloads):not(.promotional)',
].join(', ');
const loadedBlockSelector = blockSelector
  .split(', ')
  .map((selector) => `${selector}[data-block-status="loaded"]`)
  .join(', ');

async function loadPage(page) {
  await page.goto(pagePath, { waitUntil: 'domcontentloaded' });
  await expect(page.locator(blockSelector)).toHaveCount(8);
  await expect(page.locator(loadedBlockSelector)).toHaveCount(8);
}

async function loadIntegratedPage(page, path, expectedBlocks) {
  await page.goto(path, { waitUntil: 'domcontentloaded' });
  await expect(page.locator('header nav')).toBeVisible();
  await expect(page.locator('footer .footer')).toHaveAttribute('data-block-status', 'loaded');
  await expect(page.locator('.block[data-block-status="loaded"]')).toHaveCount(expectedBlocks);
}

test('decorates every variant and preserves plain regressions', async ({ page }) => {
  await loadPage(page);

  await expect(page.locator('.hero.product > .hero-media picture')).toHaveCount(1);
  await expect(page.locator('.hero.product > .hero-content h1')).toHaveText('NovoPen 5');
  await expect(page.locator('.hero:not(.product) h2')).toHaveText('Plain hero regression fixture');
  await expect(page.locator('.columns.product-intro > .columns-row-product-intro')).toHaveCount(1);
  await expect(page.locator('.columns.feature > .columns-row-feature')).toHaveCount(2);
  await expect(page.locator('.cards.downloads > ul > li')).toHaveCount(3);
  await expect(page.locator('.cards.promotional > ul > li')).toHaveCount(2);
  await expect(page.locator('.cards:not(.downloads):not(.promotional) > ul > li')).toHaveCount(3);
});

test('handles optional and malformed card and column fields', async ({ page }) => {
  await loadPage(page);

  await expect(page.locator('.columns.feature .columns-row-no-media')).toHaveCount(1);
  await expect(page.locator('.columns.feature')).not.toContainText('Unsupported extra authored content');
  await expect(page.locator('.cards.downloads')).not.toContainText('Guide awaiting an approved destination');
  await expect(page.locator('.cards.promotional')).not.toContainText('Resource without a destination');
  await expect(page.locator('.cards.promotional .cards-card-text-only')).toHaveCount(1);
});

test('exposes semantic lists, headings, images, and actionable links', async ({ page }) => {
  await loadPage(page);

  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
  await expect(page.locator('.cards.downloads').getByRole('list')).toHaveCount(1);
  await expect(page.locator('.cards.downloads').getByRole('listitem')).toHaveCount(3);
  await expect(page.locator('.cards.promotional').getByRole('listitem')).toHaveCount(2);
  await expect(page.locator('.hero.product img')).toHaveAttribute('alt', '');
  await expect(page.getByRole('img', { name: 'Silver reusable injection pen with digital dose display' })).toBeVisible();
  await expect(page.locator('.cards.downloads a')).toHaveCount(3);
  await expect(page.locator('.cards.promotional a')).toHaveCount(2);
});

test('retains link destinations and visible keyboard focus', async ({ page }) => {
  await loadPage(page);

  const firstGuide = page.getByRole('link', { name: 'Injection guide (PDF)' });
  await expect(firstGuide).toHaveAttribute('href', /NovoPen-5-generic-injection-guide\.pdf$/);
  await expect(page.getByRole('link', { name: 'Review delivery devices' }))
    .toHaveAttribute('href', '/our-products/pens-and-needles');
  await firstGuide.focus();
  await expect(firstGuide).toBeFocused();
  const focusStyle = await firstGuide.evaluate((element) => {
    const style = getComputedStyle(element);
    return `${style.outlineWidth} ${style.outlineStyle}`;
  });
  expect(focusStyle).toBe('3px solid');
});

test('keeps hero media layered and both hero variants full width', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await loadPage(page);

  const result = await page.evaluate(() => {
    const product = document.querySelector('.hero.product');
    const plain = document.querySelector('.hero:not(.product)');
    return {
      productWidth: Math.round(product.getBoundingClientRect().width),
      plainWidth: Math.round(plain.getBoundingClientRect().width),
      productMediaZ: getComputedStyle(product.querySelector('.hero-media')).zIndex,
      productScrimZ: getComputedStyle(product, '::after').zIndex,
      plainMediaZ: getComputedStyle(plain.querySelector('picture')).zIndex,
      plainHeadingVisible: plain.querySelector('h2').getBoundingClientRect().height > 0,
    };
  });

  expect(result).toEqual({
    productWidth: 1440,
    plainWidth: 1440,
    productMediaZ: '-2',
    productScrimZ: '-1',
    plainMediaZ: '-1',
    plainHeadingVisible: true,
  });
});

test('uses approved responsive breakpoints and default cards auto-fill', async ({ page }) => {
  await page.setViewportSize({ width: 991, height: 1000 });
  await loadPage(page);

  const columnTracks = async () => page.locator('.columns.product-intro .columns-row')
    .evaluate((element) => getComputedStyle(element).gridTemplateColumns.split(' ').length);
  expect(await columnTracks()).toBe(1);
  await page.setViewportSize({ width: 992, height: 1000 });
  expect(await columnTracks()).toBe(2);

  await page.setViewportSize({ width: 390, height: 900 });
  await expect(page.locator('.cards:not(.downloads):not(.promotional) > ul'))
    .toHaveCSS('grid-template-columns', /.+/);
  expect(await page.locator('.cards:not(.downloads):not(.promotional) > ul')
    .evaluate((element) => getComputedStyle(element).gridTemplateColumns.split(' ').length)).toBe(1);

  await page.setViewportSize({ width: 1440, height: 1000 });
  expect(await page.locator('.cards:not(.downloads):not(.promotional) > ul')
    .evaluate((element) => getComputedStyle(element).gridTemplateColumns.split(' ').length)).toBeGreaterThan(1);
});

test('renders without viewport overflow at mobile and desktop widths', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await loadPage(page);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(320);

  await page.setViewportSize({ width: 1440, height: 1000 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(1440);
});

test('loads without browser console or page errors', async ({ page }) => {
  const errors = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('pageerror', (error) => errors.push(error.message));

  await loadPage(page);
  expect(errors).toEqual([]);
});

test('serves all lifecycle target routes', async ({ request }) => {
  const routes = [
    ['/novopen-5-test', /text\/html/, 'Plain hero regression fixture'],
    ['/novopen-5-test.plain.html', /text\/html/, 'Plain hero regression fixture'],
    ['/novopen-5-test.md', /text\/markdown/, 'Plain hero regression fixture'],
    ['/novopen-5-usage', /text\/html/, 'A practical view of recent dose information'],
    ['/novopen-5-usage.plain.html', /text\/html/, 'A practical view of recent dose information'],
    ['/novopen-5-usage.md', /text\/markdown/, 'A practical view of recent dose information'],
    ['/block-library', /text\/html/, 'NovoPen block library draft'],
    ['/block-library.plain.html', /text\/html/, 'NovoPen block library draft'],
    ['/block-library.md', /text\/markdown/, 'NovoPen block library draft'],
  ];

  await Promise.all(routes.map(async ([route, contentType, expectedText]) => {
    const response = await request.get(route);
    expect(response.ok(), route).toBe(true);
    expect(response.headers()['content-type'], route).toMatch(contentType);
    expect(await response.text(), route).toContain(expectedText);
  }));
});

test('integrates the usage page with navigation, footer, and ordered content', async ({ page }) => {
  await loadIntegratedPage(page, usagePath, 8);

  await expect(page.getByRole('navigation')).toHaveCount(1);
  await expect(page.locator('header').getByRole('link', { name: 'NovoPen demo home' })).toBeVisible();
  await expect(page.locator('footer')).toContainText('Local NovoPen lifecycle fixture.');
  await expect(page.locator('footer').getByRole('link', { name: 'Block library draft' }))
    .toHaveAttribute('href', './block-library');

  const sectionHeadings = await page.locator('main > .section').evaluateAll((sections) => (
    sections.map((section) => section.querySelector('h1, h2')?.textContent.trim())
  ));
  expect(sectionHeadings).toEqual([
    'NovoPen 5',
    'A practical view of recent dose information',
    'Helpful details',
    'Specifications',
    'Guides',
    'Continue exploring',
  ]);
});

test('preserves usage-page semantics, links, and optional content', async ({ page }) => {
  await loadIntegratedPage(page, usagePath, 8);

  await expect(page.getByRole('heading', { level: 1 })).toHaveText('NovoPen 5');
  await expect(page.locator('main').getByRole('term')).toHaveCount(5);
  await expect(page.locator('main').getByRole('definition')).toHaveCount(5);
  await expect(page.locator('.columns.feature .columns-row-no-media')).toHaveCount(1);
  await expect(page.locator('.cards.promotional .cards-card-text-only')).toHaveCount(1);
  await expect(page.getByRole('img', { name: 'Silver reusable injection pen with digital dose display' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Injection guide (PDF)' }))
    .toHaveAttribute('href', /NovoPen-5-generic-injection-guide\.pdf$/);
  await expect(page.getByRole('link', { name: 'Explore devices' }))
    .toHaveAttribute('href', '/our-products/pens-and-needles');
});

test('keeps the usage page responsive and free of browser errors', async ({ page }) => {
  const errors = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('pageerror', (error) => errors.push(error.message));

  await page.setViewportSize({ width: 320, height: 900 });
  await loadIntegratedPage(page, usagePath, 8);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(320);

  await page.setViewportSize({ width: 1440, height: 1000 });
  await loadIntegratedPage(page, usagePath, 8);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(1440);

  expect(errors).toEqual([]);
});

test('renders every block-library example in documented order', async ({ page }) => {
  await loadIntegratedPage(page, libraryPath, 10);

  await expect(page.getByRole('heading', { level: 1 })).toHaveText('NovoPen block library draft');
  await expect(page.locator('.hero.product')).toHaveCount(1);
  await expect(page.locator('.hero:not(.product)')).toHaveCount(1);
  await expect(page.locator('.columns.product-intro')).toHaveCount(1);
  await expect(page.locator('.columns.feature')).toHaveCount(1);
  await expect(page.locator('.specifications')).toHaveCount(1);
  await expect(page.locator('.cards.downloads')).toHaveCount(1);
  await expect(page.locator('.cards.promotional')).toHaveCount(1);
  await expect(page.locator('.cards:not(.downloads):not(.promotional)')).toHaveCount(1);

  const blockOrder = await page.locator('main .block').evaluateAll((blocks) => (
    blocks.map((block) => [...block.classList].filter((name) => name !== 'block').join(' '))
  ));
  expect(blockOrder).toEqual([
    'hero product',
    'hero',
    'columns product-intro',
    'columns feature',
    'specifications',
    'cards downloads',
    'cards promotional',
    'cards',
  ]);
});

test('keeps block-library semantics, actions, and optional examples intact', async ({ page }) => {
  await loadIntegratedPage(page, libraryPath, 10);

  await expect(page.locator('.specifications').getByRole('term')).toHaveCount(3);
  await expect(page.locator('.specifications').getByRole('definition')).toHaveCount(3);
  await expect(page.locator('.columns.feature .columns-row-no-media')).toHaveCount(1);
  await expect(page.locator('.cards.promotional .cards-card-text-only')).toHaveCount(1);
  await expect(page.locator('.cards.downloads').getByRole('link')).toHaveCount(2);
  await expect(page.locator('.cards.promotional').getByRole('link')).toHaveCount(2);
  await expect(page.getByRole('img', { name: 'Reusable pen with dose display and cap' })).toBeVisible();

  const firstAction = page.getByRole('link', { name: 'Setup guide (PDF)' });
  await firstAction.focus();
  await expect(firstAction).toBeFocused();
  await expect(firstAction).toHaveCSS('outline-style', 'solid');
  await expect(firstAction).toHaveCSS('outline-width', '3px');
});

test('keeps the block library responsive and free of browser errors', async ({ page }) => {
  const errors = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('pageerror', (error) => errors.push(error.message));

  await page.setViewportSize({ width: 320, height: 900 });
  await loadIntegratedPage(page, libraryPath, 10);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(320);
  await expect(page.locator('.columns.product-intro .columns-row'))
    .toHaveCSS('grid-template-columns', /.+/);
  expect(await page.locator('.columns.product-intro .columns-row')
    .evaluate((element) => getComputedStyle(element).gridTemplateColumns.split(' ').length)).toBe(1);

  await page.setViewportSize({ width: 1440, height: 1000 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(1440);
  expect(await page.locator('.columns.product-intro .columns-row')
    .evaluate((element) => getComputedStyle(element).gridTemplateColumns.split(' ').length)).toBe(2);
  expect(await page.locator('.cards:not(.downloads):not(.promotional) > ul')
    .evaluate((element) => getComputedStyle(element).gridTemplateColumns.split(' ').length)).toBeGreaterThan(1);

  expect(errors).toEqual([]);
});
