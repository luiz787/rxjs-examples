const { of, EMPTY } = require("rxjs");
const { catchError, tap, map } = require("rxjs/operators");

const obs = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

obs
  .pipe(
    tap((val) => {
      if (val === 8) {
        throw new Error("8 is not allowed");
      }
    }),
    map((val) => val * 2),
    catchError((err) => {
      console.log(err.message);
      return EMPTY;
    })
  )
  .subscribe(console.log);
