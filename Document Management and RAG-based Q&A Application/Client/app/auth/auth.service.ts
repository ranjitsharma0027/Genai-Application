import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authStatus = new BehaviorSubject<boolean>(this.isAuthenticated());
  authStatus$ = this.authStatus.asObservable();

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  login(credentials: { username: string; password: string }) {
    return this.http.post('/api/auth/login', credentials).subscribe((res: any) => {
      localStorage.setItem('token', res.token);
      this.authStatus.next(true);
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.authStatus.next(false);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token && !this.jwtHelper.isTokenExpired(token);
  }
}
