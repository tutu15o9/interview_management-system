import { Injectable } from '@angular/core';
import { loginData, loginDetailData, otpData, genOtp } from './interfaces';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public url: string = 'http://localhost:8000/api';
  constructor(private http: HttpClient) {}
  userLogin(loginInfo: loginData) {
    return this.http
      .post<loginDetailData>(`${this.url}/auth/login`, loginInfo)
      .pipe(
        map(data => {
          if (!data.token) {
            return data;
          }
          const token = JSON.stringify(data.token);
          const decode = helper.decodeToken(token);
          if (token) {
            localStorage.setItem('token', token);
          }
          return decode;
        })
      );
  }
  sendOtp(data: genOtp): Observable<otpData> {
    return this.http.post<otpData>(`${this.url}/candidate/otpgen/`, data);
  }
  matchOtp(data: string): Observable<{ status: string }> {
    return this.http.get<{ status: string }>(
      `${this.url}/candidate/otpverify/${data}`
    );
  }
  emailGenerate(): Observable<{ status: string }> {
    console.log('@@@####@@@');
    console.log(this.userInfo());
    return this.http.post<{ status: string }>(
      `${this.url}/candidate/emailgen`,
      { userId: this.userInfo().userId }
    );
  }

  emailVerify(data: string): Observable<{ status: string }> {
    return this.http.get<{ status: string }>(
      `${this.url}/candidate/emailverify/${data}`
    );
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !helper.isTokenExpired(token);
  }
  public userInfo() {
    const token = localStorage.getItem('token');
    const decode = helper.decodeToken(token);
    return decode;
  }
}
