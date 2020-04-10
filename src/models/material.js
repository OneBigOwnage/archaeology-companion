import { sluggify } from '@/helpers';
import Model from '@/models/model';

export default class Material extends Model {
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
        return { name: 'material-details', params: { slug: this.slug() } };
    }
}
