export const required = (message = null) => value => !!value || message || 'This field is required';

export const between = (lowerLimit, upperLimit, message = null) => value => (value >= lowerLimit && value <= upperLimit) || message || `The value must be between ${lowerLimit} and ${upperLimit}.`;

export const numeric = (message = null) => value => !isNaN(value) || message || 'The value must be numeric';
