const { timer } = require("rxjs");
const { reduce, take } = require("rxjs/operators");

const obs = timer(100, 1000);
const sum = (a, b) => a + b;

/*
Reduce can be used to apply a mutable reduction to the observable values, and apply a sum, for example.
However, it does not execute the function on every emission as one might expect.
It executes ONLY when the observable completes.
So we use take to complete the observable after 5 emissions.
*/

obs.pipe(take(5), reduce(sum)).subscribe(console.log);
