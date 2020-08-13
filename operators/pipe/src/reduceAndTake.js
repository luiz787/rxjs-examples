const { timer } = require("rxjs");
const { reduce, take } = require("rxjs/operators");

const obs = timer(100, 1000);
const sum = (a, b) => a + b;

obs.pipe(reduce(sum)).subscribe(console.log);
// obs.pipe(take(5), reduce(sum)).subscribe(console.log);
