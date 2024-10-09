// src/app/my-service.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',  // Makes the service available throughout the app
})
export class MyService {

  private apiUrl = 'https://jsonplaceholder.typicode.com/posts'; // Example API

  constructor(private http: HttpClient) { }

  // Method to get data from API
  getPosts(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
