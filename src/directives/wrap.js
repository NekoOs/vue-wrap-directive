/**
 * @typedef {Element&{__wrap__}} ElementWrap
 */

/**
 * @param {Element} element
 * @returns {boolean}
 */
const isVue = element => element['__vue__'] !== undefined;

/**
 * @param {Element} element
 */
const createVueWrap = element => {
    const {nextSibling: sibling, parentNode: parent, __vue__: component} = element;
    const children = component.$slots.default.map(node => node.elm);
    const wrapper = children[0].parentNode;

    return {
        parent,
        wrapper,
        sibling,
        children,
    };
};

/**
 * @param {Element} element
 */
const createDomWrap = element => {
    const {childNodes, nextSibling: sibling, parentNode: parent} = element;
    const children = Array.from(childNodes);
    const wrapper = element;

    return {
        parent,
        wrapper,
        sibling,
        children,
    };
};

/**
 * @param {string} key
 * @param {ElementWrap} el
 * @param {boolean} value
 */
const conditionalRender = (key, el, value) => {
    const {parent, wrapper, sibling, children, value: carry} = el[key];

    if (value === carry) {
        return;
    }
    el[key].value = value;

    if (value) {
        parent.insertBefore(el, sibling);
        children.forEach(child => wrapper.appendChild(child));
    } else {
        children.forEach(child => parent.insertBefore(child, el));
        el.parentNode.removeChild(el);
    }
};

/**
 * @param {string} key
 */
const createWrapDirective = (key) => ({
    inserted(el, {value}) {
        el[key] = isVue(el)
            ? createVueWrap(el)
            : createDomWrap(el);

        conditionalRender(key, el, value);
    },
    update(el, {value}) {
        conditionalRender(key, el, value);
    },
});

export default createWrapDirective;
