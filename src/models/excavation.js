import { sluggify } from '@/helpers';

export default class Excavation {
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
