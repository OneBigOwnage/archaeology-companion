import { sluggify } from '@/helpers';

export default class Material {
    constructor(ID, name, level) {
        this.ID = ID;
        this.name = name;
        this.level = level;
    }

    slug() {
        return sluggify(this.name);
    }
}
