import { sluggify, requireNotNull } from '@/helpers';
import Model from '@/models/model';

export default class Collection extends Model {
    constructor(ID, name, NPCName, rewards) {
        super();

        this.ID = requireNotNull(ID);
        this.name = requireNotNull(name);
        this.NPCName = requireNotNull(NPCName);
        this.rewards = requireNotNull(rewards);
    }

    slug() {
        return sluggify(this.name);
    }

    route() {
        return { name: 'collection-details', params: { slug: this.slug() } };
    }
}
