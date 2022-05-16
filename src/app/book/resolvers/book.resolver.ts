import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  ActivatedRouteSnapshot
} from '@angular/router';
import {Book} from "../model/book";
import {BookService} from "../services/book.service";

@Injectable({
  providedIn: 'root'
})
export class BookResolver implements Resolve<Book | undefined> {

  constructor(private readonly router: Router, private readonly bookService: BookService) {
  }

  resolve(route: ActivatedRouteSnapshot): Book | undefined {
    const bookId = route.paramMap.get('bookId');
    if (bookId) {
      return this.bookService.getBookById(Number.parseInt(bookId));
    } else {
      return undefined;
    }
  }
}
