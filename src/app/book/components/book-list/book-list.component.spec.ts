import { BookListComponent } from './book-list.component';
import {Book} from "../../model/book";
import createSpy = jasmine.createSpy;
import {BehaviorSubject} from "rxjs";

describe('BookListComponent', () => {

  let component: BookListComponent;
  let bookService: any;
  let spinnerService: any
  let aBook: Book;

  beforeEach(() => {
    bookService = {
      books$: new BehaviorSubject<Book[]>([]),
      updateBook: createSpy()
    };
    spinnerService = {
      show: createSpy()
    };
    component = new BookListComponent(bookService, spinnerService);
    aBook = {
      id: 0,
      author: 'foo',
      title: 'bar',
      year: 2022
    };
  });

  it("there is no selected book in a fresh new BookList component", () => {
    expect(component.selectedBook).toBeFalsy();
  });

  it("once we select a book, it becomes selected", () => {
    // when
    component.selectBook(aBook);
    // then
    expect(component.selectedBook).toBeTruthy();
    expect(component.selectedBook).toEqual(aBook);
  });

  it("saving book that is not selected is kind of weird", () => {
    // when
    component.saveBook(aBook);
    // then
    expect(component.selectedBook).toBeFalsy();
    expect(spinnerService.show).toHaveBeenCalledTimes(2);
    expect(bookService.updateBook).toHaveBeenCalledWith(aBook);
  });
});
