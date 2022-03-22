import {Component, OnInit} from '@angular/core';
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
    year: 1960
  }, {
    id: 2,
    title: '2001: A Space Odyssey',
    author: 'Arthur C. Clarke',
    year: 1968
  }, {
    id: 3,
    title: 'Ubik',
    author: 'Philip K. Dick',
    year: 1960
  }
  ];

  selectedBook: Book | null = null;

  constructor() {
  }

  selectBook(aBook: Book): void {
    this.selectedBook = aBook;
  }

  saveBook(updatedBook: Book): void {
    this.books = this.books.map(current => current.id === updatedBook.id ? updatedBook : current);
    this.selectedBook = null;
  }

  closeBookDetails(): void {
    this.selectedBook = null;
  }
}
