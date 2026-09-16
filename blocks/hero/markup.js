/**
 * Builds product hero markup from authored media and copy.
 * @param {string} media Authored picture markup.
 * @param {string} content Authored eyebrow and heading markup.
 * @returns {string} Product hero markup.
 */
export default function heroMarkup(media, content) {
  return `
    <div class="hero-media">${media}</div>
    <div class="hero-content">${content}</div>
  `;
}
