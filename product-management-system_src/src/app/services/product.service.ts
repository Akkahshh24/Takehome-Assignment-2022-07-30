import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Category } from '../common/category';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productUrl = "http://localhost:8080/api/product"; 

  constructor(private httpClient:HttpClient) { }

  getAllProducts():Observable<Product[]>{
    return this.httpClient.get<GetProductResponse>(this.productUrl).pipe(map(response => response._embedded.products));
  }

  saveProduct(product:Product):Observable<Product>{
    console.log(product)

    const httpOptions = {
      headers:new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':'auth-token',
        'Access-Control-Allow-origin':'*'
      })
    };
    return this.httpClient.post<Product>(this.productUrl, product, httpOptions);
  }

  getProductById(id:number):Observable<Product>{
    const productURL = this.productUrl + "/" + id;
    return this.httpClient.get<Product>(productURL);
  }

  updateProduct(product:Product):Observable<Product>{
    const httpOptions = {
      headers:new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':'auth-token',
        'Access-Control-Allow-origin':'*'
      })
    };
    return this.httpClient.put<Product>(this.productUrl + `/${product.id}`,product, httpOptions);
  }

  deleteProduct(id:number):Observable<Product>{
    const httpOptions = {
      headers:new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':'auth-token',
        'Access-Control-Allow-origin':'*'
      })
    };
    return this.httpClient.delete<Product>(this.productUrl + `/${id}`,httpOptions);
  }
}

interface GetProductResponse{
  _embedded:{
    products:Product[];
  }
}
