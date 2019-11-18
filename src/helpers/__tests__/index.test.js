import { cleanUserObject } from "..";

describe('cleanUserObject', () => {
  it('removes unnecessary keys', () => {
    const obj = {
      a: 'a',
      d: 'd',
      email: 'foo',
      z: 'z',
    };

    const cleaned = cleanUserObject(obj);

    expect(cleaned).toEqual({
      email: 'foo',
    });
  });
});
