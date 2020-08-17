import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { fromEvent, Observable, of } from 'rxjs';
import { map, debounceTime, switchMap, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('searchInput') searchInput: ElementRef<HTMLInputElement>;
  title = 'fromEvent';
  jsonTitle: string = '';
  eventHandler$: Observable<string>;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    console.log(this.searchInput.nativeElement.value);
    this.setupFromEvent();
  }

  private setupFromEvent() {
    this.eventHandler$ = fromEvent(
      this.searchInput.nativeElement,
      'input'
    ).pipe(
      map((e) => e.target as HTMLInputElement),
      map((input) => input.value),
      debounceTime(500),
      switchMap((_val) => {
        return this.http.get('https://jsonplaceholder.typicode.com/todos/1');
      }),
      map((response) => (response as any).title)
    );
  }

  constructor(private http: HttpClient) {}
}
