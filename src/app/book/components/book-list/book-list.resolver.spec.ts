import {TestBed} from "@angular/core/testing";
import {BookService} from "../../service/book.service";
import {BookListResolver} from "./book-list.resolver";
import {Book} from "../../model/book";
import {firstValueFrom, of} from "rxjs";

describe('BookListResolver', () => {

  let bookServiceMock: any;
  let bookListResolver: BookListResolver;

  beforeEach(() => {
    bookServiceMock = {
      getAllBooks: jasmine.createSpy()
    };
    TestBed.configureTestingModule({
      providers: [{ provide: BookService, useValue: bookServiceMock }]
    })
    bookListResolver = TestBed.inject(BookListResolver);
  });

  it('can be created', () => {
    expect(bookListResolver).toBeTruthy();
  });

  it('can resolve as list of books', async () => {
    // given
    const books: Book[] = [{
      id: 1,
      title: 'foo',
      author: 'bar',
      year: 2022
    }];
    bookServiceMock.getAllBooks.and.returnValue(of(books));
    // when
    const route: any = {};
    const state: any = {};
    const resolved = bookListResolver.resolve(route, state);
    // then
    const resolvedBooks = await firstValueFrom(resolved);
    expect(resolvedBooks).toBeTruthy();
    expect(resolvedBooks).toHaveSize(1);
    expect(resolvedBooks![0]).toEqual(books[0]);
  });
});
