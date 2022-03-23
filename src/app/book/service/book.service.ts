import { Injectable } from '@angular/core';
import {Book} from "../model/book";

@Injectable({
  providedIn: 'root'
})
export class BookService {

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

  constructor() { }

  updateBook(updatedBook: Book): void {
    this.books = this.books.map(current => current.id === updatedBook.id ? updatedBook : current);
  }
}
