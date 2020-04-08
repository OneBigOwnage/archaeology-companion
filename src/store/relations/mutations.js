
import { initial } from '@/store/relations';
import Relation from '@/models/relation';

export default {
    attach(state, transferObj) {
        state[transferObj.key].push(
            new Relation(transferObj.first.ID, transferObj.second.ID)
        );
    },
    detach(state, transferObj) {
        state[transferObj.key] = state[transferObj.key].filter(relation => !(transferObj.first.ID === relation.firstID && transferObj.second.ID === relation.secondID));
    },
    reset(state) {
        Object.assign(state, initial());
    },
};
