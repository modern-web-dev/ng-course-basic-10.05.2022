import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private readonly showSpinnerSubject = new BehaviorSubject<boolean>(false);

  readonly showSpinner$: Observable<boolean> = this.showSpinnerSubject;

  constructor() { }

  show(): void {
    this.showSpinnerSubject.next(true);
  }

  hide(): void {
    this.showSpinnerSubject.next(false);
  }
}
