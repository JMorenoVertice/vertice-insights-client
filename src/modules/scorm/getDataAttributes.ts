export function getDataAttributes(el: Element): Record<string, string> {
    return [...el.attributes]
        .filter(a => a.name.startsWith('data-'))
        .reduce((acc, a) => {
            acc[a.name] = a.value;
            return acc;
        }, {} as Record<string, string>);
}
