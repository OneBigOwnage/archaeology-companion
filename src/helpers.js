export const sluggify = string => string.toLowerCase().split(' ').join('-');

export const toCamelCase = string => {
  const casingFunction = (letter, index) => {
    if (index === 0) {
      return letter.toLowerCase();
    }

    return letter.toUpperCase();
  };

  return string.replace(/(?:^\w|[A-Z]|\b\w)/g, casingFunction).replace(/\s+/g, '')
};
