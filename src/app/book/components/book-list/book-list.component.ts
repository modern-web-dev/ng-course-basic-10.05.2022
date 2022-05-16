import {Component, OnDestroy} from '@angular/core';
import {Book} from "../../model/book";
import {BookService} from "../../services/book.service";
import {delay, Observable, tap} from "rxjs";
import {SpinnerService} from "../../../shared/services/spinner.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnDestroy {

  selectedBook: Book | undefined = undefined;

  readonly books$: Observable<Book[]>;

  constructor(
    private readonly bookService: BookService,
    private readonly spinnerService: SpinnerService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
    ) {
    console.log('BookList component is created!');
    this.books$ = this.bookService.books$.pipe(
      delay(0),
      tap(() => this.spinnerService.show()),
      delay(1000),
      tap(() => this.spinnerService.hide())
    );

    // 2nd option
    // setTimeout(() => {
    //   this.books$ = this.bookService.books$.pipe(
    //     tap(() => this.spinnerService.show()),
    //     delay(1000),
    //     tap(() => this.spinnerService.hide())
    //   );
    // });
  }

  ngOnDestroy(): void {
  }

  async selectBook(book: Book) {
    this.selectedBook = { ...book };
    await this.router.navigate([book.id], {
      relativeTo: this.activatedRoute
    });
  }

  cancel(): void {
    this.selectedBook = undefined;
  }

  saveBook(book: Book): void {
    this.bookService.saveBook(book);
    this.selectedBook = undefined;
  }
}
