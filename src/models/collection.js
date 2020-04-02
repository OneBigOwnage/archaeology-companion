import { sluggify } from '@/helpers';

export default class Collection {
    constructor(name, NPCName) {
        this.name = name;
        this.NPCName = NPCName;
    }

    slug() {
        return sluggify(this.name);
    }
}
