import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/common/shared.service';
import { ProductService } from 'src/app/services/product/product.service';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';
import { retryWhen, take, tap, concatMap, switchMap, retry, map, concatAll } from 'rxjs/operators';
import { interval, concat, Observable, of, merge } from 'rxjs';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-retry-error',
  templateUrl: './retry-error.component.html',
  styleUrls: ['./retry-error.component.css']
})
export class RetryErrorComponent implements OnInit {

  logs = new Array<string>();

  constructor(private sharedService: SharedService, private productService: ProductService) {
    this.sharedService.NavTitle = 'Retry Errors';
  }

  ngOnInit(): void {
  }

  getProducts() {
    this.logs = [];

    const request = interval(1000);
    const example = request.pipe(
      take(2),
      map(index => {
        if (index === 0) {
          return this.productService.getProducts();
        }
        return this.productService.getProductsError().pipe(
          catchError(e => {
            return throwError(e);
          }),
          retryWhen(err => interval(1000).pipe(
            take(3),
            tap((a) => {
              this.logs.push(`Retry attempt ${a + 1}:  At ${new Date().toISOString()}.`);
            })
          )
          )
        )
      })
    );

    const subscribe = example.subscribe(val => {
      val.subscribe(resp => {
        this.logs.push(`Success! ${resp.length} products retrieved!`);
      },
        error => {
          this.logs.push(error);
        });
    },
      error => {
        this.logs.push(error);
      });
  }
}
