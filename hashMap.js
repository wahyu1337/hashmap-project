class HashMap {
    // load factor & capacity
    loadFactor = 0.75;
    capacity = 16;

    constructor(){
        this.key = null;
    }

    hash(key){
        // hashcode & prime number
        let hashCode = 0;
        let primeNumber = 31;
        
        for(let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }
        return hashCode;
    }
}