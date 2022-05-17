import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {Book} from "../model/book";
import {BookService} from "../services/book.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BookListResolver implements Resolve<Book[]> {

  constructor(private readonly bookService: BookService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Book[]> {
    return this.bookService.getAllBooks();
  }
}
