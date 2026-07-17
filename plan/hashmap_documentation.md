# 📚 HashMap Project — Dokumentasi Belajar

> Dokumentasi ini dibuat sebagai bahan belajar ulang dari project HashMap yang dikerjakan melalui The Odin Project.

---

## 1. Apa itu HashMap?

HashMap adalah **data structure** yang menyimpan data dalam format **key-value pair** (pasangan kunci-nilai). HashMap memberikan akses data yang sangat cepat — rata-rata **O(1)** — karena menggunakan **hash function** untuk menentukan lokasi penyimpanan.

### Analogi Sederhana

Bayangkan **loker di sekolah**:
- Setiap loker punya **nomor** (index/bucket)
- Kamu punya **nama** (key) yang di-hash jadi nomor loker
- Di dalam loker ada **barang** (value)

```
"Carlos" → hash() → nomor 5 → loker[5] = "I'm the new value"
"Mara"   → hash() → nomor 5 → loker[5] sudah isi! (collision) → chain via LinkedList
```

---

## 2. Struktur Data yang Digunakan

### 2.1 Node (LinkedList)

```javascript
class Node {
    constructor(key, value) {
        this.key = key;      // kunci data
        this.value = value;  // nilai data
        this.next = null;    // pointer ke node berikutnya
    }
}
```

Setiap Node menyimpan **3 hal**: key, value, dan pointer `next` ke node selanjutnya.

### 2.2 LinkedList

```javascript
class LinkedList {
    constructor() {
        this.head = null;  // pointer ke node pertama
    }
}
```

LinkedList adalah **rantai node** yang terhubung satu sama lain:

```
head → [Carlos|value|next] → [Rama|value|next] → null
```

### 2.3 HashMap

```javascript
class HashMap {
    constructor() {
        this.capacity = 16;           // ukuran array
        this.loadFactor = 0.75;       // batas beban
        this.buckets = new Array(16); // array penyimpanan
    }
}
```

HashMap menggunakan **array of LinkedList** sebagai tempat penyimpanan:

```
this.buckets = [
    index 0:  undefined
    index 1:  undefined
    index 2:  LinkedList → [Carlos|value] → [Rama|value] → null
    index 3:  undefined
    index 4:  LinkedList → [Sita|value] → null
    ...
    index 15: undefined
]
```

---

## 3. Konsep Penting: Kenapa Bucket Bisa Langsung Diperlakukan Sebagai LinkedList?

Ini pertanyaan yang sangat bagus! Jawabannya ada di method `set()`:

```javascript
set(key, value) {
    const data = new LinkedList();         // ← LinkedList BARU dibuat
    // ...
    if (currentBuckets[hashKey] === undefined) {
        currentBuckets[hashKey] = data;    // ← disimpan ke bucket
    }
}
```

### Alurnya:

```
AWAL:   this.buckets[5] = undefined

SETELAH set("Carlos", "value"):
        this.buckets[5] = LinkedList { head: Node { key: "Carlos", ... } }
```

JavaScript adalah bahasa **dynamically typed** — artinya slot array tidak punya tipe tetap. Slot yang tadinya `undefined` bisa diganti jadi object `LinkedList`, dan JavaScript **tetap ingat** bahwa object tersebut punya semua method LinkedList (`append()`, `size()`, `find()`, dll).

### Konsep: Duck Typing

> "If it walks like a duck and quacks like a duck, it's a duck."

JavaScript tidak peduli tipe apa yang dideklarasikan. Yang penting: **object ini punya method apa?** Selama `bucket` punya method `size()`, kamu bisa panggil `bucket.size()`.

---

## 4. Konsep Penting: Array Indexing & `entry[0]`, `entry[1]`

### Bagaimana Array Indexing Bekerja

Array di JavaScript dimulai dari **index 0**:

```javascript
let buah = ["apel", "jeruk", "mangga"];
//           [0]      [1]      [2]

buah[0]  // → "apel"
buah[1]  // → "jeruk"
buah[2]  // → "mangga"
```

### Kenapa `entry[0]` = Key dan `entry[1]` = Value?

Method `getEntries()` di LinkedList membuat array pair seperti ini:

```javascript
// getEntries() di LinkedList
getEntries() {
    while (temp) {
        entry.push([temp.key, temp.value]);
        //         ↑ ini membuat array baru [key, value]
        //         index:                    [0]   [1]
    }
}
```

Jadi setiap entry adalah **array dengan 2 elemen**:

```javascript
entry = ["apple", "red"]
//        [0]      [1]
//        ↑key     ↑value

entry[0]  // → "apple"  (KEY)
entry[1]  // → "red"    (VALUE)
```

### Trace Lengkap di `entries()` dan `resize()`

