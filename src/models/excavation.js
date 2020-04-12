import { sluggify, requireNotNull } from '@/helpers';
import Model from '@/models/model';

export default class Excavation extends Model {
    constructor(ID, name, level, digSiteID) {
        super();

        this.ID = requireNotNull(ID);
        this.name = requireNotNull(name);
        this.level = requireNotNull(level);
        this.digSiteID = requireNotNull(digSiteID);
    }

    slug() {
        return sluggify(this.name);
    }

    route() {
        return { name: 'excavation-details', params: { slug: this.slug() } };
    }
}
