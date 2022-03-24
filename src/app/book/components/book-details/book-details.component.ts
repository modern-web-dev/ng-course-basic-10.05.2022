import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {Book} from "../../model/book";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  readonly bookForm: FormGroup;

  private readonly id: FormControl;
  private readonly title: FormControl;
  private readonly author: FormControl;
  private readonly year: FormControl;

  @Input()
  book: Book | undefined | null;

  @Output()
  readonly bookSaved = new EventEmitter<Book>();

  @Output()
  readonly cancelClicked = new EventEmitter();

  constructor() {

    console.log(`BookDetailsComponent constructor phase, book=${this.book}`)

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

  ngOnInit(): void {
    console.log(`BookDetailsComponent onInit phase, book=${this.book}`);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(`BookDetailsComponent onChanges phase, book=${this.book}`);
    console.log(changes);
    // form controls init
    if (this.book && changes['book']) {
      // this.title.setValue(value.title);
      // this.author.setValue(value.author);
      // this.year.setValue(value.year);
      this.bookForm.setValue(this.book);
    }
  }

  ngAfterViewInit(): void {
    console.log(`BookDetailsComponent afterViewInit phase`);
  }

  ngOnDestroy(): void {
    console.log('BookDetailsComponent onDestroy phase');
  }

  saveBook() {
    this.bookSaved.emit(this.bookForm.value);
  }
}
