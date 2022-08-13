import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import { IProduct } from '../interface/products';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, retry, throwError } from 'rxjs';
const url_api="http://localhost:3000"
@Injectable({
  providedIn: 'root'
})
export class ExampleService {
  // url_api: string = "http://localhost:3000/products";

  constructor(private _http: HttpClient) { }

  getPDList(): Observable<IProduct[] > {
    return this._http.get<IProduct[]>(`${url_api}/products`).pipe(
      retry(3),
      catchError(this.handleError)
    );  
  }
  handleError(error: HttpErrorResponse){
  return throwError(()=>{new Error(error.message)})
  }
  getProductById(id: any):Observable<IProduct>{
    return this._http.get<IProduct>(`${url_api}/${id}`);
  }
  postProduct(data:IProduct){
    return this._http.post(`${url_api}/product`,data);
  }
  updateProduct(id:any,data:any):Observable<any>{
    return this._http.patch(`${url_api}/${id}`,data);
  }
  deleteProduct(id:any):Observable<any>{
    return this._http.delete(`${url_api}/${id}`);
  }
}
