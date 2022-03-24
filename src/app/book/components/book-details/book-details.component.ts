import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Book} from "../../model/book";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent {

  readonly bookForm: FormGroup;

  private readonly id: FormControl;
  private readonly title: FormControl;
  private readonly author: FormControl;
  private readonly year: FormControl;

  @Input()
  get book() {
    return this._book;
  }
  set book(value: Book | undefined | null) {
    this._book = value ? { ...value } : value;
    // form controls init
    if (value) {
      // this.title.setValue(value.title);
      // this.author.setValue(value.author);
      // this.year.setValue(value.year);
      this.bookForm.setValue({...value});
    }
  }

  private _book: Book | undefined | null;

  @Output()
  readonly bookSaved = new EventEmitter<Book>();

  @Output()
  readonly cancelClicked = new EventEmitter();

  constructor() {
    this.id = new FormControl();
    const title = new FormControl();
    this.title = title;
    this.author = new FormControl();
    this.year = new FormControl();

    this.bookForm = new FormGroup({
      id: this.id,
      title, // this is nice syntax shortcut to specify object props
      author: this.author,
      year: this.year
    });
  }

  saveBook() {
    this.bookSaved.emit(this.bookForm.value);
  }
}
