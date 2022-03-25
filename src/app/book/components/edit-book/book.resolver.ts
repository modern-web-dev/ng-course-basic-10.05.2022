import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  ActivatedRouteSnapshot
} from '@angular/router';
import {Book} from "../../model/book";
import {BookService} from "../../service/book.service";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BookResolver implements Resolve<Book | undefined> {

  constructor(private readonly router: Router, private readonly bookService: BookService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Book | undefined> {
    const bookIdStr = route.paramMap.get("bookId");
    if (bookIdStr) {
      const bookId = parseInt(bookIdStr);
      if (!isNaN(bookId)) {
        return this.bookService.getBookById(bookId);
      }
    }
    return of(undefined);
  }
}
