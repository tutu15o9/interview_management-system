import { Component, OnInit } from '@angular/core';
import { appliedJobData, appliedLatestData } from '../../interfaces';
import { GetappliedService } from '../../getapplied.service';
import { GetScheduleService } from '../../get-schedule.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-myjobs',
  templateUrl: './myjobs.component.html',
  styleUrls: ['./myjobs.component.css']
})
export class MyjobsComponent implements OnInit {
  appliedJobs: appliedJobData[];
  appliedLatest: appliedLatestData[];
  constructor(
    private getAllAppliedService: GetappliedService,
    private auth: AuthService,
    private getAllScheduleService: GetScheduleService
  ) {}

  ngOnInit() {
    this.getAllAppliedService
      .getAppliedJob(this.auth.userInfo().userId)
      .subscribe(data => {
        console.log(data);
        this.appliedJobs = data;
        console.log(this.appliedJobs);
      });
    this.getAllScheduleService.getCandidateLatest().subscribe(data => {
      this.appliedLatest = data;
      console.log(' ################### Latest Data', this.appliedLatest);
    });
  }
}
