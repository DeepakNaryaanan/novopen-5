/**
 * Builds the specifications description list.
 * @param {string} items Valid specification items.
 * @returns {string} Specifications markup.
 */
export default function specificationsMarkup(items) {
  return `<dl>${items}</dl>`;
}

/**
 * Builds one associated specification label and value pair.
 * @param {string} label Authored label markup.
 * @param {string} value Authored value markup.
 * @returns {string} Specification item markup.
 */
export function specificationItemMarkup(label, value) {
  return `
    <div class="specifications-item">
      <dt>${label}</dt>
      <dd>${value}</dd>
    </div>
  `;
}
