import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Book} from "../../model/book";

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent {

  @Input()
  get book() {
    return this._book;
  }
  set book(value: Book | undefined | null) {
    this._book = value ? { ...value } : value;
  }

  private _book: Book | undefined | null;

  @Output()
  readonly bookSaved = new EventEmitter<Book>();

  @Output()
  readonly cancelClicked = new EventEmitter();

  constructor() {
  }

  saveBook() {
    if (this.book) {
      this.bookSaved.emit({ ...this.book });
    }
  }
}
