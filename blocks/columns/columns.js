import columnsRowMarkup from './markup.js';

/**
 * Adds baseline classes without changing existing columns markup.
 * @param {HTMLElement} block Columns block.
 */
function decorateDefault(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          picWrapper.classList.add('columns-img-col');
        }
      }
    });
  });
}

/**
 * Decorates product columns while ignoring unsupported extra cells.
 * @param {HTMLElement} block Columns block.
 * @param {string} variant Product variation name.
 */
function decorateProductColumns(block, variant) {
  const markup = [...block.children].map((row) => {
    const cells = [...row.children];
    const imageCell = cells.find((cell) => cell.querySelector('picture'));
    const contentCell = cells.find((cell) => (
      cell !== imageCell
      && cell.textContent.trim()
    ));
    if (!imageCell && !contentCell) return '';
    return columnsRowMarkup(
      imageCell?.querySelector('picture')?.outerHTML || '',
      contentCell?.innerHTML || '',
      variant,
    );
  }).join('');

  block.innerHTML = markup;
}

/**
 * Decorates columns, preserving the general block outside product variations.
 * @param {HTMLElement} block Columns block.
 */
export default async function decorate(block) {
  const variant = ['product-intro', 'feature'].find((name) => block.classList.contains(name));
  if (variant) decorateProductColumns(block, variant);
  else if (block.firstElementChild) decorateDefault(block);
}
