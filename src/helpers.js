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


export const ignoreErrors = fun => {
  try {
    return fun();
  } catch (error) {
    console.error(error);
    return null;
  }
}

/**
 * This is full of magic!
 * Source: https://stackoverflow.com/a/6274398
 *
 * @param {Array} array
 */
export const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};


export const autocompleteMapper = model => {
  return { text: model.name, value: model.ID };
};


export const sortByProperty = property => (a, b) => a[property].localeCompare(b[property]);

export const createFuzzyMatcher = string => new RegExp('.*' + string.toLowerCase().split('').join('.*') + '.*');


const chronotesRewardRegex = /^(\d+)\schronote(s?)$/i;

export const isInterpretedAsChronotes = string => chronotesRewardRegex.test(string);

export const getNumberOfChronotes = string => {
  if (!isInterpretedAsChronotes(string)) {
    throw new Error(`[${string}] is not interpreted as a number of chronotes and thus cannot get number of chronotes from that string.`);
  }

  return parseInt(
    string.match(chronotesRewardRegex)[1]
  );
};

export const requireNotNull = (value, descriptor = 'field') => {
  if (value === undefined || value === null) {
    throw new Error(`${descriptor} may not be empty.`);
  }

  return value;
};
