import { BookListComponent } from './book-list.component';
import {ComponentFixture, fakeAsync, TestBed, tick} from "@angular/core/testing";
import {BookDetailsComponent} from "../edit-book/book-details/book-details.component";
import {RouterTestingModule} from "@angular/router/testing";
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import {Book} from "../../model/book";

describe('BookListComponent', () => {
  let component: BookListComponent;

  describe('[DOM]', () => {

    let fixture: ComponentFixture<BookListComponent>;
    let nativeElement: HTMLElement;
    let routerMock: any;
    let activatedRouteMock: any;
    let listOfBooks: Book[];

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

      await TestBed.configureTestingModule({
        declarations: [BookListComponent, BookDetailsComponent],
        imports: [],
        providers: [
          { provide: Router, useValue: routerMock },
          { provide: ActivatedRoute, useValue: activatedRouteMock }
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
      fixture.detectChanges();
      let bookElements = nativeElement.querySelectorAll('li');
      // then
      expect(bookElements).toBeTruthy();
      expect(bookElements.length).toBe(3);
    })
  });
});
