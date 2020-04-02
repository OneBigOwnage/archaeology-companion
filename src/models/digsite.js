import { sluggify } from '@/helpers';

export default class DigSite {
    constructor(name) {
        this.name = name;
    }

    slug() {
        return sluggify(this.name);
    }
}
