const arr1 = [
  "One",
  "Two",
  "Three",
  false,
  10,
  ["Test A", "Test B"],
  {
    a: 1,
    b: 2,
    c: 3,
  },
];
const arr2 = arr1;
// const arr3 = arr1.slice();
// console.log("arr3:", arr3);

console.log("arr1:", arr1);
let val = arr1[0] as any;
val = arr1.length;
// val = arr1[5][1];
// console.log("val:", val);

// arr1.forEach((item, index, arr) => {
//   console.log(item, index, arr);
// });

val = arr1.push("End");
val = arr1.pop();
val = arr1.unshift("Start", "TWO");
val = arr1.shift();
val = arr1.indexOf("Oneq");
val = arr1.splice(2, 1);
val = arr1.slice(1, 4);

console.log(arr1);
console.log(val);
