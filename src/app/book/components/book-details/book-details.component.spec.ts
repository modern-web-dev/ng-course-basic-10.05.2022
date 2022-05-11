import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BookDetailsComponent} from './book-details.component';
import {Book} from "../../model/book";
import {FormsModule} from "@angular/forms";

describe('BookDetailsComponent', () => {

  describe('[DOM]', () => {

    let component: BookDetailsComponent;
    let fixture: ComponentFixture<BookDetailsComponent>;
    let nativeElement: HTMLElement;
    let aBook: Book;

    const getNoBooksPanel = () => nativeElement.querySelector('#select-book-msg');
    const getBookEditorPanel = () => nativeElement.querySelector('#book-editor');
    const getInputById = (id: string) => nativeElement.querySelector(`#${id}`) as HTMLInputElement | null;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [BookDetailsComponent],
        imports: [FormsModule]
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
      fixture.detectChanges();
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
        fixture.detectChanges();
      });

      it('should display book editor, if book is selected', () => {
        const sectionElement = getBookEditorPanel();
        expect(sectionElement).toBeTruthy();
        const selectBookElement = getNoBooksPanel();
        expect(selectBookElement).toBeFalsy();
      });

      it('should populate form fields with book data (then/done)', (done) => {
        fixture.whenStable().then(() => {
          const titleInput = getInputById('title');
          expect(titleInput).toBeTruthy();
          expect(titleInput?.value).toBe(aBook.title);
          done();
        });
      });

      it('should populate form fields with book data (async/await)', async () => {
        // when
        await fixture.whenStable();
        // then
        const titleInput = getInputById('title');
        const authorInput = getInputById('author');
        const yearInput = getInputById('year');

        expect(titleInput?.value).toBe(aBook.title);
        expect(authorInput?.value).toBe(aBook.author);
        expect(yearInput?.value).toBe(`${aBook.publishYear}`);
      });
    });
  });
});
