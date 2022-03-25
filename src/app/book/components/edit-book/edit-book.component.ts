import { Component } from '@angular/core';
import {Book} from "../../model/book";
import {ActivatedRoute, Router} from "@angular/router";
import {SpinnerService} from "../../../shared/service/spinner.service";
import {BookService} from "../../service/book.service";

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent {

  book: Book | undefined;

  constructor(
    private readonly spinnerService: SpinnerService,
    private readonly bookService: BookService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute) {

    const state = this.activatedRoute.snapshot.data['book'];
    this.book = state ? state as Book : undefined;
    if (!this.book) {
      this.goBack();
    }
  }

  async goBack() {
    await this.router.navigate(['..'], { relativeTo: this.activatedRoute });
  }

  async saveBook(updatedBook: Book) {
    console.log(updatedBook);
    this.spinnerService.show();
    await this.bookService.updateBook(updatedBook).toPromise();
    this.spinnerService.hide();
    await this.goBack();
  }
}
