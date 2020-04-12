import { sluggify, requireNotNull } from '@/helpers';
import Model from '@/models/model';

export default class DigSite extends Model {
    constructor(ID, name, level) {
        super();

        this.ID = requireNotNull(ID);
        this.name = requireNotNull(name);
        this.level = requireNotNull(level);
    }

    slug() {
        return sluggify(this.name);
    }

    route() {
        return { name: 'dig-site-details', params: { slug: this.slug() } };
    }
}
