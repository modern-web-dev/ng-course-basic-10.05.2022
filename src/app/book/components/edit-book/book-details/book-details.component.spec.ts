import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDetailsComponent } from './book-details.component';
import { ReactiveFormsModule} from "@angular/forms";
import {SimpleChange} from "@angular/core";
import {Book} from "../../../model/book";

describe('BookDetailsComponent', () => {

  describe("[DOM]", () => {
    let component: BookDetailsComponent;
    let fixture: ComponentFixture<BookDetailsComponent>;
    let nativeElement: HTMLElement;
    let aBook: Book;
    // DOM until functions
    const getBookEditor = () => nativeElement.querySelector('#book-editor') as HTMLElement;
    const getNoBookPanel = () => nativeElement.querySelector('#please-select-a-book') as HTMLElement;
    const getInputField = (id: string) => nativeElement.querySelector(`input#${id}`) as HTMLInputElement;
    const setInputField = (id: string, value: string) => {
      const inputField = getInputField(id);
      inputField.value = value;
      inputField.dispatchEvent(new Event('input'));
    };
    const getSaveButton = () => nativeElement.querySelector('button.btn-primary') as HTMLButtonElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [BookDetailsComponent],
        imports: [ReactiveFormsModule]
      })
        .compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(BookDetailsComponent);
      component = fixture.componentInstance;
      nativeElement = fixture.nativeElement as HTMLElement;
      fixture.detectChanges();

      aBook = {
        id: 4,
        author: 'Douglas Crockford',
        title: 'JavaScript: The Good Parts',
        year: 2022
      };
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('once book is given via binding, it is displayed',  () => {
      // given
      component.book = aBook;
      // when
      component.ngOnChanges({ book: new SimpleChange(undefined, aBook, false)});
      // then
      const bookEditor = getBookEditor();
      expect(bookEditor).toBeTruthy();

      expect(getInputField('title')!.value).toBe(aBook.title);
      expect(getInputField('author')!.value).toBe(aBook.author);
      expect(getInputField('year')!.value).toBe(`${aBook.year}`);
    });

    it('selected book can be edited and saved; once saved, a new values should be emited',  () => {
      // given
      const newValue: Book = {
        id: aBook.id,
        title: 'New title',
        author: 'New author',
        year: 1999
      };
      let savedBook: Book | null = null;
      component.bookSaved.subscribe(value => savedBook = value);
      component.book = aBook;
      component.ngOnChanges({ book: new SimpleChange(undefined, aBook, false)});
      // when
      setInputField('title', newValue.title);
      setInputField('author', newValue.author);
      setInputField('year', `${newValue.year}`);
      fixture.detectChanges();
      getSaveButton().click();
      // then
      expect(savedBook).toBeTruthy();
      expect(savedBook!).toEqual(newValue);
    });
  });
});
