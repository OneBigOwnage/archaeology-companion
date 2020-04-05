import NotAModelError from '@/store/relations/errors/NotAModelError';
import NotRelatedError from '@/store/relations/errors/NotRelatedError';
import DigSite from '@/models/digsite';
import Artefact from '@/models/artefact';
import Material from '@/models/material';
import Excavation from '@/models/excavation';
import Collection from '@/models/collection';
import Model from '@/models/model';
import { alphaSort, getStateKey } from '@/store/relations/helpers';

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
                .map(relation => relation.secondID);

            return rootState.artefacts.all.filter(artefact => artefactIDs.includes(artefact.ID));
        } else if (entity instanceof Collection) {
            const artefactIDs = state.artefacts_collections
                .filter(relation => relation.secondID === entity.ID)
                .map(relation => relation.firstID);

            return rootState.artefacts.all.filter(artefact => artefactIDs.includes(artefact.ID));
        } else if (entity instanceof Excavation) {
            const artefactIDs = state.artefacts_excavations
                .filter(relation => relation.secondID === entity.ID)
                .map(relation => relation.firstID);

            return rootState.artefacts.all.filter(artefact => artefactIDs.includes(artefact.ID));
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
    digSites: (state, getters, rootState) => entity => {
        if (!(entity instanceof Model)) {
            throw new NotAModelError(entity);
        }

        if (entity instanceof Excavation) {
            const digSiteIDs = state.digSites_excavations
                .filter(relation => relation.secondID === entity.ID)
                .map(relation => relation.firstID);

            return rootState.digSites.all.filter(digSite => digSiteIDs.includes(digSite.ID));
        } else {
            throw new NotRelatedError(entity.constructor.name, DigSite.name);
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
        } else if (entity instanceof Artefact) {
            const excavationIDs = state.artefacts_excavations
                .filter(relation => relation.secondID === entity.ID)
                .map(relation => relation.firstID);

            return rootState.excavations.all.filter(excavation => excavationIDs.includes(excavation.ID));
        } else if (entity instanceof DigSite) {
            const excavationIDs = state.digSites_excavations
                .filter(relation => relation.firstID === entity.ID)
                .map(relation => relation.secondID);

            return rootState.excavations.all.filter(excavation => excavationIDs.includes(excavation.ID));
        } else {
            throw new NotRelatedError(entity.constructor.name, Excavation.name);
        }
    },
};
