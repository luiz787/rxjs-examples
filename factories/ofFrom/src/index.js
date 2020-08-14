const { of, from, timer } = require("rxjs");
const { map, take } = require("rxjs/operators");

const myObservable = of(1, 2, 3, 4, 5);
myObservable.subscribe((val) => {
  console.log(`of: ${val}`);
});

const array$ = from([6, 7, 8, 9, 10]);
array$.subscribe((val) => {
  console.log(`from array: ${val}`);
});

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(100);
  }, 2000);
});

promise.then((val) => {
  console.log(`promise.then: ${val}`);
});

from(promise).subscribe((val) => {
  console.log(`from promise: ${val}`);
});

const timer$ = timer(1000, 500).pipe(take(5));
timer$.subscribe((val) => {
  console.log(`timer: ${val}`);
});
