import 'jest-enzyme';
import { isPostcodeValid } from './PostcodeSelector';

describe('isPostcodeValid', () => {
  it('should return false if passed an empty string', () => {
    expect(isPostcodeValid('')).toBe(false);
  });
  it('should return false if passed a number', () => {
    expect(isPostcodeValid(123)).toBe(false);
  });
  it('should return false if passed more than 10 characters', () => {
    expect(isPostcodeValid('WEDR ERQWEDER')).toBe(false);
  });
  it('should return false if passed undefined or null', () => {
    expect(isPostcodeValid(undefined)).toBe(false);
    expect(isPostcodeValid(null)).toBe(false);
  });
});
