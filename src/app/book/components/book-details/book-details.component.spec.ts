import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BookDetailsComponent} from './book-details.component';
import {Book} from "../../model/book";
import { ReactiveFormsModule} from "@angular/forms";
import {SimpleChange} from "@angular/core";

describe('BookDetailsComponent', () => {

  describe('[DOM]', () => {

    let component: BookDetailsComponent;
    let fixture: ComponentFixture<BookDetailsComponent>;
    let nativeElement: HTMLElement;
    let aBook: Book;

    // utility DOM functions
    const getNoBooksPanel = () => nativeElement.querySelector('#select-book-msg');
    const getBookEditorPanel = () => nativeElement.querySelector('#book-editor');
    const getInputById = (id: string) => nativeElement.querySelector(`#${id}`) as HTMLInputElement | null;
    const cdr = () => fixture.detectChanges();
    const setInputValue = (id: string, value: string) => {
      const inputElement = getInputById(id);
      if(inputElement) {
        inputElement.value = value;
        inputElement.dispatchEvent(new Event('input'));
      }
    };
    const clickSave = () => {
      const saveButton = nativeElement.querySelector("#save-button") as HTMLButtonElement | null;
      if (saveButton) {
        saveButton.click();
      }
    };

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [BookDetailsComponent],
        imports: [ReactiveFormsModule]
      })
        .compileComponents();
    });

    beforeEach(() => {
      aBook = {
        id: 1,
        title: 'foo',
        author: 'bar',
        publishYear: 1977
      };
      fixture = TestBed.createComponent(BookDetailsComponent);
      component = fixture.componentInstance;
      nativeElement = fixture.nativeElement;
      cdr();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should display a message if book is not selected', () => {
      const sectionElement = getNoBooksPanel();
      expect(sectionElement).toBeTruthy();
    });


    describe('once a book is selected', () => {

      beforeEach(() => {
        component.book = aBook;
        component.ngOnChanges({ book: new SimpleChange(undefined, aBook, true)});
        cdr();
      });

      it('should display book editor, if book is selected', () => {
        const sectionElement = getBookEditorPanel();
        expect(sectionElement).toBeTruthy();
        const selectBookElement = getNoBooksPanel();
        expect(selectBookElement).toBeFalsy();
      });

      it('should populate form fields with book data', () => {
        // then
        const titleInput = getInputById('title');
        const authorInput = getInputById('author');
        const yearInput = getInputById('year');

        expect(titleInput?.value).toBe(aBook.title);
        expect(authorInput?.value).toBe(aBook.author);
        expect(yearInput?.value).toBe(`${aBook.publishYear}`);
      });

      it('should emit new value of a book once the book is edited and saved', async () => {
        // given
        let savedBook: Book | null = null;
        component.saveClicked.subscribe((book) => savedBook = book);
        // when
        await fixture.whenStable();
        setInputValue('title', 'new title');
        clickSave();
        // then
        expect(savedBook).toBeTruthy();
        expect(savedBook!).toEqual({ ...aBook, title: 'new title' });
      });
    });
  });
});
