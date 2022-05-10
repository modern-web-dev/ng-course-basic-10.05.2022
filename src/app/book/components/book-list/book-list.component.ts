import {Component} from '@angular/core';
import {Book} from "../../model/book";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent {

  books: Book[] = [{
    id: 1,
    title: 'Solaris',
    author: 'Stanislaw Lem',
    publishYear: 1960
  }, {
    id: 2,
    title: '2001: A Space Odyssey',
    author: 'Arthur C. Clarke',
    publishYear: 1968
  }, {
    id: 3,
    title: 'Bladerunner',
    author: 'Philip K. Dick',
    publishYear: 1970
  }];

  selectedBook: Book | undefined;

  constructor() {
  }

  selectBook(book: Book): void {
    this.selectedBook = book;
  }

  cancel(): void {
    this.selectedBook = undefined;
  }

  saveBook(book: Book): void {
    this.books = this.books.map(current => current.id === book.id ? book : current);
    this.selectedBook = undefined;
  }
}
