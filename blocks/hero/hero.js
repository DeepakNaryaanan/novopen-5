import heroMarkup from './markup.js';

/**
 * Hides failed decorative hero media while retaining the text fallback.
 * @param {Event} event Image error event.
 */
function handleImageError(event) {
  event.currentTarget.closest('picture')?.remove();
}

/**
 * Decorates the product hero variation.
 * @param {HTMLElement} block Hero block.
 */
export default async function decorate(block) {
  if (!block.classList.contains('product')) return;

  const rows = [...block.children];
  const picture = block.querySelector('picture');
  const content = rows
    .filter((row) => !row.querySelector('picture'))
    .flatMap((row) => [...row.children])
    .filter((cell) => cell.textContent.trim())
    .map((cell) => cell.innerHTML)
    .join('');

  block.innerHTML = heroMarkup(picture?.outerHTML || '', content);
  const image = block.querySelector('img');
  if (image) {
    image.loading = 'eager';
    image.addEventListener('error', handleImageError, { once: true });
  }
}
