export default class Material {
    constructor(name, level) {
        this.name = name;
        this.level = level;
    }

    slug() {
        return this.name.toLowerCase().replace(' ', '-');
    }
}
