import { BookListComponent } from './book-list.component';
import {SpinnerService} from "../../../shared/services/spinner.service";
import {BookService} from "../../services/book.service";
import {Book} from "../../model/book";
import {ComponentFixture, fakeAsync, TestBed, tick} from "@angular/core/testing";
import {BookDetailsComponent} from "../book-details/book-details.component";

describe('BookListComponent', () => {
  let component: BookListComponent;

  describe('[DOM]', () => {

    let fixture: ComponentFixture<BookListComponent>;
    let nativeElement: HTMLElement;
    let spinnerServiceMock: any;

    beforeEach(async () => {
      spinnerServiceMock = {
        show: jasmine.createSpy(),
        hide: jasmine.createSpy()
      };

      await TestBed.configureTestingModule({
        declarations: [BookListComponent, BookDetailsComponent],
        imports: [],
        providers: [
          BookService,
          { provide: SpinnerService, useValue: spinnerServiceMock}
        ]
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(BookListComponent);
      component = fixture.componentInstance;
      nativeElement = fixture.nativeElement;
    });

    it('should create BookListComponent', () => {
      expect(component).toBeTruthy();
    });

    it('should have a title', () => {
      const titleElement = nativeElement.querySelector('#book-list-title');
      expect(titleElement).toBeTruthy();
      expect(titleElement?.textContent).toBe('Book list');
    });

    it('renders list of 3 books', fakeAsync(() => {
      // when
      fixture.detectChanges();
      // then
      let bookElements = nativeElement.querySelectorAll('li');
      expect(bookElements).toBeTruthy();
      expect(bookElements.length).toBe(0);
      expect(spinnerServiceMock.show).toHaveBeenCalledTimes(1);
      expect(spinnerServiceMock.hide).not.toHaveBeenCalled();
      // when
      tick(1000);
      fixture.detectChanges();
      // then
      expect(spinnerServiceMock.hide).toHaveBeenCalled();
      bookElements = nativeElement.querySelectorAll('li');
      expect(bookElements).toBeTruthy();
      expect(bookElements.length).toBe(3);
    }));
  });

  describe('[class]', () => {
    let spinnerService: SpinnerService;
    let bookService: BookService;

    beforeEach(() => {
      bookService = new BookService();
      spinnerService = new SpinnerService();
      component = new BookListComponent(bookService, spinnerService);
    });

    it('should have no book selected at the beginning', () => {
      // expect(component.selectedBook).toBeUndefined();
      expect(component.selectedBook).toBeFalsy();
    });

    it('should have selected book once a book is selected', () => {
      // given
      const aBook = bookService.getAllBooks()[0];
      // when
      component.selectBook(aBook);
      // then
      expect(component.selectedBook).toBeTruthy();
      expect(component.selectedBook).toEqual(aBook);
    });

    it('should clear selected book once cancel is called', () => {
      // given
      const aBook = bookService.getAllBooks()[0];
      component.selectBook(aBook);
      // then
      expect(component.selectedBook).toBeTruthy();
      // when
      component.cancel();
      // then
      expect(component.selectedBook).toBeFalsy();
    });

    it('should save the book to the service and clear selected book once saveBook is called', () => {
      // given
      const aBook = bookService.getAllBooks()[0];
      component.selectBook(aBook);
      // then
      expect(component.selectedBook).toBeTruthy();
      // when
      const newBook: Book = {
        id: aBook.id,
        title: 'foo',
        author: 'bar',
        publishYear: 1900
      };
      component.saveBook(newBook);
      // then
      const savedBook = bookService.getAllBooks().find(currentBook => currentBook.id === newBook.id);
      expect(savedBook).toBeTruthy();
      expect(savedBook).toEqual(newBook);
      expect(component.selectedBook).toBeFalsy();
    });

    it('should save the book to the service and clear selected book once saveBook is called (mocked)', () => {
      // given
      const aBook = bookService.getAllBooks()[0];
      component.selectBook(aBook);
      spyOn(bookService, 'saveBook').and.callThrough();
      // then
      expect(component.selectedBook).toBeTruthy();
      // when
      const newBook: Book = {
        id: aBook.id,
        title: 'foo',
        author: 'bar',
        publishYear: 1900
      };
      component.saveBook(newBook);
      // then
      expect(bookService.saveBook).toHaveBeenCalledOnceWith(newBook);
      expect(component.selectedBook).toBeFalsy();
    });
  });
});
