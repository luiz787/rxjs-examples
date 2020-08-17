const { of } = require("rxjs");
const { map, filter } = require("rxjs/operators");

const printFromPipe = (n) => {
  console.log(`From pipe: ${n}`);
};

const print = (n) => {
  console.log(`From composition: ${n}`);
};

const double = (n) => n * 2;

const myObservable = of(1, 2, 3, 4, 5);

(() => {
  /*
  Pìpe is just syntax sugar to compose operators.
  As shown in the example below, we could use the 'map' operator without using pipe at all.
  */
  
  map(double)(myObservable).subscribe(print);
  myObservable.pipe(map(double)).subscribe(printFromPipe);
})();

(() => {
  const lowerThanSeven = (n) => n < 7;

  /*
  However, pipe really shines when we deal with multiple operators.
  Without using pipe, the operator composition code is really tricky to read and reason about.
  */
 
  filter(lowerThanSeven)(map(double)(myObservable)).subscribe(print);

  myObservable
    .pipe(
      map(double), //
      filter(lowerThanSeven),
      filter(Boolean)
    )
    .subscribe(printFromPipe);
})();
