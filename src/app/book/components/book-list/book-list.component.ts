import {AfterViewInit, Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Book} from "../../model/book";
import {BookService} from "../../service/book.service";
import {delay, Observable, take, tap} from "rxjs";
import {SpinnerService} from "../../../shared/service/spinner.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  providers: []
})
export class BookListComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  readonly books: Book[];

  constructor(
    private readonly bookService: BookService,
    private readonly spinnerService: SpinnerService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute) {

    console.log(`BookListComponent constructor phase`);
    this.books = activatedRoute.snapshot.data['books'];
  }

  ngOnInit(): void {
    console.log(`BookListComponent onInit phase`);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(`BookListComponent onChanges phase`);
    console.log(changes);
  }

  ngAfterViewInit(): void {
    console.log(`BookListComponent afterViewInit phase`);
  }

  ngOnDestroy(): void {
    console.log('BookListComponent onDestroy phase');
  }

  async selectBook(aBook: Book) {
    await this.router.navigate([aBook.id], { relativeTo: this.activatedRoute });
  }
}
