import { Component, OnInit } from '@angular/core';
import {
  jobData,
  interviewerData,
  scheduleData,
  assignData,
  closeData,
  scheduleInterviewerPopulateData
} from 'src/app/interfaces';
import { categoryData, appliedData } from '../../interfaces';
import { GetjobService } from '../../getjob.service';
import { GetCategoryService } from '../../get-category.service';
import { GetInterviewerService } from '../../get-interviewer.service';
import { GetappliedService } from '../../getapplied.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GetScheduleService } from '../../get-schedule.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-schedule-interview',
  templateUrl: './schedule-interview.component.html',
  styleUrls: ['./schedule-interview.component.css']
})
export class ScheduleInterviewComponent implements OnInit {
  jobs: jobData[];
  appliedInfo: appliedData[];
  formgroup = new FormGroup({
    jobId: new FormControl('', [Validators.required]),
    candidateId: new FormControl('', [Validators.required]),
    interviewerId: new FormControl('', [Validators.required]),
    time: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required])
  });

  category: categoryData[];
  designation: String[];
  profile: categoryData[];
  interviewers: interviewerData[];
  scheduleInfo: scheduleData;
  interviewsDone: scheduleInterviewerPopulateData[];
  date: any;
  constructor(
    private getAllJobService: GetjobService,
    private getAllAppliedService: GetappliedService,
    private getAllCategoryService: GetCategoryService,
    private getAllInterviewerService: GetInterviewerService,
    private getAllScheduleService: GetScheduleService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getAllJobService.getAllJob().subscribe(data => (this.jobs = data));
    this.getAllCategoryService.getAllCategory().subscribe(data => {
      this.category = data;
    });
    this.date = new Date().toISOString().substr(0, 10);
  }
  jobSelected(event) {
    this.getAllAppliedService
      .getAllCandidate(event.target.value)
      .subscribe(data => {
        this.appliedInfo = data;
        console.log(this.appliedInfo);
      });
  }
  candidateSelected() {
    this.getAllScheduleService
      .getCandidateHistory(
        `http://localhost:8000/api/schedule/${this.formgroup.value.jobId}/${
          this.formgroup.value.candidateId
        }`
      )
      .subscribe(data => {
        console.log(data);
        this.interviewsDone = data;
      });
  }
  categorySelected(event) {
    this.profile = this.category.filter(ele => {
      return ele.category === event.target.value;
    });
    this.designation = this.profile[0].designation;
  }
  designationSelected(event) {
    let cat = this.profile[0].category;
    let des: string = event.target.value;
    des = 'http://localhost:8000/api/interviewer/' + cat + '/' + des;
    this.getAllInterviewerService.getInterviewerList(des).subscribe(data => {
      this.interviewers = data;
      console.log('data ', data);
      console.log('interviewers');
      console.log(this.interviewers);
    });
  }
  acceptApplication() {
    const closeInfo = new closeData(
      this.formgroup.value.candidateId,
      this.formgroup.value.jobId,
      'Success'
    );

    this.getAllAppliedService.closeApplication(closeInfo).subscribe(data => {
      console.log('Application closed success');
    });
  }
  rejectApplication() {
    const closeInfo = new closeData(
      this.formgroup.value.candidateId,
      this.formgroup.value.jobId,
      'Reject'
    );

    this.getAllAppliedService.closeApplication(closeInfo).subscribe(data => {
      console.log('Application closed reject');
    });
  }
  onSubmit() {
    this.scheduleInfo = this.formgroup.value;
    this.getAllScheduleService
      .assignInterviewer(this.scheduleInfo)
      .subscribe(data => console.log(data));
    const assignInfo = new assignData(
      this.formgroup.value.candidateId,
      this.formgroup.value.jobId
    );
    // this.assignInfo.candidateId = this.formgroup.value.candidateId;
    // this.assignInfo.jobId = this.formgroup.value.jobId;

    this.getAllAppliedService.interviewAssigned(assignInfo).subscribe(data => {
      if (data.status == 'true') {
        this.toastr.success('Interview Scheduled');
        this.formgroup.reset();
      }
    });
  }
}
