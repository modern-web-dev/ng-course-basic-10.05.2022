import {Component, OnDestroy} from '@angular/core';
import {Book} from "../../model/book";
import {BookService} from "../../services/book.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnDestroy {

  selectedBook: Book | undefined;

  books: Book[] = [];

  private readonly booksSubscription: Subscription;

  constructor(private readonly bookService: BookService) {
    console.log('BookList component is created!');
    this.booksSubscription = this.bookService.books$.subscribe(newBooks => {
      console.log('new books has arrived!');
      this.books = newBooks
    });
  }

  ngOnDestroy(): void {
    this.booksSubscription.unsubscribe();
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
