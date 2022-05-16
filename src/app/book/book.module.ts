import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { ReactiveFormsModule } from "@angular/forms";
import { BookListComponent } from './components/book-list/book-list.component';
import {BookService} from "./services/book.service";
import {RouterModule} from "@angular/router";
import { EditBookComponent } from './components/edit-book/edit-book.component';



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
