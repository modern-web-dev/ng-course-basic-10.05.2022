import { Injectable } from '@angular/core';
import {Book} from "../model/book";
import {BehaviorSubject, Observable, Subject} from "rxjs";

@Injectable()
export class BookService {

  private books: Book[] = [{
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

  readonly books$ = new BehaviorSubject<Book[]>(this.books);

  constructor() {
    console.log('book service is created');
  }

  updateBook(updatedBook: Book): void {
    this.books = this.books.map(current => current.id === updatedBook.id ? updatedBook : current);
    this.books$.next(this.books);
  }

  getBookById(id: number): Book | undefined {
    const bookId = this.books.findIndex(value => value.id === id);
    return bookId >= 0 ? this.books[bookId] : undefined;
  }
}
