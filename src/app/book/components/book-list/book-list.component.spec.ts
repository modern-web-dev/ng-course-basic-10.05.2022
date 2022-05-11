import { BookListComponent } from './book-list.component';
import {SpinnerService} from "../../../shared/services/spinner.service";
import {BookService} from "../../services/book.service";
import {Book} from "../../model/book";

describe('BookListComponent', () => {
  let component: BookListComponent;
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

});
