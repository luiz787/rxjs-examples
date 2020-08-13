const { of } = require("rxjs");
const { distinctUntilChanged, pluck } = require("rxjs/operators");

const obs = of(9, 9, 9, 9, 8, 8, 8, 8, 7, 7, 6, 6, 6, 6, 5, 5, 4);

console.log("Numbers");
obs.pipe(distinctUntilChanged()).subscribe(console.log);

const createObject = (a, b) => ({ a, b });

const obs2 = of(
  createObject(1, 2),
  createObject(4, 2),
  createObject(7, 2),
  createObject(9, 2)
);

console.log("Objects");
obs2.pipe(pluck("b"), distinctUntilChanged()).subscribe(console.log);
