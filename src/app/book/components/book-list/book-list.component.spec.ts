import { BookListComponent } from './book-list.component';
import {ComponentFixture, fakeAsync, TestBed, tick} from "@angular/core/testing";
import {BookDetailsComponent} from "../edit-book/book-details/book-details.component";
import {ActivatedRoute, Router} from "@angular/router";
import {Book} from "../../model/book";
import {BookService} from "../../services/book.service";
import {ReactiveFormsModule} from "@angular/forms";

describe('BookListComponent', () => {
  let component: BookListComponent;

  describe('[DOM]', () => {

    let fixture: ComponentFixture<BookListComponent>;
    let nativeElement: HTMLElement;
    let routerMock: any;
    let activatedRouteMock: any;
    let bookServiceMock: any;
    let listOfBooks: Book[];

    // utility functions
    const getInputById = (id: string) => nativeElement.querySelector(`#${id}`) as HTMLInputElement | null;
    const cdr = () => fixture.detectChanges();
    const setInputValue = (id: string, value: string) => {
      const inputElement = getInputById(id);
      if(inputElement) {
        inputElement.value = value;
        inputElement.dispatchEvent(new Event('input'));
        inputElement.dispatchEvent(new Event('change'))
      } else {
        console.log('no input');
      }
    };


    beforeEach(async () => {

      listOfBooks = [
        { id: 1, title: 'a', author: 'x', publishYear: 1990},
        { id: 2, title: 'b', author: 'y', publishYear: 1991},
        { id: 3, title: 'c', author: 'z', publishYear: 1992}
      ];
      routerMock = {
        navigate: jasmine.createSpy()
      };
      activatedRouteMock = {
        snapshot: {
          data: {
            books: listOfBooks
          }
        }
      };
      bookServiceMock = {
        findBooks: jasmine.createSpy()
      };

      await TestBed.configureTestingModule({
        declarations: [BookListComponent, BookDetailsComponent],
        imports: [ReactiveFormsModule],
        providers: [
          { provide: Router, useValue: routerMock },
          { provide: ActivatedRoute, useValue: activatedRouteMock },
          { provide: BookService, useValue: bookServiceMock }
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

    it('renders list of 3 books', () => {
      // when
      cdr();
      let bookElements = nativeElement.querySelectorAll('li');
      // then
      expect(bookElements).toBeTruthy();
      expect(bookElements.length).toBe(3);
    });

    fit('should query for books', fakeAsync(() => {
      // given
      const expectedBooks = [listOfBooks[0]];
      bookServiceMock.findBooks.and.returnValue(expectedBooks);
      // when
      setInputValue('search', 'lem');
      tick(500);
      cdr();
      // then
      let bookElements = nativeElement.querySelectorAll('li');
      expect(bookElements).toBeTruthy();
      expect(bookServiceMock.findBooks).toHaveBeenCalledOnceWith('lem');
      expect(bookElements.length).toBe(1);
    }));
  });
});
