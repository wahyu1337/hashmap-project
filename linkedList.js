class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.next = null;
    }
}

export default class LinkedList {
    constructor() {
        this.head = null
    }

    // add new data
    append(key, value = null) {
        const data = new Node(key, value);

        // if there's is empty bucket or data
        if (this.head === null) {
            this.head = data;
            return;
        }

        // if there is a data already
        let temp = this.head;
        while (temp.next) {
            temp = temp.next;
        }
        temp.next = data;
    };

    // if the key it's same
    updateKey(key, value) {
        let temp = this.head;

        // check if key it's same than key in buckets
        while(temp) {
            if (key === temp.key) {
                temp.value = value;
                return true;
            } else {
                temp = temp.next;
            }
        }
        return false;
    };

    // return a value from key
    find(key) {
        let temp = this.head;
        // travel to node
        while (temp) {
            if (key === temp.key) {
                return temp.value;
            } else {
                temp = temp.next;
            }
        } return null;
    };

    // removed the given input key in stored value
    removedEntry(key) {
        let temp = this.head;

        // if node it's a head
        if (temp !== null && temp.key === key) {
            this.head = temp.next;
            return true;
        }

        // node in the middle or tail
        let previous = null;
        while (temp !== null) {
            if (key === temp.key) {
                previous.next = temp.next;
                return true;
            }
            previous = temp;
            temp = temp.next;
        } return false; //if no key match
    };

    // return the total node data
    size() {
        let temp = this.head;
        let counter = 0;        

        // loop through node and check if its true
        while (temp) {
            counter++;
            temp = temp.next;
        }        
        return counter;
    };

    // getKeys() return keys value
    getKeys() {
        let temp = this.head;
        let key =[];    

        while(temp) {
            key.push(temp.key);
            temp = temp.next;
        }
        return key;
    };

    // getValues() method return a value
    getValues() {
        let temp = this.head;
        let values = [];

        while (temp) {
            values.push(temp.value);
            temp = temp.next;
        }
        return values;
    };

    // getEntries() method return a key & value
    getEntries() {
        let temp = this.head;        
        let entry = [];

        while (temp){
            entry.push([temp.key, temp.value]);
            temp = temp.next;
        }
        return entry;
    };
};
