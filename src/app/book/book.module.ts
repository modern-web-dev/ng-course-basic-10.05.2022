import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from "@angular/forms";
import { BookListComponent } from './components/book-list/book-list.component';
import {BookService} from "./service/book.service";
import {RouterModule} from "@angular/router";
import { EditBookComponent } from './components/edit-book/edit-book.component';
import {BookDetailsComponent} from "./components/edit-book/book-details/book-details.component";

@NgModule({
  declarations: [
    BookDetailsComponent,
    BookListComponent,
    EditBookComponent
  ],
  exports: [
    BookDetailsComponent,
    BookListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [
    BookService
  ]
})
export class BookModule { }
