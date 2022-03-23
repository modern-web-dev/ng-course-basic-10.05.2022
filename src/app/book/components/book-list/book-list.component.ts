import {Component, OnInit} from '@angular/core';
import {Book} from "../../model/book";
import {BookService} from "../../service/book.service";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent {
  selectedBook: Book | null = null;

  constructor(public readonly bookService: BookService) {
  }

  selectBook(aBook: Book): void {
    this.selectedBook = aBook;
  }

  saveBook(updatedBook: Book): void {
    this.bookService.updateBook(updatedBook);
    this.selectedBook = null;
  }

  closeBookDetails(): void {
    this.selectedBook = null;
  }
}
