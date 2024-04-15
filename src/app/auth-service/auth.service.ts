import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users?email=${username}`)
      .pipe(
        tap((response) => {
          if (response.length !== 0 && response[0].password == password) {
            localStorage.setItem('currentUser', JSON.stringify(response[0]));
            localStorage.setItem('token', response[0].email);
          } else {
            console.log("Invalid credentials.");
          }
        })
      );
  }

  signUp(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users`, userData).pipe(
      tap(response => localStorage.setItem('token', userData.email)),
      catchError(error => {
        console.error('Error signing up:', error);
        return of(null);
      })
    );
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  getCurrentUser(): any {
    return JSON.parse(localStorage.getItem('currentUser') || '{}');
  }
}
