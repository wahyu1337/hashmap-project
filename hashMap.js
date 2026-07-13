import LinkedList from "./linkedList.js";

export default class HashMap {
    // load factor
    loadFactor = 0.75;
    constructor() {
        // buckets & capacity
        this.capacity = 16;
        this.buckets = new Array(this.capacity);
    };

    // hash code method
    hash(key) {
        // hashcode & prime number
        let hashCode = 0;
        let primeNumber = 31;

        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }
        return hashCode % this.capacity;
    };

    set(key, value) {
        const data = new LinkedList();
        // hash the key
        // & get the current buckets
        const hashKey = this.hash(key);
        let currentData = this.buckets;

        // append the data
        data.append(key, value);


        // check if the bucket is empty
        if (currentData[hashKey] === undefined) {
            currentData[hashKey] = data;
        }

        // if there is a data in bucket
        // check if  its a same key and same hash & update directly
        if (currentData[hashKey].updateKey(key, value) === false) {
            // add different key and same hash
            currentData[hashKey].append(key, value);
        }


        return hashKey;
    };

    checkBuckets() {
        const buckets = this.buckets;
        let index = 0;
        for (let list of buckets) {
            console.log(`index at ${index}`)
            console.dir(list, { depth: null });
            console.log('-----------');
            index++;
        }
    }
};