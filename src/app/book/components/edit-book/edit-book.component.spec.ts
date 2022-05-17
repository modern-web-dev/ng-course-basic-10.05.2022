import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EditBookComponent} from './edit-book.component';
import {BookService} from "../../services/book.service";
import {RouterTestingModule} from "@angular/router/testing";
import {BookDetailsComponent} from "./book-details/book-details.component";
import {Book} from "../../model/book";
import {BehaviorSubject, Subject} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

describe('EditBookComponent', () => {
  let component: EditBookComponent;
  let fixture: ComponentFixture<EditBookComponent>;
  let bookServiceMock: any;
  let routerMock: any;
  let activatedRouteMock: any;
  let aBook: Book;

  beforeEach(async () => {

    aBook = {
      id: 1,
      title: 'a',
      author: 'x',
      publishYear: 1990
    };

    bookServiceMock = {
      saveBook: jasmine.createSpy()
    };
    routerMock = {
      navigate: jasmine.createSpy()
    };
    activatedRouteMock = {
      snapshot: {
        data: {
          book: aBook
        }
      }
    };

    await TestBed.configureTestingModule({
      declarations: [EditBookComponent, BookDetailsComponent],
      imports: [],
      providers: [{
        provide: BookService, useValue: bookServiceMock
      }, {
        provide: Router, useValue: routerMock
      }, {
        provide: ActivatedRoute, useValue: activatedRouteMock
      }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save a book', () => {
    // given
    const responseSubject = new BehaviorSubject<Book>(aBook);
    bookServiceMock.saveBook.and.returnValue(responseSubject);
    // when
    component.saveBook(aBook);
    // then
    expect(bookServiceMock.saveBook).toHaveBeenCalledOnceWith(aBook);
    expect(routerMock.navigate).toHaveBeenCalledOnceWith(['..'], { relativeTo: activatedRouteMock });
  });
});
