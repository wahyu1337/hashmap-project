import HashMap from "./hashMap.js";

const test = new HashMap();

// hashing code test
// console.log(test.hash("Ways"));
// console.log(test.hash("yaWs"));
// console.log(test.hash("var"));

// hasing set() test
test.set("Carlos", "I'm the old value");
test.set("Carlos", "I'm the new value");
test.set("Rama", "I am the old value");
test.set("Sita", "I am the new value");
test.set("Mara", "Data 3");
test.set("Mara", "Data 3 (TIMPA)");
test.set("Sara", "I am the new value");
test.checkBuckets();