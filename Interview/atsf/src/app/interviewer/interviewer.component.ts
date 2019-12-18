import { Component, OnInit } from '@angular/core';
import { scheduleData, closeData, candidateData } from '../interfaces';
import { GetScheduleService } from '../get-schedule.service';
import { GetappliedService } from '../getapplied.service';
import { GetCandidateService } from '../get-candidate.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-interviewer',
  templateUrl: './interviewer.component.html',
  styleUrls: ['./interviewer.component.css']
})
export class InterviewerComponent implements OnInit {
  allInterviewerSchedule: scheduleData[];
  comment: string;
  myProfile: candidateData;

  constructor(
    private getAllScheduleService: GetScheduleService,
    private auth: AuthService,
    private getAllAppliedService: GetappliedService,
    private getAllCandidateService: GetCandidateService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    const interviewerInfo = this.auth.userInfo();
    this.getAllScheduleService
      .getInterviewerSchedule(
        'http://localhost:8000/api/schedule/' + interviewerInfo.userId
      )
      .subscribe(data => {
        this.allInterviewerSchedule = data;
        console.log('interviewer schedule ', this.allInterviewerSchedule);
      });
  }
  seeProfile(event, candidateId) {
    console.log('my id ', candidateId);
    this.router.navigate(['/candidate/myprofile/' + candidateId]);
  }
  commentChanged(event) {
    this.comment = event.target.value;
  }
  rejectSchedule(event, schedule) {
    this.getAllScheduleService
      .rejectSchedule(
        'http://localhost:8000/api/schedule/reject/' + schedule._id
      )
      .subscribe(data => window.alert('rejected'));

    const closeInfo = new closeData(
      schedule.candidateId,
      schedule.jobId,
      'InterviewToBeScheduled'
    );
    this.getAllAppliedService.closeApplication(closeInfo).subscribe(data => {
      console.log('Application status Changed');
      this.toastr.error('Rejected');
    });
  }
  submitResponse(event, schedule) {
    schedule.comment = this.comment;
    this.getAllScheduleService
      .submitResponse(schedule)
      .subscribe(data => console.log(data));

    const closeInfo = new closeData(
      schedule.candidateId,
      schedule.jobId,
      'InterviewToBeScheduled'
    );
    this.getAllAppliedService.closeApplication(closeInfo).subscribe(data => {
      console.log('Application status changed');
      this.toastr.success('Submitted');
    });
  }
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
