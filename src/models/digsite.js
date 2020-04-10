import { sluggify } from '@/helpers';
import Model from '@/models/model';

export default class DigSite extends Model {
    constructor(ID, name, level) {
        super();
        this.ID = ID;
        this.name = name;
        this.level = level;
    }

    slug() {
        return sluggify(this.name);
    }

    route() {
        return { name: 'dig-site-details', params: { slug: this.slug() } };
    }
}
