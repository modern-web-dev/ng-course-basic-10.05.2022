import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartPageComponent } from './components/start-page/start-page.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    StartPageComponent,
    NotFoundPageComponent
  ],
  imports: [
    CommonModule, RouterModule
  ]
})
export class SharedModule { }
