import { Injectable } from '@angular/core';
import {Book} from "../model/book";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable()
export class BookService {

  private books: Book[] = [{
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

  private readonly booksSubject = new BehaviorSubject<Book[]>(this.books);

  readonly books$: Observable<Book[]> = this.booksSubject;

  constructor() {
    console.log('BookService created!');
  }

  getAllBooks(): Book[] {
    // lack of defensive copy!
    return this.books;
  }

  saveBook(book: Book): void {
    this.books = this.books.map(current => current.id === book.id ? {...book} : current);
    this.booksSubject.next(this.books);
  }
}
