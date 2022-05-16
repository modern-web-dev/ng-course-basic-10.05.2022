import { Component, OnInit } from '@angular/core';
import {Book} from "../../model/book";
import {Router} from "@angular/router";

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnInit {

  selectedBook: Book | undefined = undefined;

  constructor(private readonly router: Router) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state) {
      this.selectedBook = state['book'];
    }
  }

  ngOnInit(): void {
  }

  saveBook(book: Book): void {

  }

  cancel(): void {

  }
}
