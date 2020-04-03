import Material from '@/models/material';
import Artefact from '@/models/artefact';
import { sluggify } from '@/helpers';
import faker from 'faker';

export default class Seeder {
    constructor(store) {
        this.$store = store;
    }

    seed() {
        this.seedMaterials();
        this.seedArtefacts();
    }

    seedMaterials() {
        this.$store.dispatch('materials/reset');

        for (let i = 0; i < 10; i++) {
            this.$store.dispatch('materials/add', new Material(faker.random.word(), faker.random.number({min:1, max:120})));
        }
    }

    seedArtefacts() {
        this.$store.dispatch('artefacts/reset');

        for (let i = 0; i < 10; i++) {
            const artefact = new Artefact(
                faker.random.word(),
                faker.random.number({ min: 600, max: 20000 }),
                faker.random.number({ min: 100, max: 1000 }),
                sluggify(faker.random.words(3))
            );

            this.$store.dispatch('artefacts/add', artefact);
        }
    }
}
