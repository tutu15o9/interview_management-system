import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  url: String;
  a: boolean = false;
  b: boolean = false;
  c: boolean = false;
  d: boolean = false;
  e: boolean = false;
  constructor(private router: Router) {}

  ngOnInit() {}
  a1() {
    this.a = true;
    this.b = false;
    this.c = false;
    this.d = false;
    this.e = false;
  }
  b1() {
    this.a = false;
    this.b = true;
    this.c = false;
    this.d = false;
    this.e = false;
  }
  c1() {
    this.a = false;
    this.b = false;
    this.c = true;
    this.d = false;
    this.e = false;
  }
  d1() {
    this.a = false;
    this.b = false;
    this.c = false;
    this.d = true;
    this.e = false;
  }
  e1() {
    this.a = false;
    this.b = false;
    this.c = false;
    this.d = false;
    this.e = true;
  }
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
