import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { genOtp } from '../interfaces';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-otp-verify',
  templateUrl: './otp-verify.component.html',
  styleUrls: ['./otp-verify.component.css']
})
export class OtpVerifyComponent implements OnInit {
  constructor(
    private getAllAuthService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}
  valueOtp: string;
  ngOnInit() {
    window.alert('Plz verify your phone Number to proceed further');
    console.log(this.getAllAuthService.userInfo);
    // this.otpInfo.userId=this.getAllAuthService.userInfo.userId
  }

  sendOtpEvent(event) {
    const otpInfo = new genOtp(
      this.getAllAuthService.userInfo().userId,
      'candidate',
      'verify'
    );
    this.getAllAuthService.sendOtp(otpInfo).subscribe(data => {
      console.log(data);
    });
    // this.getAllAuthService.emailGenerate().subscribe(response => {
    //   if (response.status === 'true') {
    //     this.toastr.success('Email Sent for verification');
    //   }
    // });
  }
  otpEvent(event) {
    this.valueOtp = event.target.value;
  }
  verifyOtpEvent(event) {
    this.getAllAuthService
      .matchOtp(`${this.getAllAuthService.userInfo().userId}/${this.valueOtp}`)
      .subscribe(data => {
        if (data.status == 'false') {
          this.toastr.error('Incorrect Otp');
        } else {
          this.toastr.success('Matched Successfully Plz Login Again');
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
        }
      });
  }
}
