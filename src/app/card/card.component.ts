import { Component, Input } from '@angular/core';
import { EMPTY, Observable, catchError, isObservable, of, switchMap, throwError } from 'rxjs';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input()
  title: string = ""

  @Input()
  details: string = ""

  @Input()
  testObservable: Observable<any>;

  @Input()
  isDeprecated: boolean = false;

  @Input()
  snippet: string = ``;

  output: any[] = [];

  testRun() {
    this.output = [];
    if(this.testObservable) {
      this.testObservable.subscribe(resp => {
        this.output.push(resp);
      });
    }
  }

  typeofObj(obj: any) {
    return typeof obj;
  }

}