```javascript
// entries() return:
[
    ["apple", "red"],       // entry index 0
    ["banana", "yellow"],   // entry index 1
    ["carrot", "orange"],   // entry index 2
]

// Di resize(), kita loop setiap entry:
for (let entry of currentEntries) {
    // Iterasi 1: entry = ["apple", "red"]
    //            entry[0] = "apple"  ← KEY
    //            entry[1] = "red"    ← VALUE
    this.set(entry[0], entry[1]);
    // → this.set("apple", "red")

    // Iterasi 2: entry = ["banana", "yellow"]
    //            entry[0] = "banana"  ← KEY
    //            entry[1] = "yellow"  ← VALUE
    this.set(entry[0], entry[1]);
    // → this.set("banana", "yellow")

    // ...dan seterusnya
}
```

---

## 5. Konsep Penting: `for...in` vs `for...of`

Ini salah satu kesalahan yang paling sering terjadi di JavaScript!

### `for...in` → Mengambil **INDEX / KEY** (sebagai string)

```javascript
let arr = ["apel", "jeruk", "mangga"];

for (let item in arr) {
    console.log(item);
}
// Output: "0", "1", "2"  ← INDEX sebagai STRING, bukan isi array!
```

### `for...of` → Mengambil **VALUE / ISI**

```javascript
let arr = ["apel", "jeruk", "mangga"];

for (let item of arr) {
    console.log(item);
}
// Output: "apel", "jeruk", "mangga"  ← ISI array!
```

### Kapan Pakai Yang Mana?

| | `for...in` | `for...of` |
|---|---|---|
| Mengambil | index / property name | value / isi |
| Cocok untuk | Object `{}` | Array `[]`, String, Map, Set |
| Return type | String | Tergantung isi |

> **Aturan simpel:** Untuk **Array**, hampir selalu pakai `for...of`.

---

## 6. Konsep Penting: `push()` vs `flat()` vs Spread `...`

### Masalah: Nested Array

```javascript
let result = [];
let data1 = ["Carlos", "Rama"];   // dari bucket 1
let data2 = ["Mara"];             // dari bucket 2

result.push(data1);  // result = [["Carlos", "Rama"]]      ← nested!
result.push(data2);  // result = [["Carlos", "Rama"], ["Mara"]]  ← masih nested!
```

`push()` memasukkan **seluruh array sebagai 1 elemen**.

### Solusi 1: `.flat()` di akhir

```javascript
result.flat();
// → ["Carlos", "Rama", "Mara"]  ← sudah rata!
```

### Solusi 2: Spread operator `...`

```javascript
result.push(...data1);  // sama dengan: result.push("Carlos", "Rama")
result.push(...data2);  // sama dengan: result.push("Mara")
// result = ["Carlos", "Rama", "Mara"]  ← langsung rata!
```

### Perbandingan

| Cara | Kelebihan | Kekurangan |
|---|---|---|
| `.flat()` | Mudah dibaca | Membuat array baru di akhir |
| `...spread` | Lebih efisien | Sedikit lebih sulit dibaca |

---

## 7. Konsep Penting: Auto-Resize (Load Factor)

### Kenapa Perlu Resize?

Semakin banyak data → semakin sering collision → LinkedList makin panjang → pencarian makin lambat.

### Kapan Resize?

```
Load Factor = jumlah entries / capacity

Jika load factor > 0.75 → resize!

Contoh:
- capacity = 16, entries = 12
- 12 / 16 = 0.75 → belum resize
- Tambah 1 entry → 13 / 16 = 0.8125 > 0.75 → RESIZE!
```

### Proses Resize

```
1. SIMPAN semua data (entries) yang ada sekarang
2. DOUBLE capacity (16 → 32)
3. RESET buckets ke array baru yang kosong
4. RE-HASH semua data ke buckets baru
```

### Kenapa Harus Re-hash?

Karena `hash()` pakai `% this.capacity`:

```javascript
// Capacity 16:
"Carlos" → hashCode % 16 = 5    ← posisi lama

// Capacity 32:
"Carlos" → hashCode % 32 = 21   ← posisi BARU!
```

Posisi data berubah karena capacity berubah, jadi **semua data harus di-set() ulang**.

### Kode Resize

```javascript
resize() {
    // 1. Simpan semua entries
    const currentEntries = this.entries();

    // 2. Double capacity
    this.capacity = this.capacity * 2;

    // 3. Reset buckets
    this.buckets = new Array(this.capacity);

    // 4. Re-hash semua data
    for (let entry of currentEntries) {
        this.set(entry[0], entry[1]);
        //       ↑ key     ↑ value
    }
}
```

---

## 8. Pola Traversal LinkedList

Hampir semua method di LinkedList menggunakan **pola yang sama**:

