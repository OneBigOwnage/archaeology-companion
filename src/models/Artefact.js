import { sluggify } from '@/helpers';

export default class Artefact {
    constructor(name, xp, chronotes, excavationSlug) {
        this.name = name;
        this.xp = xp;
        this.chronotes = chronotes;
        this.excavationSlug = excavationSlug;
    }

    slug() {
        return sluggify(this.name);
    }
}
