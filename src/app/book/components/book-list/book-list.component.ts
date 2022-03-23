import {Component} from '@angular/core';
import {Book} from "../../model/book";
import {BookService} from "../../service/book.service";
import {delay, Observable, take, tap} from "rxjs";
import {SpinnerService} from "../../../shared/service/spinner.service";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  providers: []
})
export class BookListComponent {
  selectedBook: Book | null = null;
  readonly books$: Observable<Book[]>;

  constructor(private readonly bookService: BookService, private readonly spinnerService: SpinnerService) {
    this.spinnerService.show();
    this.books$ = bookService.books$.pipe(
      delay(1000),
      tap(() => this.spinnerService.hide())
    );
    console.log('Book list is created');
  }

  selectBook(aBook: Book): void {
    this.selectedBook = aBook;
  }

  saveBook(updatedBook: Book): void {
    this.spinnerService.show();
    this.bookService.updateBook(updatedBook);
    this.selectedBook = null;
  }

  closeBookDetails(): void {
    this.selectedBook = null;
  }
}
