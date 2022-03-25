import { BookListComponent } from './book-list.component';
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {BookService} from "../../service/book.service";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientModule} from "@angular/common/http";

describe('BookListComponent', () => {

  describe("[DOM]", () => {

    let component: BookListComponent;
    let fixture: ComponentFixture<BookListComponent>;
    let nativeElement: HTMLElement;
    let bookServiceMock: any;

    beforeEach(() => {
      bookServiceMock = {};
    });

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [BookListComponent],
        imports: [RouterTestingModule],
        providers: [
          { provide: BookService, useValue: bookServiceMock}
        ]
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(BookListComponent);
      component = fixture.componentInstance;
      nativeElement = fixture.nativeElement;
    });

    it("component can be created", () => {
      expect(component).toBeTruthy();
    });

    it("has a nice title", () => {
      const titleElement = nativeElement.querySelector(".book-list--title");
      expect(titleElement?.textContent).toBe("Book list");
    });

  });
});
