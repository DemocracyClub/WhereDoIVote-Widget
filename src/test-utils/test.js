export const childAttributeChecker = shallowComponent => (selector, attribute) => {
  return shallowComponent
    .find(selector)
    .first()
    .html()
    .indexOf(attribute)
    ? true
    : false;
};
