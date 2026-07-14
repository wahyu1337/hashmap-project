import LinkedList from "./linkedList.js";
import logs from "./logs.js";

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
        // set linked list node
        const data = new LinkedList();
        // hash the key
        // & get the current buckets
        const hashKey = this.hash(key);
        let currentBuckets = this.buckets;

        // append the data
        data.append(key, value);


        // check if the bucket is empty
        if (currentBuckets[hashKey] === undefined) {
            currentBuckets[hashKey] = data;
        }

        // if there is a data in bucket
        // check if  its a same key and same hash & update directly
        if (currentBuckets[hashKey].updateKey(key, value) === false) {
            // add if it's different key and same hash
            currentBuckets[hashKey].append(key, value);
        }
    };

    // get () method return a value from  given key
    get(key) {
        // get the current buckets        
        const hashKey = this.hash(key);
        let currentBuckets = this.buckets[hashKey];
        let data = new LinkedList();

        if (currentBuckets !== undefined) {
            data = currentBuckets;
            return data.find(key);
        }
        return null;
    };


    // logs entire buckets
    checkBuckets() {
        const buckets = this.buckets;
        let index = 0;
        for (let list of buckets) {
            logs(`index at ${index}`)
            console.dir(list, { depth: null });
            logs('-----------');
            index++;
        }
    };
};