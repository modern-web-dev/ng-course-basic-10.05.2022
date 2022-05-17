import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookDetailsComponent } from './components/edit-book/book-details/book-details.component';
import { ReactiveFormsModule } from "@angular/forms";
import { BookListComponent } from './components/book-list/book-list.component';
import {BookService} from "./services/book.service";
import {RouterModule} from "@angular/router";
import { EditBookComponent } from './components/edit-book/edit-book.component';
import {HttpClientModule} from "@angular/common/http";



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
    RouterModule,
    HttpClientModule
  ],
  providers: [
    BookService
  ]
})
export class BookModule { }
