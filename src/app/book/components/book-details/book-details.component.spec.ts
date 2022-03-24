import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDetailsComponent } from './book-details.component';

describe('BookDetailsComponent', () => {

  fdescribe("[DOM]", () => {
    let component: BookDetailsComponent;
    let fixture: ComponentFixture<BookDetailsComponent>;
    let nativeElement: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [BookDetailsComponent]
      })
        .compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(BookDetailsComponent);
      component = fixture.componentInstance;
      nativeElement = fixture.nativeElement as HTMLElement;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('initially no book is selected so appropriate message is shown', () => {
      const sectionElement = nativeElement.querySelector('#please-select-a-book');
      expect(sectionElement).toBeTruthy();
      expect(sectionElement!.textContent).toContain('Please select a book.');
      const editorElement = nativeElement.querySelector('#book-editor');
      expect(editorElement).toBeFalsy();
    });
  });
});
