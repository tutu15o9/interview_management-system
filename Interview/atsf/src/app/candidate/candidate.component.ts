import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css']
})
export class CandidateComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}
  candidateId: string;
  a: boolean = false;
  b: boolean = false;
  c: boolean = false;
  d: boolean = false;
  ngOnInit() {
    this.candidateId = this.auth.userInfo().userId;
  }
  myProfile() {
    this.router.navigate([`/candidate/myprofile/${this.candidateId}`]);
  }

  b1() {
    this.a = false;
    this.b = true;
    this.c = false;
    this.d = false;
  }
  c1() {
    this.a = false;
    this.b = false;
    this.c = true;
    this.d = false;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
