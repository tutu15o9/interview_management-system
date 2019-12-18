import { Component, OnInit } from '@angular/core';
import { jobData } from '../../interfaces';
import { GetjobService } from '../../getjob.service';

@Component({
  selector: 'app-job-all',
  templateUrl: './job-all.component.html',
  styleUrls: ['./job-all.component.css']
})
export class JobAllComponent implements OnInit {
  jobs: jobData[];
  constructor(private getAllJobService: GetjobService) {}

  ngOnInit() {
    this.getAllJobService.getAllJob().subscribe(data => {
      this.jobs = data;
      console.log(this.jobs);
    });
  }
}
