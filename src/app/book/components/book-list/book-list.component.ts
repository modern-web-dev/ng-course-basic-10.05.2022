import {Component} from '@angular/core';
import {Book} from "../../model/book";
import {SpinnerService} from "../../../shared/services/spinner.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent  {

  readonly books: Book[];

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
    ) {
    console.log('BookList component is created!');
    const resolvedBooks = this.activatedRoute.snapshot.data['books'];
    this.books = resolvedBooks ? resolvedBooks : [];
  }

  async selectBook(book: Book) {
    await this.router.navigate([book.id], {
      relativeTo: this.activatedRoute
    });
  }
}
