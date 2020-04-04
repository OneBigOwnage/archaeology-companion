import { sluggify } from '@/helpers';

export default class Artefact {
    constructor(ID, name, xp, chronotes, excavationSlug) {
        this.ID = ID;
        this.name = name;
        this.xp = xp;
        this.chronotes = chronotes;
        this.excavationSlug = excavationSlug;
    }

    slug() {
        return sluggify(this.name);
    }

    formattedXP() {
        return this.xp.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    }
}
