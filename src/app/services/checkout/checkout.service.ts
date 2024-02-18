import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private apiurl = "http://localhost:5000/api"
  constructor(private http:HttpClient){}

  proceedPayment(body:any): Observable<any>{
    return this.http.post<any>(`${this.apiurl}/checkout`, body);
  }


}
