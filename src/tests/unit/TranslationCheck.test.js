import '@testing-library/jest-dom/extend-expect';

const en = require('../../translations/en.json');
const welsh = require('../../translations/cy.json');

describe('i18n', () => {
  test('Translations keys are the same for every language', () => {
    const translationKeysEn = Object.keys(en);
    const translationKeysWelsh = Object.keys(welsh);

    expect(translationKeysEn).toEqual(translationKeysWelsh);
  });

  test('Translations values are not empty', () => {
    const translationValuesEn = Object.values(en);
    const translationValuesWelsh = Object.values(welsh);

    translationValuesEn.forEach((value) => {
      expect(value).not.toBe('');
    });

    translationValuesWelsh.forEach((value) => {
      expect(value).not.toBe('');
    });
  });
});
