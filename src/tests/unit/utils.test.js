import '@testing-library/jest-dom/extend-expect';

import getWordsFromNumber from '../../utils';
import en_messages from '../../translations/en';
import cy_messages from '../../translations/cy';

describe('getWordsFromNumber', () => {
  it('should return one if passed the number 1 and the English strings', () => {
    expect(getWordsFromNumber(1, en_messages)).toBe(en_messages['numbers.one']);
  });
  it('should return correctly if passed the number 2 and the Welsh strings', () => {
    expect(getWordsFromNumber(2, cy_messages)).toBe(cy_messages['numbers.two']);
  });
  it('should return three if passed the number 3 and the English strings', () => {
    expect(getWordsFromNumber(3, en_messages)).toBe('three');
  });
  it('should return correctly if passed the number 4 and the Welsh strings', () => {
    expect(getWordsFromNumber(4, cy_messages)).toBe(cy_messages['numbers.four']);
  });
  it('should return five if passed the number 5 and the English strings', () => {
    expect(getWordsFromNumber(5, en_messages)).toBe('five');
  });
  it('should return correctly if passed the number 6 and the Welsh strings', () => {
    expect(getWordsFromNumber(6, cy_messages)).toBe(cy_messages['numbers.six']);
  });
  it('should return seven if passed the number 7 and the English strings', () => {
    expect(getWordsFromNumber(7, en_messages)).toBe('seven');
  });
  it('should return correctly if passed the number 8 and the Welsh strings', () => {
    expect(getWordsFromNumber(8, cy_messages)).toBe(cy_messages['numbers.eight']);
  });
  it('should return nine if passed the number 9 and the English strings', () => {
    expect(getWordsFromNumber(9, en_messages)).toBe('nine');
  });
  it('should return correctly if passed the number 10 and the Welsh strings', () => {
    expect(getWordsFromNumber(10, cy_messages)).toBe(cy_messages['numbers.ten']);
  });
});
