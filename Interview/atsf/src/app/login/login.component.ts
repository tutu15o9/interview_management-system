import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { loginData, loginDetailData } from '../interfaces';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formgroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(
    private router: Router,
    private getAuthService: AuthService,
    private toastr: ToastrService
  ) { }

  ngOnInit() { }
  signup() {
    this.router.navigate(['/signup']);
  }
  onSubmit() {
    let loginInfo: loginData;
    loginInfo = this.formgroup.value;
    this.getAuthService.userLogin(loginInfo).subscribe(data => {
      console.log(data);
      if (data.role === 'admin') {
        this.router.navigate(['/admin']);
      } else if (data.role === 'candidate') {
        this.router.navigate(['/candidate']);
      } else if (data.role === 'interviewer') {
        this.router.navigate(['/interviewer']);
      } else {
        this.toastr.error('Invalid credentials');
      }
    });
  }
}
