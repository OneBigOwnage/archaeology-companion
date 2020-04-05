import { toCamelCase } from '@/helpers';

export const getStateKey = args => {
    let parts = args
        .map(entity => toCamelCase(entity.constructor.name))
        .map(entity => entity + 's');

    parts.sort();

    return parts.join('_');
};

export const alphaSort = (a, b) => {
    if (a.constructor.name > b.constructor.name) {
        return 1;
    }

    if (a.constructor.name < b.constructor.name) {
        return -1;
    }

    return 0;
};
