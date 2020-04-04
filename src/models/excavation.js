import { sluggify } from '@/helpers';
import Model from '@/models/model';

export default class Excavation extends Model {
    constructor(ID, name, level, digSiteSlug,) {
        this.ID = ID;
        this.name = name;
        this.level = level;
        this.digSiteSlug = digSiteSlug;
    }

    slug() {
        return sluggify(this.name);
    }
}
