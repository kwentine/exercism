import {shift} from './simple-cipher'

describe('Shifting characters', () => {

  it('throws when input is not valid', () => {
    expect(() => shift([], 3)).toThrow();
    expect(() => shift('abc', 3)).toThrow();
    expect(() => shift('', 3)).toThrow();
  });

  it('shifts by a positive amount less than 26', () => {
    expect(shift('a', 1)).toEqual('b');
    expect(shift('z', 1)).toEqual('a');
  });

  it('remains invariant under shift by 26', () => {
    expect(shift('a', 26)).toEqual('a')
  });

  it('composes', () => {
    expect(shift(shift('z', 1), 1)).toEqual(shift('z', 2))
  });

  it('shifts by a positive amount greater than 26', () => {
    expect(shift('a', 26 + 3)).toEqual(shift('a', 3));
    expect(shift('z', 26 + 10)).toEqual(shift('z', 10));
  });

  it('shifts by a negative amount less than 26', () => {
    expect(shift('a', -1)).toEqual('z');
    expect(shift('z', -1)).toEqual('y');
  });

  it('shifts by a negative amount less than 25', () => {
    expect(shift('a', -26 - 11)).toEqual(shift('a', -11));
    expect(shift('z', -26 - 3)).toEqual(shift('z', -3));
  });
});
