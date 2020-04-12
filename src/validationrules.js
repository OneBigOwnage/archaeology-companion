export const required = (message = null) => value => !!value || message || 'This field is required';

export const between = (lowerLimit, upperLimit, message = null) => value => (value >= lowerLimit && value <= upperLimit) || message || `The value must be between ${lowerLimit} and ${upperLimit}.`;

export const numeric = (message = null) => value => (!isNaN(value) && /^[0-9]*$/.test(value)) || message || 'The value must be numeric';

export const positive = (message = null) => value => value >= 1 || message || 'The value must be positive';
