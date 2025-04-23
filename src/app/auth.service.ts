import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/auth/login', { username, password }).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
      })
    );
  }  

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
  
  register(username: string, password: string): Observable<any> {
    return this.http.post('http://localhost:8080/api/auth/register', { username, password });
  }
  
  
}