```javascript
let temp = this.head;      // mulai dari head

while (temp) {             // selama masih ada node
    // lakukan sesuatu dengan temp.key / temp.value
    temp = temp.next;      // pindah ke node berikutnya
}
```

### Visualisasi:

```
Iterasi 1: temp = Node("Carlos")  → proses → temp = temp.next
Iterasi 2: temp = Node("Rama")    → proses → temp = temp.next
Iterasi 3: temp = null            → while(null) = false → STOP
```

### Variasi Penggunaan Pola Ini:

| Method | Yang dilakukan di dalam while |
|---|---|
| `size()` | `counter++` (hitung jumlah node) |
| `getKeys()` | `keys.push(temp.key)` (kumpulkan key) |
| `getValues()` | `values.push(temp.value)` (kumpulkan value) |
| `getEntries()` | `entry.push([temp.key, temp.value])` (kumpulkan pair) |
| `find(key)` | Cek `if (key === temp.key)` lalu return value |
| `updateKey()` | Cek `if (key === temp.key)` lalu update value |

---

## 9. Pelajaran yang Didapat (Bug & Kesalahan)

### ❌ Variabel yang tidak berguna

```javascript
// BURUK - bikin variabel yang langsung di-overwrite
let data = new LinkedList();
data = currentBuckets;          // ← LinkedList baru langsung dibuang
return data.find(key);

// BAIK - langsung pakai yang dibutuhkan
return currentBuckets.find(key);
```

> **Tips kerja:** Di code review, reviewer pasti tanya "kenapa bikin object baru kalau langsung ditimpa?"

### ❌ Typo variabel

```javascript
let counter = 0;
// ...
count++;        // ← "count" bukan "counter"!
return counter; // ← selalu return 0
```

> **Tips kerja:** Gunakan nama variabel yang konsisten. IDE biasanya bisa mendeteksi variabel yang tidak terdefinisi.

### ❌ `for...in` vs `for...of`

```javascript
for (let bucket in this.buckets) { }  // ❌ bucket = "0", "1", "2" (string)
for (let bucket of this.buckets) { }  // ✅ bucket = LinkedList object
```

### ❌ `push()` nested array

```javascript
key.push(bucket.getKeys());           // ❌ push array sebagai 1 elemen
key.push(...bucket.getKeys());        // ✅ spread elements
// atau
return key.flat();                     // ✅ flatten di akhir
```

---

## 10. Ringkasan Semua Method

### HashMap Methods

| Method | Input | Output | Deskripsi |
|---|---|---|---|
| `hash(key)` | string | number | Menghasilkan index dari key |
| `set(key, value)` | string, any | void | Menyimpan/update data |
| `get(key)` | string | any \| null | Mengambil value dari key |
| `has(key)` | string | boolean | Cek apakah key ada |
| `remove(key)` | string | boolean | Hapus entry berdasarkan key |
| `length()` | - | number | Jumlah total entries |
| `clear()` | - | void | Hapus semua entries |
| `keys()` | - | string[] | Semua key yang tersimpan |
| `values()` | - | any[] | Semua value yang tersimpan |
| `entries()` | - | [key, value][] | Semua pair key-value |
| `resize()` | - | void | Double capacity & re-hash |

### LinkedList Methods

| Method | Input | Output | Deskripsi |
|---|---|---|---|
| `append(key, value)` | string, any | void | Tambah node baru di akhir |
| `updateKey(key, value)` | string, any | boolean | Update value jika key cocok |
| `find(key)` | string | any \| null | Cari value berdasarkan key |
| `removedEntry(key)` | string | boolean | Hapus node berdasarkan key |
| `size()` | - | number | Jumlah node dalam list |
| `getKeys()` | - | string[] | Semua key dalam list |
| `getValues()` | - | any[] | Semua value dalam list |
| `getEntries()` | - | [key, value][] | Semua pair dalam list |

---

## 11. Diagram Arsitektur

```
                        HashMap
                          │
            ┌─────────────┼─────────────┐
            │             │             │
         hash()        set()        resize()
            │             │             │
            ▼             ▼             ▼
    key → hashCode   buckets[hash]   entries() → simpan
      % capacity         │          capacity ×2
                         ▼          buckets = new
                    LinkedList      set() ulang semua
                    ┌─────┐
                    │head │
                    └──┬──┘
                       ▼
                  ┌─────────┐     ┌─────────┐
                  │ Node 1  │────▶│ Node 2  │────▶ null
                  │ key     │     │ key     │
                  │ value   │     │ value   │
                  │ next ───┤     │ next ───┤
                  └─────────┘     └─────────┘
```

---

> 📝 **Sumber:** The Odin Project — [JavaScript HashMap](https://www.theodinproject.com/lessons/javascript-hashmap)
>
> 📅 **Tanggal dibuat:** 17 Juli 2026
