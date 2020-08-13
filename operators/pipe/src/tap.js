const { of } = require("rxjs");
const { tap, pluck } = require("rxjs/operators");

const createObject = (a, b) => ({ a, b });

const obs2 = of(
  createObject(1, 2),
  createObject(4, 2),
  createObject(7, 2),
  createObject(9, 2)
);

obs2.pipe(tap(console.log), pluck("b"), tap(console.log)).subscribe();
