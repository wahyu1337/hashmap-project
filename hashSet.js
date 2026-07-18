import LinkedList from "./linkedList";

class hashSet {
    // constructor
    constructor() {
        this.loadFactor = 0.75;
        this.capacity = 16;
        this.buckets = new Array(this.capacity);
    };

    // hash() method that return hashing from given string
    hash(key) {
        // hashcode & prime number
        let hashCode = 0;
        const primeNUmber = 31;

        // loop
        for(let i = 0; i < key.length; i++){
            hashCode = primeNUmber * hashCode + key.charCodeAt(i);
        }

        // return the hashCode
        return hashCode;
    };
    
    // set() method that return the key into buckets/array
    set(key) {
        // create the data
        const data = new LinkedList();
        // hash the key & buckets
        const hashKey = this.hash(key);
        let bucket = this.buckets;

        // add the data into current value
        data.append(key);

        // if the bucket it's empty
        if(bucket[hashKey] === undefined) {
            bucket[hashKey] = data;
        }
    };
};