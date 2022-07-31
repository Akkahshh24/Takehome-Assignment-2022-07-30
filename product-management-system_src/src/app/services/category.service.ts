import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Category } from '../common/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoryUrl = "http://localhost:8080/api/category";

  constructor(private httpClient:HttpClient) { }

  getAllCategories():Observable<Category[]>{
    return this.httpClient.get<GetCategoryResponse>(this.categoryUrl).pipe(map(response => response._embedded.categories));
  }

  saveCategory(category:Category):Observable<Category>{
    console.log(category)

    const httpOptions = {
      headers:new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':'auth-token',
        'Access-Control-Allow-origin':'*'
      })
    };
    return this.httpClient.post<Category>(this.categoryUrl, category, httpOptions);
  }

  getCategoryById(id:number):Observable<Category>{
    const categoryURL = this.categoryUrl + "/" + id;
    return this.httpClient.get<Category>(categoryURL);
  }

  updateCategory(category:Category):Observable<Category>{
    const httpOptions = {
      headers:new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':'auth-token',
        'Access-Control-Allow-origin':'*'
      })
    };
    return this.httpClient.put<Category>(this.categoryUrl + `/${category.categoryId}`,category, httpOptions);
  }

  deleteCategory(id:number):Observable<Category>{
    const httpOptions = {
      headers:new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':'auth-token',
        'Access-Control-Allow-origin':'*'
      })
    };
    return this.httpClient.delete<Category>(this.categoryUrl + `/${id}`,httpOptions);
  }
}

interface GetCategoryResponse{
  _embedded:{
    categories:Category[];
  }
}