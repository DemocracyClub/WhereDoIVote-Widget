import { isConstituency, isRegion } from '../../Ballot.js';

describe('isConstituency', () => {
  it('returns true for constituency patterns', () => {
    expect(isConstituency('parl.division.2021-05-06')).toBe(true);
    expect(isConstituency('nia.division.2021-05-06')).toBe(true);
    expect(isConstituency('sp.c.division.2021-05-06')).toBe(true);
    expect(isConstituency('gla.c.division.2021-05-06')).toBe(true);
    expect(isConstituency('senedd.c.division.2021-05-06')).toBe(true);
    expect(isConstituency('senedd.division.2021-05-06')).toBe(true);
  });

  it('returns false for non-constituency patterns', () => {
    expect(isConstituency('senedd.r.division.2021-05-06')).toBe(false);
    expect(isConstituency('local.org.division.2021-05-06')).toBe(false);
  });
});

describe('isRegion', () => {
  it('returns true for region patterns', () => {
    expect(isRegion('sp.r.division.2021-05-06')).toBe(true);
    expect(isRegion('senedd.r.division.2021-05-06')).toBe(true);
  });

  it('returns false for non-region patterns', () => {
    expect(isRegion('sp.c.division.2021-05-06')).toBe(false);
    expect(isRegion('gla.c.division.2021-05-06')).toBe(false);
    expect(isRegion('senedd.c.division.2021-05-06')).toBe(false);
    expect(isRegion('senedd.division.2021-05-06')).toBe(false);
    expect(isRegion('local.org.division.2021-05-06')).toBe(false);
  });
});
