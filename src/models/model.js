export default class Model {
    sluggify(string) {
        return string.toLowerCase().replace(' ', '-');
    }
}
