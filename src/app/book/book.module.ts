import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    BookDetailsComponent
  ],
  exports: [
    BookDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class BookModule { }
