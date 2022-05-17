import { TestBed } from '@angular/core/testing';

import { BookService } from './book.service';
import {HttpClient} from "@angular/common/http";
import {Book} from "../model/book";
import {of} from "rxjs";

describe('BookService', () => {
  let service: BookService;
  let httpClientMock: any;

  beforeEach(() => {
    httpClientMock = {
      get: jasmine.createSpy()
    };

    TestBed.configureTestingModule({
      providers: [
        BookService,
        { provide: HttpClient, useValue: httpClientMock}
      ]
    });
    service = TestBed.inject(BookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a book', (done) => {
    // given
    const aBook: Book = {
      id: 1,
      title: 'a',
      author: 'x',
      publishYear: 1999
    }
    httpClientMock.get.and.returnValue(of(aBook));
    // when
    const response = service.getBookById(1);
    // then
    response.subscribe(responseBook =>{
      expect(responseBook).toEqual(aBook);
      expect(httpClientMock.get).toHaveBeenCalledOnceWith('/api/books/1');
      done();
    });
  });
});
