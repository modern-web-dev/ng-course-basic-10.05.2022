import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StartPageComponent} from "./shared/components/start-page/start-page.component";
import {BookListComponent} from "./book/components/book-list/book-list.component";
import {NotFoundPageComponent} from "./shared/components/not-found-page/not-found-page.component";

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
    path: '**',
    component: NotFoundPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
