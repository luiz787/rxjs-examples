const { of, interval } = require("rxjs");
const { delay, takeUntil } = require("rxjs/operators");

const notifier = of("Dummy value").pipe(delay(1500));

const values$ = interval(100);

values$.subscribe(console.log);
