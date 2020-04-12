import { sluggify } from '@/helpers';
import Model from '@/models/model';

export default class Artefact extends Model {
    constructor(ID, name, xp, chronotes, excavationID, additionalItems) {
        super();
        this.ID = ID;
        this.name = name;
        this.xp = xp;
        this.chronotes = chronotes;
        this.excavationID = excavationID;
        this.additionalItems = additionalItems;
    }

    slug() {
        return sluggify(this.name);
    }

    route() {
        return { name: 'artefact-details', params: { slug: this.slug() } };
    }

    formattedXP() {
        return this.xp.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    }
}
