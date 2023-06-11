import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionApiService {
 
  constructor(private _http:HttpClient) { }

  addSubscription(data: any): Observable<any>{
    return this._http.post('http://localhost:3000/subscriptions', data)
  }

  updateSubscription(id:number,data: any): Observable<any>{
    return this._http.put(`http://localhost:3000/subscriptions/${id}`, data)
  }

  getSubscription(): Observable<any>{
    return this._http.get('http://localhost:3000/subscriptions')
  }

  deleteSubscription(id:number): Observable<any> {
    return this._http.delete(`http://localhost:3000/subscriptions/${id}`)
  }
}
