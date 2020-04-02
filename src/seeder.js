import Material from '@/models/material';
import faker from 'faker';

export default class Seeder {
    constructor(store) {
        this.$store = store;
    }

    seed() {
        this.seedMaterials();
    }

    seedMaterials() {
        this.$store.dispatch('materials/reset');

        for (let i = 0; i < 10; i++) {
            this.$store.dispatch('materials/add', new Material(faker.random.word(), faker.random.number({min:1, max:120})));
        }
    }
}
