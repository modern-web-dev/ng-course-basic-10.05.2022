import {Component} from '@angular/core';
import {Book} from "../../model/book";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent {

  books: Book[] = [{
    title: 'Solaris',
    author: 'Stanislaw Lem',
    publishYear: 1960
  }, {
    title: '2001: A Space Odyssey',
    author: 'Arthur C. Clarke',
    publishYear: 1968
  }, {
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
}
