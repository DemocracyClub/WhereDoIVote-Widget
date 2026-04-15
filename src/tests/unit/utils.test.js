import { formatDateCy, formatPrimaryStationObject } from '../../utils';

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

describe('formatPrimaryStationObject', () => {
  function makeStation({ address, postcode = null, coordinates = null }) {
    return {
      properties: { address, postcode },
      geometry: coordinates ? { coordinates } : null,
    };
  }

  it('joins multi-line address into a single comma-separated string', () => {
    const station = makeStation({ address: 'Line 1\nLine 2\nLine 3' });
    const result = formatPrimaryStationObject(station);
    expect(result.address).toBe('Line 1, Line 2, Line 3');
  });

  it('appends postcode when present', () => {
    const station = makeStation({ address: 'Town Hall', postcode: 'SW1A 1AA' });
    const result = formatPrimaryStationObject(station);
    expect(result.address).toBe('Town Hall, SW1A 1AA');
  });

  it('does not append a postcode when absent', () => {
    const station = makeStation({ address: 'Town Hall', postcode: null });
    const result = formatPrimaryStationObject(station);
    expect(result.address).toBe('Town Hall');
  });

  it('collapses multiple consecutive newlines into a single comma-space', () => {
    const station = makeStation({ address: 'Line 1\n\n\nLine 2' });
    const result = formatPrimaryStationObject(station);
    expect(result.address).toBe('Line 1, Line 2');
  });

  it('returns coordinates from geometry when present', () => {
    const station = makeStation({ address: 'Town Hall', coordinates: [-0.1278, 51.5074] });
    const result = formatPrimaryStationObject(station);
    expect(result.location).toEqual([-0.1278, 51.5074]);
  });

  it('returns undefined for location when geometry is absent', () => {
    const station = makeStation({ address: 'Town Hall' });
    const result = formatPrimaryStationObject(station);
    expect(result.location).toBeUndefined();
  });
});
