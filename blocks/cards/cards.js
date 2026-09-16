import { createOptimizedPicture } from '../../scripts/aem.js';
import { cardsMarkup, cardItemMarkup } from './markup.js';

/**
 * Preserves the boilerplate cards behavior for all existing variations.
 * @param {HTMLElement} block Cards block.
 */
function decorateDefault(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.replaceChildren(ul);
}

/**
 * Returns validated card markup for a product collection row.
 * @param {HTMLElement} row Authored cards row.
 * @param {string} variant Product cards variation.
 * @returns {string} Valid card markup or an empty string.
 */
function getProductCardMarkup(row, variant) {
  const cells = [...row.children];
  const link = row.querySelector('a[href]');

  if (variant === 'downloads') {
    const body = cells.find((cell) => cell.textContent.trim());
    if (!body || !link) return '';
    return cardItemMarkup('', body.innerHTML, variant);
  }

  const imageCell = cells.find((cell) => cell.querySelector('picture'));
  const body = cells.find((cell) => (
    cell !== imageCell
    && cell.textContent.trim()
  ));
  if (!body?.querySelector('h1, h2, h3, h4, h5, h6') || !link) return '';
  return cardItemMarkup(
    imageCell?.querySelector('picture')?.outerHTML || '',
    body.innerHTML,
    variant,
  );
}

/**
 * Decorates cards, retaining existing behavior outside product variations.
 * @param {HTMLElement} block Cards block.
 */
export default async function decorate(block) {
  const variant = ['downloads', 'promotional'].find((name) => block.classList.contains(name));
  if (!variant) {
    decorateDefault(block);
    return;
  }

  const items = [...block.children]
    .map((row) => getProductCardMarkup(row, variant))
    .filter(Boolean)
    .join('');
  block.innerHTML = cardsMarkup(items);
}
