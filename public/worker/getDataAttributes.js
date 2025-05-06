export function getDataAttributes(el) {
  return Array.from(el.attributes)
    .filter(a => a.name.startsWith('data-'))
    .reduce((acc, a) => {
      acc[a.name] = a.value;
      return acc;
    }, {});
}
// ALL MODULED BY CORAL JÁCOME