import {Component, OnDestroy} from '@angular/core';
import {Book} from "../../model/book";
import {BookService} from "../../services/book.service";
import {delay, Observable, Subscription, tap} from "rxjs";
import {SpinnerService} from "../../../shared/services/spinner.service";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnDestroy {

  selectedBook: Book | undefined;

  readonly books$: Observable<Book[]>;

  constructor(private readonly bookService: BookService, private readonly spinnerService: SpinnerService) {
    console.log('BookList component is created!');
    this.books$ = this.bookService.books$.pipe(
      tap(() => this.spinnerService.show()),
      delay(1000),
      tap(() => this.spinnerService.hide())
    );
  }

  ngOnDestroy(): void {
  }

  selectBook(book: Book): void {
    this.selectedBook = book;
  }

  cancel(): void {
    this.selectedBook = undefined;
  }

  saveBook(book: Book): void {
    this.bookService.saveBook(book);
    this.selectedBook = undefined;
  }
}
