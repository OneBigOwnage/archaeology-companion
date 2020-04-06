import NotAModelError from '@/store/relations/errors/NotAModelError';
import NotRelatedError from '@/store/relations/errors/NotRelatedError';
import Artefact from '@/models/artefact';
import DigSite from '@/models/digsite';
import Material from '@/models/material';
import Excavation from '@/models/excavation';
import Collection from '@/models/collection';
import Model from '@/models/model';
import { alphaSort, getStateKey } from '@/store/relations/helpers';

export default {
    isAttached: state => args => {
        const [first, second] = args;

        args.sort(alphaSort);

        const key = getStateKey(args);

        if (!Object.prototype.hasOwnProperty.call(state, key)) {
            throw new NotRelatedError(first, second);
        }

        return state[key]
            .filter(relation => relation.firstID === first.ID && relation.secondID === second.ID)
            .length > 0;
    },
    materials: (state, getters, rootState) => entity => {
        if (!(entity instanceof Model)) {
            throw NotAModelError(entity);
        }

        if (entity instanceof Artefact) {
            const materialIDs = state.artefacts_materials
                .filter(relation => relation.firstID === entity.ID)
                .map(relation => relation.secondID);

            return rootState.materials.all.filter(material => materialIDs.includes(material.ID));
        } else if (entity instanceof Excavation) {
            const materialIDs = state.excavations_materials
                .filter(relation => relation.firstID === entity.ID)
                .map(relation => relation.secondID);

            return rootState.materials.all.filter(material => materialIDs.includes(material.ID));
        } else {
            throw new NotRelatedError(entity.constructor.name, Material.name);
        }
    },
    artefacts: (state, getters, rootState) => entity => {
        if (!(entity instanceof Model)) {
            throw new NotAModelError(entity);
        }

        if (entity instanceof Material) {
            const artefactIDs = state.artefacts_materials
                .filter(relation => relation.secondID === entity.ID)
                .map(relation => relation.firstID);

            return rootState.artefacts.all.filter(artefact => artefactIDs.includes(artefact.ID));
        } else if (entity instanceof Collection) {
            const artefactIDs = state.artefacts_collections
                .filter(relation => relation.secondID === entity.ID)
                .map(relation => relation.firstID);

            return rootState.artefacts.all.filter(artefact => artefactIDs.includes(artefact.ID));
        } else if (entity instanceof Excavation) {
            return rootState.artefacts.all.filter(artefact => artefact.excavationID === entity.ID);
        } else {
            throw new NotRelatedError(entity.constructor.name, Artefact.name);
        }
    },
    collections: (state, getters, rootState) => entity => {
        if (!(entity instanceof Model)) {
            throw new NotAModelError(entity);
        }

        if (entity instanceof Artefact) {
            const collectionIDs = state.artefacts_collections
                .filter(relation => relation.firstID === entity.ID)
                .map(relation => relation.secondID);

            return rootState.collections.all.filter(collection => collectionIDs.includes(collection.ID));
        } else {
            throw new NotRelatedError(entity.constructor.name, Collection.name);
        }
    },
    excavations: (state, getters, rootState) => entity => {
        if (!(entity instanceof Model)) {
            throw new NotAModelError(entity);
        }

        if (entity instanceof Material) {
            const excavationIDs = state.excavations_materials
                .filter(relation => relation.secondID === entity.ID)
                .map(relation => relation.firstID);

            return rootState.excavations.all.filter(excavation => excavationIDs.includes(excavation.ID));
        } else if (entity instanceof DigSite) {
            return rootState.excavations.all.filter(excavation => excavation.digSiteID === entity.ID);
        } else {
            throw new NotRelatedError(entity.constructor.name, Excavation.name);
        }
    },
    excavation: (state, getters, rootState) => artefact => {
        if (!(artefact instanceof Artefact)) {
            throw new NotRelatedError(artefact.constructor.name, Excavation.name);
        }

        const potential = rootState.excavations.all.filter(excavation => artefact.excavationID === excavation.ID);

        if (potential.length <= 0) {
            return null;
        }

        return potential[0];
    },
    digSite: (state, getters, rootState) => excavation => {
        if (!(excavation instanceof Artefact)) {
            throw new NotRelatedError(excavation.constructor.name, DigSite.name);
        }

        const potential = rootState.digSites.all.filter(digSite => excavation.digSiteID === digSite.ID);

        if (potential.length <= 0) {
            return null;
        }

        return potential[0];
    },
};
