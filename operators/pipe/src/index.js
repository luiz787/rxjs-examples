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
  map(double)(myObservable).subscribe(print);
  myObservable.pipe(map(double)).subscribe(printFromPipe);
})();

(() => {
  const lowerThanSeven = (n) => n < 7;

  filter(lowerThanSeven)(map(double)(myObservable)).subscribe(print);

  myObservable
    .pipe(
      map(double), //
      filter(lowerThanSeven) //
    )
    .subscribe(printFromPipe);
})();
