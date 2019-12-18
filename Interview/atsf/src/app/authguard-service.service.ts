import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

let decoder = new JwtHelperService();
@Injectable({
  providedIn: 'root'
})
export class AuthguardServiceService implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    let token = localStorage.getItem('token');
    if (token) {
      let decode = decoder.decodeToken(token);
      switch (decode.role) {
        case 'candidate': {
          this.router.navigate(['/candidate/']);
          return true;
        }
        case 'interviewer': {
          this.router.navigate(['/interviewer']);
          return true;
        }
        case 'admin': {
          this.router.navigate(['/admin']);
          return true;
        }
        default: {
          return false;
        }
      }
    }
    return true;
  }
}
