import { sluggify } from '@/helpers';
import Model from '@/models/model';

export default class Collection extends Model {
    constructor(ID, name, NPCName, rewards) {
        super();
        this.ID = ID;
        this.name = name;
        this.NPCName = NPCName;
        this.rewards = rewards;
    }

    slug() {
        return sluggify(this.name);
    }
}
