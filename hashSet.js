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

    // clear(), remove all the current key
    clear() {
        // loop all the node and remove them
        for (let i = 0; i < this.map.buckets.length; i++) {
            if (this.map.buckets[i] !== undefined) {
                this.map.buckets[i] = undefined;
            }
        }
    };

    // keys() return array that containing all the keys
    keys() {
        let key = [];

        for (let bucket of this.map.buckets) {
            if (bucket) {
                key.push(bucket.getKeys());
            }
        }
        return key.flat();
    }

    // checkKey() logs all the key and buckets
    checkKey() {
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