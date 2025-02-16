import { generateShortIdWithCRC32, generateShortIdWithSHA256 } from './index';

describe('generateShortIdWithSHA256', () => {
  it('should generate a unique id', () => {
    const id = generateShortIdWithSHA256('https://www.google.com');
    expect(id).toEqual('d2kID5O');
  });
});

describe('generateShortIdWithSHA256', () => {
  it('should generate a unique id', () => {
    const id = generateShortIdWithCRC32('https://www.google.com');
    expect(id).toEqual('W2w5B');
  })
})