import Material from '@/models/material';
import Artefact from '@/models/artefact';
import DigSite from '@/models/digsite';
import Excavation from '@/models/excavation';
import Collection from '@/models/collection';
import { sluggify, ignoreErrors, shuffleArray } from '@/helpers';
import faker from 'faker';
import { v4 as uuidv4 } from 'uuid';


export default class Seeder {
    constructor(store) {
        this.$store = store;

        this.materials = [];
        this.artefacts = [];
        this.collections = [];
        this.excavations = [];
        this.digSites = [];
    }

    seed() {
        this.seedMaterials();
        this.seedArtefacts();
        this.seedDigSites();
        this.seedExcavations();
        this.seedCollections();

        this.seedRelations();
    }

    seedMaterials() {
        this.$store.dispatch('materials/reset');

        for (let i = 0; i < 10; i++) {
            const material = new Material(
                uuidv4(),
                faker.random.word(),
                faker.random.number({ min: 1, max: 120 })
            );

            this.materials.push(material);

            this.$store.dispatch('materials/add', material);
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

            this.artefacts.push(artefact);

            this.$store.dispatch('artefacts/add', artefact);
        }
    }

    seedDigSites() {
        this.$store.dispatch('digSites/reset');

        for (let i = 0; i < 5; i++) {
            const digSite = new DigSite(
                uuidv4(),
                faker.random.word(),
                faker.random.number({ min: 1, max: 80 })
            );

            this.digSites.push(digSite);

            this.$store.dispatch('digSites/add', digSite);
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

            this.excavations.push(excavation);

            this.$store.dispatch('excavations/add', excavation);
        }
    }

    seedCollections() {
        this.$store.dispatch('collections/reset');

        const suffixes = [ 'I', 'II', 'III', 'IV' ];

        for (let i = 0; i < 10; i++) {
            const collection = new Collection(
                uuidv4(),
                [ faker.random.word(), faker.random.arrayElement(suffixes) ].join(' '),
                faker.name.findName(),
                faker.random.number({ min: 50, max: 1000 }) + ' chronotes'
            );

            this.collections.push(collection);

            this.$store.dispatch('collections/add', collection);
        }
    }

    seedRelations() {
        this.$store.dispatch('relations/reset');

        // Link artefacts to materials.
        for (let i = 0; i < 10; i++) {
            shuffleArray(this.artefacts);
            shuffleArray(this.materials);

            ignoreErrors( () => this.$store.dispatch('relations/attach', [ this.artefacts[0], this.materials[0] ]));
        }

        // Link artefacts to collections.
        for (let i = 0; i < 10; i++) {
            shuffleArray(this.artefacts);
            shuffleArray(this.collections);

            ignoreErrors( () => this.$store.dispatch('relations/attach', [ this.artefacts[0], this.collections[0] ]));
        }

        // Link dig sites to excavations.
        for (let i = 0; i < 10; i++) {
            shuffleArray(this.digSites);
            shuffleArray(this.excavations);

            ignoreErrors( () => this.$store.dispatch('relations/attach', [ this.digSites[0], this.excavations[0] ]));
        }

        // Link dig sites to materials.
        for (let i = 0; i < 10; i++) {
            shuffleArray(this.digSites);
            shuffleArray(this.materials);

            ignoreErrors( () => this.$store.dispatch('relations/attach', [ this.digSites[0], this.materials[0] ]));
        }

        // Link excavations to materials.
        for (let i = 0; i < 10; i++) {
            shuffleArray(this.excavations);
            shuffleArray(this.materials);

            ignoreErrors( () => this.$store.dispatch('relations/attach', [ this.excavations[0], this.materials[0] ]));
        }
    }
}
