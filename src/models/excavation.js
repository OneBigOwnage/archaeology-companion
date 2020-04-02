import { sluggify } from '@/helpers';

export default class Excavation {
    constructor(name, level, digSiteSlug,) {
        this.name = name;
        this.level = level;
        this.digSiteSlug = digSiteSlug;
    }

    slug() {
        return sluggify(this.name);
    }
}
