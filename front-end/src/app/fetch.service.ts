import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class FetchService {
  readonly URL;
  constructor(private http: HttpClient) {
    this.URL = 'http://localhost:3000';
  }
  get(url: string): Observable<any> {
    return this.http.get<any>(`${this.URL}/${url}`, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
    });
  }
  delete(url: string) {
    return this.http.delete(`${this.URL}/${url}`, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
    });
  }
  post(urlPost: string, object: object): Observable<any> {
    return this.http.post<any>(`${this.URL}/${urlPost}`, object, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
    });
  }
  put(url: string, object: object) {
    return this.http.put(`${this.URL}/${url}`, object, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
    });
  }
}
