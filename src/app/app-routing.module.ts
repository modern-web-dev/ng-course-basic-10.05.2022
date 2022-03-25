import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StartPageComponent} from "./shared/component/start-page/start-page.component";
import {NotFoundPageComponent} from "./shared/component/not-found-page/not-found-page.component";
import {BookListComponent} from "./book/components/book-list/book-list.component";
import {EditBookComponent} from "./book/components/edit-book/edit-book.component";
import {BookResolver} from "./book/components/edit-book/book.resolver";
import {BookListResolver} from "./book/components/book-list/book-list.resolver";

const routes: Routes = [
  {
    path: '',
    component: StartPageComponent
  },
  {
    path: 'books',
    component: BookListComponent,
    resolve: {
      books: BookListResolver
    }
  },
  {
    path: 'books/:bookId',
    component: EditBookComponent,
    resolve: {
      book: BookResolver
    }
  },
  {
    path: '**',
    component: NotFoundPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
