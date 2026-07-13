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

    append(key, value) {
        let data = new Node(key, value);

        this.head = data;
    };
};

export { Node };