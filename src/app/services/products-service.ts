import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Product } from "../interfaces/product-model";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn:'root'
})
export class ProductsService{
  private baseUrl = 'https://localhost:44347/api/product';
  public products = new BehaviorSubject<Product[]>([])
constructor(private http:HttpClient)
{}

public getAllproducts(aswishList:boolean): Observable<Product[]>
{
  return this.http.get<Product[]>(this.baseUrl+'/'+aswishList);
}
public delete(id:string):Observable<void>{
  return this.http.delete<void>(this.baseUrl+"/"+id);
}
public addOrUpdate(model:Product): Observable<Product>
{
  return this.http.post<Product>(this.baseUrl,{...model} as Product);
}
public toogleFavoritProduct(id:string){
  return this.http.post<void>(this.baseUrl+'/AddToWishList/'+id,null!);
}

}
