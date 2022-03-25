import {AfterViewInit, Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Book} from "../../model/book";
import {BookService} from "../../service/book.service";
import {debounceTime, distinctUntilChanged, filter, firstValueFrom, Subscription, switchMap, tap} from "rxjs";
import {SpinnerService} from "../../../shared/service/spinner.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  providers: []
})
export class BookListComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  books: Book[];
  readonly search: FormControl;
  private readonly subscription: Subscription;

  constructor(
    private readonly bookService: BookService,
    private readonly spinnerService: SpinnerService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute) {

    console.log(`BookListComponent constructor phase`);

    this.search = new FormControl();

    this.subscription = this.search.valueChanges.pipe(
      debounceTime(500), // do not query more often than 500ms
      distinctUntilChanged(), // do not query twice for the same query
      filter(query => query.length > 1), // more than 1 chars needed
      tap(value => console.log(value)), // just log down the query (debug)
      switchMap(query => this.bookService.findBooks(query)) // just convert query to Book[]
    ).subscribe(books => this.books = books);

    this.books = activatedRoute.snapshot.data['books'];
  }

  ngOnInit(): void {
    console.log(`BookListComponent onInit phase`);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(`BookListComponent onChanges phase`);
    console.log(changes);
  }

  ngAfterViewInit(): void {
    console.log(`BookListComponent afterViewInit phase`);
  }

  ngOnDestroy(): void {
    console.log('BookListComponent onDestroy phase');
    this.subscription.unsubscribe();
  }

  async selectBook(aBook: Book) {
    await this.router.navigate([aBook.id], {relativeTo: this.activatedRoute});
  }
}
