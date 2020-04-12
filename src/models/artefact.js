import { sluggify, requireNotNull } from '@/helpers';
import Model from '@/models/model';

export default class Artefact extends Model {
    constructor(ID, name, xp, chronotes, excavationID, additionalItems) {
        super();

        this.ID = requireNotNull(ID);
        this.name = requireNotNull(name);
        this.xp = requireNotNull(xp);
        this.chronotes = requireNotNull(chronotes);
        this.excavationID = requireNotNull(excavationID);
        this.additionalItems = requireNotNull(additionalItems);
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
