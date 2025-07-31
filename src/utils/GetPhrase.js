
export const getPhrase = (key) => {
  if (!key || typeof key !== 'string') return '';

  return key
    .replace(/[-_]/g, ' ') 
    .replace(/\b\w/g, char => char.toUpperCase());
};
