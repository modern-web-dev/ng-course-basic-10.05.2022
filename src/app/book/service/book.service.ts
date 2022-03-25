import { Injectable } from '@angular/core';
import {Book} from "../model/book";
import { Observable } from "rxjs";
import {HttpClient} from "@angular/common/http";

const HTTP_PREFIX = '/api/books';

@Injectable()
export class BookService {

  constructor(private readonly http: HttpClient) {
    console.log('book service is created');
  }

  updateBook(updatedBook: Book): Observable<Book> {
    return this.http.put<Book>(`${HTTP_PREFIX}/${updatedBook.id}`, updatedBook);
  }

  getBookById(id: number): Observable<Book | undefined> {
    return this.http.get<Book>(`${HTTP_PREFIX}/${id}`)
  }

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${HTTP_PREFIX}`);
  }

  findBooks(query: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${HTTP_PREFIX}?q=${query}`);
  }
}
