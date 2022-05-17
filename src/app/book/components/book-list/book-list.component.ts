import {Component, OnDestroy} from '@angular/core';
import {Book} from "../../model/book";
import {SpinnerService} from "../../../shared/services/spinner.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl} from "@angular/forms";
import {debounceTime, filter, map, Subject, Subscription, switchMap, takeUntil, tap} from "rxjs";
import {BookService} from "../../services/book.service";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnDestroy {

  books: Book[];

  readonly searchFormControl: FormControl;
  private readonly unsubscribe = new Subject<void>();

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly bookService: BookService
    ) {
    console.log('BookList component is created!');
    const resolvedBooks = this.activatedRoute.snapshot.data['books'];
    this.books = resolvedBooks ? resolvedBooks : [];
    this.searchFormControl = new FormControl('');
    this.searchFormControl.valueChanges.pipe(
      takeUntil(this.unsubscribe),
      debounceTime(500),
      filter(query => query.length > 1),
      tap(query => console.log(query)),
      switchMap(query => this.bookService.findBooks(query))
    ).subscribe(books => this.books = books);
  }

  async selectBook(book: Book) {
    await this.router.navigate([book.id], {
      relativeTo: this.activatedRoute
    });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
