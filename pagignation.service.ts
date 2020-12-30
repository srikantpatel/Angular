import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PagignationService {

  constructor(private http: HttpClient) { }

  getUserInfo(){
    return this.http.get('http://localhost:8081/get');
  }
}
