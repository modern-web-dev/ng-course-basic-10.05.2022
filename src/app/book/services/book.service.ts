import { Injectable } from '@angular/core';
import {Book} from "../model/book";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

const URL_PREFIX = '/api/books';

@Injectable()
export class BookService {

  constructor(private readonly http: HttpClient) {
    console.log('BookService created!');
  }

  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`${URL_PREFIX}/${id}`);
  }

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(URL_PREFIX);
  }

  saveBook(book: Book): Observable<Book> {
    return this.http.put<Book>(`${URL_PREFIX}/${book.id}`, book);
  }
}
