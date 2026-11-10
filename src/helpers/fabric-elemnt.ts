type EventAttributes = {
  [K in keyof HTMLElementEventMap as `on${Capitalize<K & string>}`]?: (
    event: HTMLElementEventMap[K],
  ) => void;
};

type Attributes = Record<string, unknown> & EventAttributes;

type Child = Node | string | number | null | undefined | false;

function setAttributes(element: HTMLElement, attributes: Attributes) {
  Object.entries(attributes).forEach(([key, value]) => {
    if (value == null) return;

    if (key.startsWith('on')) {
      Reflect.set(element, key.toLowerCase(), value);
      return;
    }

    if (key in element) {
      Reflect.set(element, key, value);
      return;
    }

    if (['string', 'number', 'boolean'].includes(typeof value)) {
      element.setAttribute(key, String(value));
    }
  });
}

function appendChildren(element: HTMLElement, children: Child[]) {
  children.forEach((child) => {
    if (child == null || child === false) return;

    element.append(child instanceof Node ? child : document.createTextNode(String(child)));
  });
}

export function el<K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  attributes: Attributes = {},
  ...children: Child[]
): HTMLElementTagNameMap[K] {
  const element = document.createElement(tagName);

  setAttributes(element, attributes);
  appendChildren(element, children);

  return element;
}
