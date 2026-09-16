/**
 * Builds a semantic cards collection.
 * @param {string} items Valid card item markup.
 * @returns {string} Cards list markup.
 */
export function cardsMarkup(items) {
  return `<ul>${items}</ul>`;
}

/**
 * Builds one card from authored media and body content.
 * @param {string} media Authored picture markup.
 * @param {string} body Authored card body markup.
 * @param {string} variant Cards variation.
 * @returns {string} Card item markup.
 */
export function cardItemMarkup(media, body, variant) {
  const mediaMarkup = media ? `<div class="cards-card-image">${media}</div>` : '';
  const textOnlyClass = media ? '' : ' cards-card-text-only';
  return `
    <li class="cards-card cards-card-${variant}${textOnlyClass}">
      ${mediaMarkup}
      <div class="cards-card-body">${body}</div>
    </li>
  `;
}
