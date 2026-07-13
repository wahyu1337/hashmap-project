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
        let data = new LinkedList();
        // hash the key
        // & get the current buckets
        const hashKey = this.hash(key);
        let updatedBuckets = this.buckets;

        // append the data input into var
        data.append(key, value);

        // insert the data into current index bucket
        updatedBuckets[hashKey] = data;

        // check if the bucket is empty
        if (updatedBuckets[hashKey] === undefined) updatedBuckets[hashKey] = data;

        // check if it's same key in buckets
        if (updatedBuckets[hashKey].key === key) {
            updatedBuckets[hashKey].value = value;
        }

        return hashKey;
    };

    checkBuckets() {
        const buckets = this.buckets;
        let index = 0;
        for (let list of buckets) {
            console.log(`index at ${index}`)
            console.log(list);
            console.log('-----------');
            index++;
        }
    }
};