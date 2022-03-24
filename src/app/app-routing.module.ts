import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StartPageComponent} from "./shared/component/start-page/start-page.component";
import {NotFoundPageComponent} from "./shared/component/not-found-page/not-found-page.component";
import {BookListComponent} from "./book/components/book-list/book-list.component";
import {EditBookComponent} from "./book/components/edit-book/edit-book.component";

const routes: Routes = [
  {
    path: '',
    component: StartPageComponent
  },
  {
    path: 'books',
    component: BookListComponent
  },
  {
    path: 'books/edit',
    component: EditBookComponent
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
