import { KeyValue } from '@angular/common';
import { AfterViewInit, Component, HostListener, OnDestroy } from '@angular/core';
import { Observable, Subject, combineLatest, concatAll, forkJoin, fromEvent, interval, map, merge, of, switchMap, take, takeUntil, tap } from 'rxjs';
import { OPERATORS_INFO, OperatorInfo } from 'src/models';

interface Circle {
  color: string,
  name: string,
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnDestroy {
  operatorsInfo: Record<string, OperatorInfo> = OPERATORS_INFO;
  destroy$: Subject<void> = new Subject();

  pageHeight = 0;

  originalOrder = (a: KeyValue<string, OperatorInfo>, b: KeyValue<string, OperatorInfo>): number => {
    return 0;
  }

  ngAfterViewInit(): void {
    fromEvent(window, "scroll").pipe(takeUntil(this.destroy$)).subscribe((event: Event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
    });

    fromEvent(document, "keydown").pipe(takeUntil(this.destroy$)).subscribe((event: Event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
     this.onScroll(event as KeyboardEvent);
  });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onScroll(event: KeyboardEvent) {
    const { key } = event;

    if(key.toUpperCase().includes("UP")) {
      if(this.pageHeight > 0) {
        this.pageHeight -= window.innerHeight;
      }
    } else if(key.toUpperCase().includes("DOWN")) {
      this.pageHeight += window.innerHeight;
    }

    window.scrollTo({
      top: this.pageHeight
    });
  }
}
