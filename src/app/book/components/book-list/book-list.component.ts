import {Component, OnInit} from '@angular/core';
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
    year: 1960
  }, {
    title: '2001: A Space Odyssey',
    author: 'Arthur C. Clarke',
    year: 1968
  }, {
    title: 'Ubik',
    author: 'Philip K. Dick',
    year: 1960
  }
  ];

  selectedBook: Book | null = null;

  constructor() {
  }

  selectBook(aBook: Book): void {
    this.selectedBook = { ...aBook };
  }
}
