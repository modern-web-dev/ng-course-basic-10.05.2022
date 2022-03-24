import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDetailsComponent } from './book-details.component';
import {Book} from "../../model/book";
import {FormsModule} from "@angular/forms";

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
        imports: [FormsModule]
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

    it('initially no book is selected so appropriate message is shown', () => {
      const noBookPanel = getNoBookPanel();
      expect(noBookPanel).toBeTruthy();
      expect(noBookPanel!.textContent).toContain('Please select a book.');

      expect(getBookEditor()).toBeFalsy();
    });

    it('once book is given via binding, it is displayed', async () => {
      // given
      component.book = aBook;
      // when
      fixture.detectChanges();
      // then
      const bookEditor = getBookEditor();
      expect(bookEditor).toBeTruthy();

      await fixture.whenStable();

      expect(getInputField('title')!.value).toBe(aBook.title);
      expect(getInputField('author')!.value).toBe(aBook.author);
      expect(getInputField('year')!.value).toBe(`${aBook.year}`);
    });

    it('selected book can be edited and saved; once saved, a new values should be emited', async () => {
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
      fixture.detectChanges();
      await fixture.whenStable();
      // when
      setInputField('title', newValue.title);
      setInputField('author', newValue.author);
      setInputField('year', `${newValue.year}`);
      getSaveButton().click();
      // then
      expect(savedBook).toBeTruthy();
      expect(savedBook!).toEqual(newValue);
    });
  });
});
