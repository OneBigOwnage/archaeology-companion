import { sluggify } from '@/helpers';
import Model from '@/models/model';

export default class Excavation extends Model {
    constructor(ID, name, level, digSiteID) {
        super();
        this.ID = ID;
        this.name = name;
        this.level = level;
        this.digSiteID = digSiteID;
    }

    slug() {
        return sluggify(this.name);
    }

    route() {
        return { name: 'excavation-details', params: { slug: this.slug() } };
    }
}
