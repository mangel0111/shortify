/**
 * Utility function to check if a given string is a valid URL
 *
 * @param url
 * @returns {boolean} Is the given string a valid URL
 */
export const isValidURL = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
