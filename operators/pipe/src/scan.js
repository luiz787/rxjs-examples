const { timer } = require("rxjs");
const { scan } = require("rxjs/operators");

const obs = timer(100, 1000);
const sum = (a, b) => a + b;

obs.pipe(scan(sum)).subscribe(console.log);
