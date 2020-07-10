import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/common/shared.service';
import { ProductService } from 'src/app/services/product/product.service';
import { Product } from 'src/app/models/product';
import { catchError, take, map, concatMap, delay, tap } from 'rxjs/operators';
import { Observable, forkJoin, of, throwError } from 'rxjs';

@Component({
  selector: 'app-combine-results',
  templateUrl: './combine-results.component.html',
  styleUrls: ['./combine-results.component.css']
})
export class CombineResultsComponent implements OnInit {

  products = new Array<Product>();

  constructor(private sharedService: SharedService, private productService: ProductService) {
    this.sharedService.NavTitle = 'Combine Results';
  }

  ngOnInit(): void {
  }

  getProductsParallel() {
   this.products = new Array<Product>();

    forkJoin({
      firstElectronicProduct: this.productService.getProductsByDepartment('electronics').pipe(
        map(data => {
          if(data.length > 1)
            return data[0];
        })
        ),
      firstHomeProduct: this.productService.getProductsByDepartment('home').pipe( 
        map(data => {
        if(data.length > 1)
          return data[0];
      })
      ),
      firstBookProduct: this.productService.getProductsByDepartment('books').pipe( 
        map(data => {
        if(data.length > 1)
          return data[0];
      })
      )
    })
    .subscribe((resp)=> {
      this.products.push(resp.firstElectronicProduct,resp.firstHomeProduct,resp.firstBookProduct);
    })         
 
  }

  getProductsSequentially() {
    this.products = new Array<Product>();

    const firstElectronicProduct = this.productService.getProductsByDepartment('electronics').pipe(
      map(data => {
        if(data.length > 1)
          return data[0];
      })
      )

    const firstBookProduct = firstElectronicProduct.pipe(
      tap((val)=> {
        console.log('Eletronic Product: ', val);
        this.products.push(val);
      }),
      delay(1000),
      concatMap(val => this.productService.getProductsByDepartment('books').pipe(
        map(data => {
          if(data.length > 1)
            return data[0];
        })
      ))
    )

    const firstHomeProduct = firstBookProduct.pipe(
      tap((val)=> {
        console.log('Book Product: ', val);
        this.products.push(val);
      }),
      delay(1000),
      concatMap(val => this.productService.getProductsByDepartment('home').pipe(
        map(data => {
          if(data.length > 1)
            return data[0];
        })       
      ))
    )

    firstHomeProduct.subscribe(resp => {
      console.log('Home Product: ', resp);
      this.products.push(resp);
    });
  }
}
