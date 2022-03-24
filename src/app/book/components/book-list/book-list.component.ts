import {AfterViewInit, Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
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
export class BookListComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  selectedBook: Book | null = null;
  readonly books$: Observable<Book[]>;

  constructor(private readonly bookService: BookService, private readonly spinnerService: SpinnerService) {

    console.log(`BookListComponent constructor phase`);

    this.spinnerService.show();
    this.books$ = bookService.books$.pipe(
      delay(1000),
      tap(() => this.spinnerService.hide())
    );
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
  }

  selectBook(aBook: Book): void {
    this.selectedBook = { ...aBook };
  }

  saveBook(updatedBook: Book): void {
    console.log(updatedBook);
    this.spinnerService.show();
    this.bookService.updateBook(updatedBook);
    this.selectedBook = null;
  }

  closeBookDetails(): void {
    this.selectedBook = null;
  }
}
