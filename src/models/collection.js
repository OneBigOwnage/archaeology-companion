import { sluggify } from '@/helpers';

export default class Collection {
    constructor(name, NPCName, rewards) {
        this.name = name;
        this.NPCName = NPCName;
        this.rewards = rewards;
    }

    slug() {
        return sluggify(this.name);
    }
}
