import { Component, OnInit } from '@angular/core';
import {Book} from "../../model/book";
import {ActivatedRoute, Router} from "@angular/router";
import {BookService} from "../../services/book.service";

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnInit {

  selectedBook: Book | undefined = undefined;

  constructor(
    private readonly bookService: BookService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute) {
    const book = this.activatedRoute.snapshot.data['book'];
    if (book) {
      this.selectedBook = book;
    } else {
      // there is no book in the state, maybe we should navigate back
      this.goBack();
    }
  }

  ngOnInit(): void {
  }

  saveBook(book: Book) {
    this.bookService.saveBook(book);
    this.goBack();
  }

  cancel() {
    this.goBack();
  }

  private goBack() {
    this.router.navigate(['..'], { relativeTo: this.activatedRoute }).then(success => {
      if(!success) {
        console.log('navigation failed');
      }
    });
  }
}
