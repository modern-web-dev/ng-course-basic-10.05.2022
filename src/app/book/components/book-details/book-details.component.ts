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
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";

const myValidator: ValidatorFn = (control: AbstractControl) => {
  const yearFC = control.get('publishYear') as FormControl;
  const authorFC = control.get('author') as FormControl;
  console.log(`${yearFC.value} - ${authorFC.value}`);
  if (authorFC.value.length > 5 && Number.parseInt(yearFC.value) < 2000) {
    return {
      invalidYear: 'For longer authors we need at least Y2000'
    }
  }
  return null;
};

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {

  readonly bookFormGroup: FormGroup;

  private readonly id: FormControl;
  private readonly title: FormControl;
  private readonly author: FormControl;
  private readonly publishYear: FormControl;

  @Input()
  book: Book | undefined;

  @Output()
  readonly saveClicked = new EventEmitter<Book>();

  @Output()
  readonly cancelClicked = new EventEmitter();

  constructor() {
    console.log('Component BookDetails constructed');
    this.title = new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(30)]);
    this.author = new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(40)]);
    this.publishYear = new FormControl('', [
      Validators.required,
      Validators.min(1800),
      Validators.max(2023)
    ]);
    this.id = new FormControl();

    this.bookFormGroup = new FormGroup({
      id: this.id,
      title: this.title,
      author: this.author,
      publishYear: this.publishYear
    }//, [myValidator]
    );
  }

  ngOnInit(): void {
    console.log('Component BookDetails initialized!');
  }

  ngOnDestroy(): void {
    console.log('Component BookDetails destroyed!');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Component BookDetails onChanges');
    console.log(changes);

    const value = changes['book']; // check if there is a change for book input
    if (value && value.currentValue) { // if changed into anything truthy
      const _value = {...value.currentValue};
      this.bookFormGroup.reset(_value);
    }
  }

  ngAfterViewInit(): void {
    console.log('Book Details after view init');
  }

  cancel(): void {
    this.cancelClicked.emit();
  }

  save(): void {
    this.saveClicked.emit(this.bookFormGroup.value);
  }
}
