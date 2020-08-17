const { Subject, Observable, ReplaySubject, BehaviorSubject } = require("rxjs");
const { publish } = require("rxjs/operators");

/*
Observables are cold and unicast by default.
They don't emit a value until someone subscribes to them, and they don't emit the same values to all subscribers.
In this example, each observer will get a different value.
*/
(() => {
  const obs = Observable.create((observer) => {
    observer.next(Math.random());
  });

  obs.subscribe((val) => {
    console.log(`Observable subscription 1: ${val}`);
  });

  obs.subscribe((val) => {
    console.log(`Observable subscription 2: ${val}`);
  });
})();

/*
Subjects, unlike observables, are multicast by default.
In the example below, both the observers will get the same value.
Subjects also allow for pushing values on demand with the 'next' function.
*/
(() => {
  const subject = new Subject();

  subject.subscribe((val) => {
    console.log(`Subject subscriber 1 got ${val}`);
  });

  subject.subscribe((val) => {
    console.log(`Subject subscriber 2 got ${val}`);
  });
  subject.next(Math.random());

  setTimeout(() => {
    subject.next(3);
    subject.next(4);
    subject.next(5);
  }, 5000);
})();

/*
Hot observables

Observables can be "published" and become hot / multicast.
*/
(() => {
  const obs = Observable.create((observer) => {
    observer.next(Math.random());
  });
  const published = obs.pipe(publish());

  published.subscribe((val) => {
    console.log(`Observable subscription 1: ${val}`);
  });

  published.subscribe((val) => {
    console.log(`Observable subscription 2: ${val}`);
  });

  setTimeout(() => {
    published.connect();
  }, 2000);
})();

/*
BehaviorSubject is a specialization of Subject, and always holds a reference to the last
value emitted. You can also pass an initial value to it's constructor.
*/
(() => {
  const behaviorSubject = new BehaviorSubject(3);

  behaviorSubject.subscribe((val) => {
    console.log(`BehaviorSubject subscriber: ${val}`);
  });

  behaviorSubject.next(1);
  behaviorSubject.next(2);

  console.log(
    `BehaviorSubject can be accessed synchronously: ${behaviorSubject.value}`
  );
})();

/*
ReplaySubject is also a specialization of Subject, and it allows for new subscribers to
be notified of past emissions.
*/
(() => {
  const replaySubject = new ReplaySubject();

  replaySubject.next(Math.random());
  replaySubject.next(Math.random());
  replaySubject.next(Math.random());

  replaySubject.subscribe((val) => {
    console.log(`ReplaySubject subscriber 1 got ${val}`);
  });

  replaySubject.subscribe((val) => {
    console.log(`ReplaySubject subscriber 2 got ${val}`);
  });
})();
