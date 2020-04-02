import { sluggify } from '@/helpers';

export default class Material {
    constructor(name, level) {
        this.name = name;
        this.level = level;
    }

    slug() {
        return sluggify(this.name);
    }
}