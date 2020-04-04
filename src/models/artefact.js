import { sluggify } from '@/helpers';
import Model from '@/models/model';

export default class Artefact extends Model {
    constructor(ID, name, xp, chronotes, excavationSlug) {
        super();
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
