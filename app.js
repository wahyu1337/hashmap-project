import HashMap from "./hashMap.js";
import logs from "./logs.js";

const test = new HashMap();

// hashing code test
// console.log(test.hash("Ways"));
// console.log(test.hash("yaWs"));
// console.log(test.hash("var"));

// hashmap set() method test
test.set("Carlos", "I'm the old value");
test.set("Carlos", "I'm the new value");
test.set("Rama", "I am the old value");
test.set("Sita", "I am the new value");
test.set("Mara", "Data 3");
test.set("Mara", "Data 3 (TIMPA)");
test.set("Sara", "I am the new value");
test.checkBuckets();

// hashmap get() method test
logs("Key: Sita, Value: " + test.get("Sita"));
logs("Key: Mara, Value: " + test.get("Mara"));
logs("Key: Carlos, Value: " + test.get("Carlos"));
logs("Key: None, Value: " + test.get("None"));

// hashmap has() method test
logs(test.has("Carlos"));
logs(test.has("Sara"));
logs(test.has("Ways"));

// hashmap remove() method test
logs("------------REMOVE() Method------------")
logs(test.remove("Ways"));
logs(test.remove("Sita"));
test.checkBuckets();

// hashmap length() method
logs("Total key stored: " + test.length());