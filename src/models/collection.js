import { sluggify } from '@/helpers';

export default class Collection {
    constructor(ID, name, NPCName, rewards) {
        this.ID = ID;
        this.name = name;
        this.NPCName = NPCName;
        this.rewards = rewards;
    }

    slug() {
        return sluggify(this.name);
    }
}
