import AlreadyAttachedError from '@/store/relations/errors/AlreadyAttachedError';
import NotAttachedError from '@/store/relations/errors/NotAttachedError';
import NotRelatedError from '@/store/relations/errors/NotRelatedError';
import NotAModelError from '@/store/relations/errors/NotAModelError';
import Model from '@/models/model';
import { getStateKey, alphaSort } from '@/store/relations/helpers';

export default {
    attach({ commit, state, getters }, args) {
        args.sort(alphaSort);
        const [first, second] = args;

        if (!(first instanceof Model)) {
            throw new NotAModelError(first);
        } else if (!(second instanceof Model)) {
            throw new NotAModelError(second);
        }

        if (getters['isAttached'](args)) {
            throw new AlreadyAttachedError(first, second);
        }

        const key = getStateKey(args);

        if (!Object.prototype.hasOwnProperty.call(state, key)) {
            throw new NotRelatedError(first, second);
        }

        commit('attach', { key, first, second });
    },
    detach({ commit, state, getters }, args) {
        args.sort(alphaSort);
        const [first, second] = args;

        if (!(first instanceof Model)) {
            throw new NotAModelError(first);
        } else if (!(second instanceof Model)) {
            throw new NotAModelError(second);
        }

        if (!getters['isAttached'](args)) {
            throw new NotAttachedError(first, second);
        }

        const key = getStateKey(args);

        if (!Object.prototype.hasOwnProperty.call(state, key)) {
            throw new NotRelatedError(first, second);
        }

        commit('detach', { key, first, second });
    },
    reset({ commit }) {
        commit('reset');
    }
};
