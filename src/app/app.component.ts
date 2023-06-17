import { Component } from '@angular/core';
import { Observable, combineLatest, concatAll, forkJoin, interval, map, merge, switchMap, take, tap } from 'rxjs';

interface Circle {
  color: string,
  name: string,
};
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  mergeArray: Circle[] = [];
  forkJoinArray: Circle[] = [];
  combineLatestArray: Circle[] = [];

  trackOne = interval(1000).pipe(take(3));
  trackTwo = interval(500).pipe(take(3));
  trackThree = interval(200).pipe(take(3));

  runMerge() {
    this.mergeArray = [];

    merge(...this.circleObservable()).subscribe((i) => {
      this.mergeArray.push(i);
    });
  }

  runForkJoin() {
    this.forkJoinArray = [];

    

    forkJoin(this.circleObservable()).subscribe((i) => {
      this.forkJoinArray.push(...i);
    });
  }

  runCombineLatest() {
    this.combineLatestArray = [];
    combineLatest(this.circleObservable()).subscribe((i) => {
      this.combineLatestArray.push(...i);
    });
  }

  private circleObservable(): Observable<Circle>[] {
    const uno = this.trackOne.pipe(map((i) => {
      return {
        color: 'red',
        name: i.toString()
      }
    }));

    const dos = this.trackTwo.pipe(map((i) => {
      return {
        color: 'green',
        name: i.toString()
      }
    }));

    const tres = this.trackThree.pipe(map((i) => {
      return {
        color: 'blue',
        name: i.toString()
      }
    }));

    return [uno, dos, tres];
  }

}
