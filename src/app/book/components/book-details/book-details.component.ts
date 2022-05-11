import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Book} from "../../model/book";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent {

  readonly bookFormGroup: FormGroup;

  private readonly id: FormControl;
  private readonly title: FormControl;
  private readonly author: FormControl;
  private readonly publishYear: FormControl;

  @Input()
  get book() {
    return this.internalBook;
  }
  set book(value: Book | undefined) {
    this.internalBook = value !== undefined ? {...value} : undefined;
    if (value) {
      this.bookFormGroup.setValue(value);
    }
  }

  private internalBook: Book | undefined;

  @Output()
  readonly saveClicked = new EventEmitter<Book>();

  @Output()
  readonly cancelClicked = new EventEmitter();

  constructor() {
    this.title = new FormControl();
    this.author = new FormControl();
    this.publishYear = new FormControl();
    this.id = new FormControl();

    this.bookFormGroup = new FormGroup({
      id: this.id,
      title: this.title,
      author: this.author,
      publishYear: this.publishYear
    });
  }

  cancel(): void {
    this.cancelClicked.emit();
  }

  save(): void {
    this.saveClicked.emit(this.bookFormGroup.value);
  }
}
