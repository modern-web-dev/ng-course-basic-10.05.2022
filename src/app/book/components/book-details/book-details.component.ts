import {Component, Input} from '@angular/core';
import {Book} from "../../model/book";

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent {

  @Input()
  book: Book | undefined;

  constructor() { }

  cancel(): void {
    this.book = {
      title: 'Solaris',
      author: 'Stanislaw Lem',
      publishYear: 1960
    };
  }

  save(): void {
    console.log(this.book);
  }
}
