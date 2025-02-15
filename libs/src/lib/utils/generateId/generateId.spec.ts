import { generateShortId } from './index';

describe('generateId', () => {
  it('should generate a unique id', () => {
    const id = generateShortId('https://www.google.com');
    expect(id).toEqual('d2kID5O');
  });
});
