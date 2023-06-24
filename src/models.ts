import { EMPTY, Observable, catchError, combineLatest, concatMap, debounceTime, distinctUntilChanged, forkJoin, fromEvent, interval, map, merge, mergeMap, of, pluck, switchMap, take, tap, throttleTime, zip } from 'rxjs';

export interface Person {
  gender: "male" | "female" | "non-binary",
  name: string,
  age: number,
  birthday: Date,
}

export interface OperatorInfo {
  name: string,
  details: string,
  snippet: string,
  testObservable: Observable<any>,
  bgColor: string,
  isDeprecated?: boolean,
}

export const OPERATORS_INFO: Record<string, OperatorInfo> = {
  'map': {
    name: 'Map',
    details: 'Transforms each value emitted by the source observable by applying a mapping function to it.',
    snippet:
      `const source = of(1, 2, 3);
 const mapped = source.pipe(map(value => value * 2));
`,
    bgColor: 'bg-yellow-200',
    testObservable: of(1, 2, 3).pipe(map(value => value * 2))
  },
  'pluck': {
    name: 'Pluck',
    details: 'Retrieves the value of a specified property from each emitted object in the source observable.',
    isDeprecated: true,
    snippet:
      `const source = of({ name: 'John', age: 30 }, 
                   { name: 'Alice', age: 25 });

const plucked = source.pipe(pluck('name'));`,
    bgColor: 'bg-blue-200',
    testObservable: of({ name: 'John', age: 30 },
      { name: 'Alice', age: 25 }).pipe(pluck('name'))
  },
  'switchMap': {
    name: 'SwitchMap',
    details: 'Maps each value emitted by the source observable to an inner observable and switches to the new inner observable.',
    snippet: 
`const source = of(1, 2, 3);
 const switched = source.pipe(
    switchMap(value => of(value * 10))
 );`,
    bgColor: 'bg-green-200',
    testObservable: of(1, 2, 3).pipe(switchMap(value => of(value * 10)))
  },
  'concatMap': {
    name: 'ConcatMap',
    details: 'Maps each value emitted by the source observable to an inner observable and concatenates the resulting observables.',
    snippet: 
`const source = of(1, 2, 3);
 const concatenated = source.pipe(
    concatMap(value => of(value, value + 1))
 );`,
    bgColor: 'bg-indigo-200',
    testObservable: of(1, 2, 3).pipe(concatMap(value => of(value, value + 1)))
  },
  'mergeMap': {
    name: 'MergeMap',
    details: 'Maps each value emitted by the source observable to an inner observable and merges the resulting observables.',
    snippet: 
`const source = of(1, 2, 3);
 const merged = source.pipe(
    mergeMap(value => of(value, value + 1))
 );`,
    bgColor: 'bg-purple-200',
    testObservable: of(1, 2, 3).pipe(
      mergeMap(value => of(value, value + 1))
   )
  },
  'tap': {
    name: 'Tap',
    details: 'Performs a side effect for each value emitted by the source observable without modifying the emitted values.',
    snippet: 
`const source = of(1, 2, 3);
 const tapped = source.pipe(
    tap(value => console.log('Received value:', value))
 );`,
    bgColor: 'bg-pink-200',
    testObservable: of(1, 2, 3).pipe(
      tap(value => console.log('Received value:', value))
   )
  },
  'debounceTime': {
    name: 'Debounce Time',
    details: 'Delays the emission of values from the source observable until a specified amount of time has passed without any new values.',
    snippet: 
`const source = fromEvent(buttonElement, 'click');
 const debounced = source.pipe(
    debounceTime(1000)
 );`,
    bgColor: 'bg-yellow-200',
    testObservable: fromEvent(document, 'click').pipe(
      debounceTime(1000), take(1)
   )
  },
  'distinctUntilChanged': {
    name: 'Distinct Until Changed',
    details: 'Suppresses consecutive duplicate values emitted by the source observable.',
    snippet: 
`const source = of(1, 1, 2, 2, 3, 3);
 const distinct = source.pipe(
    distinctUntilChanged()
 );`,
    bgColor: 'bg-blue-200',
    testObservable: of(1, 1, 2, 2, 3, 3).pipe(
      distinctUntilChanged()
   )
  },
  'catchError': {
    name: 'Catch Error',
    details: 'Catches errors occurring in the source observable and replaces them with a fallback observable or value.',
    snippet: 
`const source = new Observable<any>(subscriber => {
                  subscriber.next(1);
                  subscriber.next(2);
                  subscriber.error('Error');
                  subscriber.next(3);
                  subscriber.complete();
                });

 const caught = source.pipe(
    catchError(error => of('Fallback'))
 );`,
    bgColor: 'bg-red-200',
    testObservable: new Observable<any>(subscriber => {
      subscriber.next(1);
      subscriber.next(2);
      subscriber.error('Error');
      subscriber.next(3);
      subscriber.complete();
    }).pipe(catchError(error => of('Fallback')))
  },
  'merge': {
    name: 'Merge',
    details: 'Combines multiple observables into one observable by merging their emissions.',
    snippet: 
`const source1 = of(1, 2, 3);
 const source2 = of(4, 5, 6);
 const merged = merge(source1, source2);`,
    bgColor: 'bg-orange-200',
    testObservable: (() => {
      const source1 = of(1, 2, 3);
      const source2 = of(4, 5, 6);
      const merged = merge(source1, source2)

      return merged;
    })()
  },
  'forkJoin': {
    name: 'Fork Join',
    details: 'Waits for all source observables to complete and then combines their last emitted values into an array.',
    snippet:
`const source1 = of(1, 2, 3);
 const source2 = of(4, 5, 6);
 const joined = forkJoin([source1, source2]);`,
    bgColor: 'bg-yellow-200',
    testObservable: (() => {
      const source1 = of(1, 2, 3);
      const source2 = of(4, 5, 6);
      const joined = forkJoin([source1, source2])

      return joined;
    })()
  },
  'combineLatest': {
    name: 'Combine Latest',
    details: 'Combines the latest values from multiple source observables into an array or object.',
    snippet: 
`const source1 = interval(1000).pipe(take(3));
 const source2 = interval(2000).pipe(take(3));
 const combined = combineLatest([source1, source2]);`,
    bgColor: 'bg-green-200',
    testObservable: (() => {
      const source1 = interval(1000).pipe(take(3));
      const source2 = interval(2000).pipe(take(3));
      const combined = combineLatest([source1, source2]);

      return combined;
    })()
  },
  'zip': {
    name: 'Zip',
    details: 'Combines the values from multiple source observables together, emitted in sequence.',
    snippet: 
`const source1 = of('A', 'B', 'C');
 const source2 = of(1, 2, 3);
 const zipped = zip(source1, source2);`,
    bgColor: 'bg-blue-200',
    testObservable: (() => {
      const source1 = of('A', 'B', 'C');
      const source2 = of(1, 2, 3);
      const zipped = zip(source1, source2);

      return zipped;
    })()
  },
  'throttleTime': {
    name: 'Throttle Time',
    details: 'Emits a value from the source observable, then ignores subsequent values for a specified amount of time.',
    snippet:
`const source = fromEvent(buttonElement, 'click');
 const throttled = source.pipe(
    throttleTime(1000)
 );`,
    bgColor: 'bg-purple-200',
    testObservable: fromEvent(document, 'click').pipe(throttleTime(2000), take(1))
  },
};


export const people: Person[] = [
  {
    gender: "male",
    name: "John",
    age: 25,
    birthday: new Date("1998-02-15"),
  },
  {
    gender: "female",
    name: "Emily",
    age: 32,
    birthday: new Date("1991-09-03"),
  },
  {
    gender: "non-binary",
    name: "Alex",
    age: 41,
    birthday: new Date("1982-06-10"),
  },
  {
    gender: "male",
    name: "Michael",
    age: 19,
    birthday: new Date("2004-11-27"),
  },
  {
    gender: "female",
    name: "Sarah",
    age: 37,
    birthday: new Date("1986-08-19"),
  },
  {
    gender: "male",
    name: "David",
    age: 55,
    birthday: new Date("1968-03-08"),
  },
  {
    gender: "non-binary",
    name: "Taylor",
    age: 29,
    birthday: new Date("1994-07-22"),
  },
  {
    gender: "female",
    name: "Olivia",
    age: 42,
    birthday: new Date("1981-04-12"),
  },
  {
    gender: "male",
    name: "Christopher",
    age: 36,
    birthday: new Date("1987-12-02"),
  },
  {
    gender: "non-binary",
    name: "Jordan",
    age: 31,
    birthday: new Date("1992-05-06"),
  },
];

