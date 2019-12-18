import { Component, OnInit } from '@angular/core';
import { GetCandidateService } from '../get-candidate.service';
import { ActivatedRoute } from '@angular/router';
import { candidateData } from '../interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  candidateId: string;
  myProfile: candidateData;
  constructor(
    private getAllCandidateService: GetCandidateService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.candidateId = this.route.snapshot.paramMap.get('id');
    this.getAllCandidateService.myProfile(this.candidateId).subscribe(data => {
      this.myProfile = data;
      console.log('MyProfile ', this.myProfile);
    });
  }
  getFileUrl(fileName) {
    return `http://localhost:8000/api/candidate/getassets/${fileName}`;
  }
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  login() {
    this.router.navigate(['/login']);
  }
}
