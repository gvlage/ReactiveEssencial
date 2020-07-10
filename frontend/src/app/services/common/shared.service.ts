import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private _navTitle = new BehaviorSubject<string>('');

  constructor() { }

  get NavTitle() : string {
    return this._navTitle.value;
  } 

  set NavTitle(title: string) {
    this._navTitle.next(title);
  }
}
