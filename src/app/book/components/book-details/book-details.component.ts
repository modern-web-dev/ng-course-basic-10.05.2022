import { Component } from '@angular/core';
import {Book} from "../../model/book";

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent {

  book: Book = {
    title: 'Solaris',
    author: 'Stanislaw Lem',
    year: 1960
  };

  constructor() { }

}
