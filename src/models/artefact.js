import { sluggify } from '@/helpers';
import Model from '@/models/model';

export default class Artefact extends Model {
    constructor(ID, name, xp, chronotes, excavationID) {
        super();
        this.ID = ID;
        this.name = name;
        this.xp = xp;
        this.chronotes = chronotes;
        this.excavationID = excavationID;
    }

    slug() {
        return sluggify(this.name);
    }

    formattedXP() {
        return this.xp.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    }
}
