import HashMap from "./hashMap.js";

// hashSet class with DRY (Don't Repeat Yourself)

export default class HashSet {
    // constructor
    constructor() {
        // wrap hashmap as an machine
        this.map = new HashMap();
    };

    // add() a new key
    add(key) {
        this.map.set(key, true);
    };

    // has() return true/false if it's contain
    has(key) {
        return this.map.get(key) !== null;
    };

    // remove() a spesific key
    remove(key) {
        this.map.remove(key);
    };

    // return() total key stored
    length() {
        const bucket = this.map.buckets;
        let counter = 0;
        for (let key of bucket) {
            if (key !== undefined) {
                counter += key.size();
            }
        }
        return counter;
    };

    // clear()

    checkSet() {
        const bucket = this.map.buckets;
        let index = 0;

        for (let list of bucket) {
            console.log(`Index at ${index}`);
            console.dir(list, { depth: null });
            console.log("--------------------");
            index++;
        }
    }
};