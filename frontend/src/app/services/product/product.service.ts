import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getProducts() : Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}\products`);
  } 

  getProductsError() : Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}\prots`);
  } 

  getProductsByName(name: string) : Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}\products?name_like=${name}`);
  } 

  getProductsByDepartment(departament: string) : Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}\products?department=${departament}`);
  } 
}
