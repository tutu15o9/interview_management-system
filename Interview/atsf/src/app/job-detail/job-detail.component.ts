import { Component, OnInit } from '@angular/core';
import { jobData, assignData } from '../interfaces';
import { GetjobService } from '../getjob.service';
import { GetappliedService } from '../getapplied.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {
  constructor(
    private getAllJobService: GetjobService,
    private route: ActivatedRoute,
    private router: Router,
    private getAllAppliedService: GetappliedService,
    private auth: AuthService,
    private toastr: ToastrService
  ) {}
  jobId: string;
  job: jobData;
  canApply: boolean;
  ngOnInit() {
    this.jobId = this.route.snapshot.paramMap.get('id');
    console.log(this.jobId);
    this.getAllJobService.getDetailOfJob(this.jobId).subscribe(data => {
      this.job = data;
      console.log(this.job);
      this.canApply = false;
      if (this.auth.userInfo().role === 'candidate') {
        this.canApply = true;
      }
    });
  }
  login() {
    this.router.navigate(['/login']);
  }
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  onSubmit() {
    const candidateId = this.auth.userInfo();

    const assignInfo = new assignData(candidateId.userId, this.jobId);
    this.getAllAppliedService.applyForJob(assignInfo).subscribe(data => {
      if (data.status === 'applied') {
        this.toastr.success('Applied Successfully');
      } else {
        this.toastr.error('Already applied for similar profile recently');
      }
    });
  }
}
