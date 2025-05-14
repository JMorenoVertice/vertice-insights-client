import { getDataAttributes } from './getDataAttributes';

export function getParentStructure(el: Element): Array<Record<string, any>> {
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
