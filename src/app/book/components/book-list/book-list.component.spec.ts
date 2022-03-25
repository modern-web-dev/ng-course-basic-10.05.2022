import { BookListComponent } from './book-list.component';
import {ComponentFixture, fakeAsync, TestBed, tick} from "@angular/core/testing";
import {BookService} from "../../service/book.service";
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import {Book} from "../../model/book";
import {ReactiveFormsModule} from "@angular/forms";
import {of} from "rxjs";

describe('BookListComponent', () => {

  describe("[DOM]", () => {

    let component: BookListComponent;
    let fixture: ComponentFixture<BookListComponent>;
    let nativeElement: HTMLElement;
    let bookServiceMock: any;
    let routerMock: any;
    let activatedRoute: any;
    let books: Book[];

    const getSearchField = () => nativeElement.querySelector(`input#search`) as HTMLInputElement;
    const setSearchField = (value: string) => {
      const inputField = getSearchField();
      inputField.value = value;
      inputField.dispatchEvent(new Event('input'));
    };

    beforeEach(() => {
      books = [{
        id: 1,
        title: 'foo1',
        author: 'bar',
        year: 1999
      },{
        id: 2,
        title: 'foo2',
        author: 'bar',
        year: 1999
      },{
        id: 3,
        title: 'foo3',
        author: 'bar',
        year: 1999
      }];
      bookServiceMock = {
        findBooks: jasmine.createSpy().and.returnValue(of([books[0]]))
      };
      routerMock = {};
      activatedRoute = {
        snapshot: {
          data: {
            books
          }
        }
      };
    });

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [BookListComponent],
        imports: [ReactiveFormsModule],
        providers: [
          { provide: BookService, useValue: bookServiceMock },
          { provide: Router, useValue: routerMock },
          { provide: ActivatedRoute, useValue: activatedRoute }
        ]
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(BookListComponent);
      component = fixture.componentInstance;
      nativeElement = fixture.nativeElement;
      fixture.detectChanges();
    });

    it("component can be created", () => {
      expect(component).toBeTruthy();
    });

    it("has a nice title", () => {
      const titleElement = nativeElement.querySelector(".book-list--title");
      expect(titleElement?.textContent).toBe("Book list");
    });

    it('shows all books at start', () => {
      const bookButtons = nativeElement.querySelectorAll('button');
      expect(bookButtons).toBeTruthy();
      expect(bookButtons.length).toBe(3);
      [0,1,2].forEach(index => expect(bookButtons.item(index).textContent).toContain(books[index].title));
    });

    it('narrows list of books as we type in the search box', fakeAsync(() => {
      setSearchField("foo1");
      tick(500);
      fixture.detectChanges();
      const bookButtons = nativeElement.querySelectorAll('button');
      expect(bookButtons).toBeTruthy();
      expect(bookButtons.length).toBe(1);
      [0].forEach(index => expect(bookButtons.item(index).textContent).toContain(books[index].title));
    }));

  });
});
