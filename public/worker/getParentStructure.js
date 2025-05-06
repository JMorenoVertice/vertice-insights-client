import { getDataAttributes } from './getDataAttributes.js';

export function getParentStructure(el) {
  const parents = [];
  let node = el.parentElement;
  while (node && node !== document.body) {
    parents.push({
      tag: node.tagName,
      id: node.id,
      class: node.className,
      name: node.getAttribute('name'),
      data: getDataAttributes(node),
      role: node.getAttribute('role'),
      ariaLabel: node.getAttribute('aria-label')
    });
    node = node.parentElement;
  }
  return parents;
}
// ALL MODULED BY CORAL JÁCOME