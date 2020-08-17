const { of, from, timer, interval } = require("rxjs");
const { take } = require("rxjs/operators");

// Creating observables from variable amount of values with of
const myObservable = of(1, 2, 3, 4, 5);
myObservable.subscribe((val) => {
  console.log(`of: ${val}`);
});

// Creating observables from an array using from
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

// From can also be used to create an observable from a promise
from(promise).subscribe((val) => {
  console.log(`from promise: ${val}`);
});

// Without take, the interval and timer observables would run indefinitely.
const interval$ = interval(1000).pipe(take(10));
interval$.subscribe((val) => {
  console.log(`interval: ${val}`);
});

const timer$ = timer(1000, 1000).pipe(take(10));
timer$.subscribe((val) => {
  console.log(`timer: ${val}`);
});
