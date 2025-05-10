class HashMap {
  constructor() {
    this.loadFactor = 0.8;
    this.capacity = 16;
    this.buckets = new Array(this.capacity);
  }
  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hashCode % this.capacity;
    }

    return hashCode;
  }
  set(key, value) {
    if (this.entries().length > this.capacity * this.loadFactor) {
      this.capacity *= 2;
      const oldBuckets = this.buckets;
      this.buckets = new Array(this.capacity);
      for (let bucket of oldBuckets) {
        if (bucket) {
          for (let [k, v] of bucket) {
            let index = this.hash(k);
            if (!this.buckets[index]) {
              this.buckets[index] = [];
            }
            this.buckets[index].push([k, v]);
          }
        }
      }
    }

    let currentIndex = this.hash(key);
    if (!this.buckets[currentIndex]) {
      this.buckets[currentIndex] = [];
    }
    for (let i = 0; i < this.buckets[currentIndex].length; i++) {
      if (this.buckets[currentIndex][i][0] === key) {
        this.buckets[currentIndex][i][1] = value;
        return;
      }
    }
    this.buckets[currentIndex].push([key, value]);
  }
  get(key) {
    let currentIndex = this.hash(key);
    let count = 0;
    if (!this.buckets[currentIndex]) {
      return null;
    }
    while (count < this.buckets[currentIndex].length) {
      if (this.buckets[currentIndex][count][0] === key) {
        return this.buckets[currentIndex][count][1];
      }
      count++;
    }
    return null;
  }
  has(key) {
    for (let i = 0; i < this.buckets.length; i++) {
      if (!this.buckets[i]) {
        continue;
      }
      for (let j = 0; j < this.buckets[i].length; j++) {
        if (this.buckets[i][j][0] === key) return true;
      }
    }
    return false;
  }
  remove(key) {
    let isPresent = false;
    let currentIndex = this.hash(key);
    if (!this.buckets[currentIndex]) {
      isPresent = false;
      return isPresent;
    }
    for (let i = 0; i < this.buckets[currentIndex].length; i++) {
      if (this.buckets[currentIndex][i][0] === key) {
        this.buckets[currentIndex].splice(i, 1);
        isPresent = true;
      }
    }
    if (this.buckets[currentIndex].length === 0) {
      delete this.buckets[currentIndex];
    }
    return isPresent;
  }
  length() {
    let length = 0;
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i]) {
        length += this.buckets[i].length;
      }
    }
    return length;
  }
  clear() {
    for (let i = 0; i < this.buckets.length; i++) {
      delete this.buckets[i];
    }
  }

  keys() {
    let keys = [];
    for (let i = 0; i < this.buckets.length; i++) {
      if (!this.buckets[i]) {
        continue;
      }
      for (let j = 0; j < this.buckets[i].length; j++) {
        keys.push(this.buckets[i][j][0]);
      }
    }
    return keys;
  }
  values() {
    let values = [];
    for (let i = 0; i < this.buckets.length; i++) {
      if (!this.buckets[i]) {
        continue;
      }
      for (let j = 0; j < this.buckets[i].length; j++) {
        values.push(this.buckets[i][j][1]);
      }
    }
    return values;
  }
  entries() {
    let entries = [];
    for (let i = 0; i < this.buckets.length; i++) {
      if (!this.buckets[i]) {
        continue;
      }
      for (let j = 0; j < this.buckets[i].length; j++) {
        entries.push(this.buckets[i][j]);
      }
    }
    return entries;
  }
}

let hashMap = new HashMap();
