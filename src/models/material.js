import { sluggify, requireNotNull } from '@/helpers';
import Model from '@/models/model';

export default class Material extends Model {
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
        return { name: 'material-details', params: { slug: this.slug() } };
    }
}
