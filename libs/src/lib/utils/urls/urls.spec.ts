import { isValidURL } from './index';

describe('urls', () => {
  it.each([
    ['http://localhost:8080', true],
    ['https://localhost:8080', true],
    ['ftp://localhost:8080', true],
    ['http://localhost:8080/1234567', true],
    ['http://localhost:8080/1234567?query=string', true],
    ['https://google.com', true],
    ['some string', false],
    ["1", false],
    ["https://exa mple.com", false],
    ["http://", false],
    ["www.google.com", false],
  ])(`should validate that %s is %s`, (url, expected) => {
    expect(isValidURL(url)).toBe(expected);
  });
});
