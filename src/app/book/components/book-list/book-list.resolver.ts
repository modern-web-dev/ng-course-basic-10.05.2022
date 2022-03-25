import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import {Book} from "../../model/book";
import {BookService} from "../../service/book.service";

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
