import { Component, OnInit, Input } from '@angular/core';
import { jobData } from '../../interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.css']
})
export class JobCardComponent implements OnInit {
  @Input() job: jobData;
  constructor(private router: Router) {}

  ngOnInit() {
    // this.job;
    console.log(this.job);
  }
  jobDetail() {
    this.router.navigate(['/job/' + this.job._id]);
  }
}
