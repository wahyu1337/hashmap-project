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
    append(key, value) {
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
        while (temp) {
            if (key === temp.key) {
                temp.value = value;
                return true;
            } else {
                temp = temp.next;
            }
        }
        return false;
    };
};

export { Node };