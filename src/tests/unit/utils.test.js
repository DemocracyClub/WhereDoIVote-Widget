import { formatDateCy } from '../../utils';

describe('formatDateCy', () => {
  it('Should match behaviour of toLocaleDateString', () => {
    /*
    Node ships with a cy language pack so under test
    we can confirm our custom function is right
    by looping over a year's worth of dates
    and asserting that the output of
    formatDateCy()
    matches the output of
    toLocaleDateString()
    with the relevant options
    */
    const start = new Date('2026-01-01');
    for (let i = 0; i < 365; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      const expectedDateStr = date.toLocaleDateString('cy', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      const outDateStr = formatDateCy(date);
      expect(outDateStr).toEqual(expectedDateStr);
    }
  });
});
