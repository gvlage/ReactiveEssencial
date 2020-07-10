import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/common/shared.service';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product/product.service';

import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  mergeMap,
  switchMap,
  tap,
  take,
  reduce,
  takeWhile,
  mergeAll
} from 'rxjs/operators';
import { EMPTY, Subject } from 'rxjs';
import { strict } from 'assert';

@Component({
  selector: 'app-incremental.search',
  templateUrl: './incremental.search.component.html',
  styleUrls: ['./incremental.search.component.css']
})
export class IncrementalSearchComponent implements OnInit {

  searchField$ = new Subject<string>();
  products: Product[];
  
  constructor(private sharedService: SharedService, private productService: ProductService) {
    this.sharedService.NavTitle = 'Incremental Search';
    this.products = [];
    
    this.searchField$.pipe(      
      debounceTime(400),
      distinctUntilChanged(),
      filter(filter => filter.length > 1),      
      tap(()=> this.products = []),
      switchMap(term => this.productService.getProductsByName(term))
    )
    .subscribe(resp => {
      this.products = resp;
    });   
   }

  ngOnInit(): void {
  } 

}
