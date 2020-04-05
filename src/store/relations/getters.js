import NotAModelError from '@/store/relations/NotAModelError';
import DigSite from '@/models/digsite';
import Artefact from '@/models/artefact';
import Material from '@/models/material';
import Excavation from '@/models/excavation';
// import Collection from '@/models/collection';
import Model from '@/models/model';
import { alphaSort, getStateKey } from '@/store/relations/helpers';
import NotRelatedError from '@/store/relations/NotRelatedError';

export default {
    isAttached: state => args => {
        const [first, second] = args;

        args.sort(alphaSort);

        return state[getStateKey(args)]
            .filter(relation => relation.firstID === first.ID && relation.secondID === second.ID)
            .length > 0;
    },
    materials: (state, getters, rootState) => entity => {
        if (!(entity instanceof Model)) {
            throw NotAModelError(entity);
        }

        if (entity instanceof Artefact) {
            const materialIDs = state.digSites_materials
                .filter(relation => relation.firstID === entity.ID)
                .map(relation => relation.secondID);

            return rootState.materials.all.filter(material => materialIDs.includes(material.ID));
        } else if (entity instanceof Excavation) {
            console.log();
        } else {
            throw new NotRelatedError(entity.constructor.name, Material.name);
        }
    },
};
