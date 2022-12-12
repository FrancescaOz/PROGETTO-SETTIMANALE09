import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

export interface AuthInfo{
  accessToken: string;
  user: {
    email: string;
    id: number;
    name: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
timeout: any;
url = 'http://localhost:4201'
private authSub = new BehaviorSubject<AuthInfo| null>(null);
user$ = this.authSub.asObservable();
jwthelper = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) {
    this.restore();
   }

   login(data: { email: string; password: string }) {
    return this.http.post<AuthInfo>(`${this.url}/login`, data).pipe(
        tap((data) => {

          console.log('user auth data:', data);
        }),
        tap((data) => {
          this.authSub.next(data);
          localStorage.setItem('user', JSON.stringify(data));
          this.autoLogOut(data);
        })
      );
  }

  register(data: { email: string; password: string; name: string }) {
    return this.http
      .post(`${this.url}/register`, data)
  }

  restore() {
    const userJson = localStorage.getItem('user');
    if (!userJson) {
      return;
    }
    const user: AuthInfo = JSON.parse(userJson);
    if (this.jwthelper.isTokenExpired(user.accessToken)) {
      return;
    }

    this.authSub.next(user);
    this.autoLogOut(user);
  }
  logout() {
    this.authSub.next(null);
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  autoLogOut(user: AuthInfo) {
    const dateEx = this.jwthelper.getTokenExpirationDate(
      user.accessToken
    ) as Date;
    const msEx = dateEx.getTime() - new Date().getTime();
    this.timeout = setTimeout(() => {
      this.logout();
    }, msEx);
  }
}
