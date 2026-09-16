import specificationsMarkup, { specificationItemMarkup } from './markup.js';

/**
 * Decorates authored specification rows as a semantic description list.
 * @param {HTMLElement} block Specifications block.
 */
export default async function decorate(block) {
  const items = [...block.children].map((row) => {
    const cells = [...row.children];
    const label = cells[0];
    const value = cells[1];
    if (!label?.textContent.trim() || !value?.textContent.trim()) return '';
    return specificationItemMarkup(label.innerHTML, value.innerHTML);
  }).filter(Boolean).join('');

  block.innerHTML = specificationsMarkup(items);
}
