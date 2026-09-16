/**
 * Builds one product columns row.
 * @param {string} media Authored picture markup.
 * @param {string} content Authored text markup.
 * @param {string} variant Product columns variation.
 * @returns {string} Columns row markup.
 */
export default function columnsRowMarkup(media, content, variant) {
  const mediaMarkup = media ? `<div class="columns-media">${media}</div>` : '';
  const missingMediaClass = media ? '' : ' columns-row-no-media';
  return `
    <div class="columns-row columns-row-${variant}${missingMediaClass}">
      ${mediaMarkup}
      <div class="columns-content">${content}</div>
    </div>
  `;
}
