import HashMap from "./hashMap.js";
import logs from "./logs.js";
import HashSet from "./hashSet.js";

const test = new HashMap();
const data = new HashSet();

test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');
test.set('moon', 'silver');

data.add("Carlos");
data.add("Apple");
data.add("dog");
data.checkKey();
logs(data.has("Ways"));
logs(data.has("Carlos"));
logs(data.length());
data.clear();
logs("----------- RESET -----------");
data.checkKey();