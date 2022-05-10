import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Book} from "../../model/book";

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent {

  @Input()
  book: Book | undefined;

  @Output()
  readonly saveClicked = new EventEmitter<Book>();

  @Output()
  readonly cancelClicked = new EventEmitter();

  constructor() { }

  cancel(): void {
    this.cancelClicked.emit();
  }

  save(): void {
    this.saveClicked.emit(this.book);
  }
}
