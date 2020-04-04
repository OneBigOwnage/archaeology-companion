import Material from '@/models/material';
import Artefact from '@/models/artefact';
import DigSite from '@/models/digsite';
import Excavation from '@/models/excavation';
import Collection from '@/models/collection';
import { sluggify } from '@/helpers';
import faker from 'faker';
import { v4 as uuidv4 } from 'uuid';

export default class Seeder {
    constructor(store) {
        this.$store = store;
    }

    seed() {
        this.seedMaterials();
        this.seedArtefacts();
        this.seedDigSites();
        this.seedExcavations();
        this.seedCollections();
    }

    seedMaterials() {
        this.$store.dispatch('materials/reset');

        for (let i = 0; i < 10; i++) {
            this.$store.dispatch('materials/add', new Material(
                uuidv4(),
                faker.random.word(),
                faker.random.number({ min: 1, max: 120 }))
            );
        }
    }

    seedArtefacts() {
        this.$store.dispatch('artefacts/reset');

        for (let i = 0; i < 10; i++) {
            const artefact = new Artefact(
                uuidv4(),
                faker.random.word(),
                faker.random.number({ min: 600, max: 20000 }),
                faker.random.number({ min: 100, max: 1000 }),
                sluggify(faker.random.words(3))
            );

            this.$store.dispatch('artefacts/add', artefact);
        }
    }

    seedDigSites() {
        this.$store.dispatch('digSites/reset');

        for (let i = 0; i < 5; i++) {
            const site = new DigSite(
                uuidv4(),
                faker.random.word(),
                faker.random.number({ min: 1, max: 80 })
            );

            this.$store.dispatch('digSites/add', site);
        }
    }

    seedExcavations() {
        this.$store.dispatch('excavations/reset');

        for (let i = 0; i < 10; i++) {
            const excavation = new Excavation(
                uuidv4(),
                faker.random.word(),
                faker.random.number({ min: 1, max: 120 }),
                sluggify(faker.random.words(3))
            );

            this.$store.dispatch('excavations/add', excavation);
        }
    }

    seedCollections() {
        this.$store.dispatch('collections/reset');

        const suffixes = [ 'I', 'II', 'III', 'IV' ];

        for (let i = 0; i <10; i++) {
            const collection = new Collection(
                uuidv4(),
                [ faker.random.word(), faker.random.arrayElement(suffixes) ].join(' '),
                faker.name.findName(),
                faker.random.number({min: 50, max: 1000}) + ' chronotes'
            );

            this.$store.dispatch('collections/add', collection);
        }
    }
}
