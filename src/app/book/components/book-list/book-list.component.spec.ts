import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookListComponent } from './book-list.component';
import {BookService} from "../../service/book.service";
import {SpinnerService} from "../../../shared/service/spinner.service";
import {Book} from "../../model/book";

describe('BookListComponent', () => {

  let component: BookListComponent;
  let bookService: BookService;
  let spinnerService: SpinnerService
  let aBook: Book;

  beforeEach(() => {
    bookService = new BookService();
    spinnerService = new SpinnerService();
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
    // given
    spyOn(bookService, "updateBook").and.callThrough();
    // when
    component.saveBook(aBook);
    // then
    expect(component.selectedBook).toBeFalsy();
    expect(spinnerService.showSpinner).toBeTruthy();
    expect(bookService.updateBook).toHaveBeenCalledWith(aBook);
  });
});
