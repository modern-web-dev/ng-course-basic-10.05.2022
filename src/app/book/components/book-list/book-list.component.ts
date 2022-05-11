import {Component} from '@angular/core';
import {Book} from "../../model/book";
import {BookService} from "../../services/book.service";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent {

  selectedBook: Book | undefined;

  books: Book[] = [];

  constructor(private readonly bookService: BookService) {
    console.log('BookList component is created!');
    this.bookService.books$.subscribe(newBooks => {
      console.log('new books has arrived!');
      this.books = newBooks
    });
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
