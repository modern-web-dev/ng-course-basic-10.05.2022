import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { BookListComponent } from './components/book-list/book-list.component';
import {BookService} from "./service/book.service";

@NgModule({
  declarations: [
    BookDetailsComponent,
    BookListComponent
  ],
  exports: [
    BookDetailsComponent,
    BookListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [
    BookService
  ]
})
export class BookModule { }
