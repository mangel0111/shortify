import Hex from "crypto-js/enc-hex";
import baseX from 'base-x';
import sha256 from 'crypto-js/sha256';

const BASE62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const base62 = baseX(BASE62);

export const generateShortId = (originalUrl: string): string => {
  // 1. Hash the URL using SHA-256
  const hash = sha256(originalUrl).toString(Hex);

  // 2. Convert first 7 bytes to Base62 (short & unique)
  const base62Id = base62.encode(Buffer.from(hash, 'hex').subarray(0, 5));

  return base62Id;
};
