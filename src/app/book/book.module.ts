import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import {FormsModule} from "@angular/forms";
import { BookListComponent } from './components/book-list/book-list.component';
import {BookService} from "./services/book.service";



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
    FormsModule
  ],
  providers: [
    BookService
  ]
})
export class BookModule { }
