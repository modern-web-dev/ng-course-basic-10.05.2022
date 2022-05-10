import { Component } from '@angular/core';

export interface Book {
  title: string;
  author: string;
  publishYear: number;
}

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent {

  book: Book = {
    title: 'Solaris',
    author: 'Stanislaw Lem',
    publishYear: 1960
  };

  constructor() { }

  cancel(): void {
    this.book = {
      title: 'Solaris',
      author: 'Stanislaw Lem',
      publishYear: 1960
    };
  }

  save(): void {
    console.log(this.book);
  }

  updateYear($event: string): void {
    this.book.publishYear = Number.parseInt($event);
  }
}
