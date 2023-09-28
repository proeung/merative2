import { decorateMain } from '../../scripts/scripts.js';
import { loadBlocks, decorateIcons, decorateButtons } from '../../scripts/lib-franklin.js';

/**
 * Loads a fragment.
 * @param {string} path The path to the fragment
 * @returns {HTMLElement} The root element of the fragment
 */
async function loadFragment(path) {
  if (path && path.startsWith('/')) {
    const resp = await fetch(`${path}.plain.html`);
    if (resp.ok) {
      const main = document.createElement('div');
      main.innerHTML = await resp.text();
      decorateMain(main);
      await loadBlocks(main);
      return main;
    }
  }
}

export default async function decorate(block) {
  const blockName = block.getAttribute('data-block-name');
  if (!blockName) {
    return;
  }

  decorateButtons(block, { decorateClasses: false });

  const lastRow = [...block.children][1];

  if (lastRow) {
    const link = lastRow.querySelector('a');
    const path = link ? link.getAttribute('href') : lastRow.textContent.trim();
    const fragment = await loadFragment(path);

    if (fragment) {
      const fragmentSection = fragment.querySelector(':scope .section');
      if (fragmentSection) {
        lastRow.classList.add(...fragmentSection.classList);
        lastRow.replaceWith(...fragmentSection.childNodes);
      }
    }
  }
  
}
