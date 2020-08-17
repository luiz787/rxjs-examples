const { of, interval } = require("rxjs");
const { delay, takeUntil } = require("rxjs/operators");

const notifier = of("Dummy value").pipe(delay(1500));

/*
takeUntil receives another "notifier" observable as an argument,
and returns a new observable that completes as soon as the
"notifier" emits it's first value.
In this example, values$ will emit values every 100ms,
and as soon as "notifier" emits (after 1500ms),
values$ will complete.
*/
const values$ = interval(100).pipe(takeUntil(notifier));

values$.subscribe(console.log);
