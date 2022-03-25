import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  ActivatedRouteSnapshot
} from '@angular/router';
import {Book} from "../../model/book";

@Injectable({
  providedIn: 'root'
})
export class BookResolver implements Resolve<Book | undefined> {

  constructor(private readonly router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot): Book | undefined {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state && state['book']) {
      return state['book'];
    } else {
      return undefined;
    }
  }
}
