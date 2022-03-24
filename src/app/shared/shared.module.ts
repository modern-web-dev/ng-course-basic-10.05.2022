import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartPageComponent } from './component/start-page/start-page.component';
import { NotFoundPageComponent } from './component/not-found-page/not-found-page.component';
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    StartPageComponent,
    NotFoundPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
