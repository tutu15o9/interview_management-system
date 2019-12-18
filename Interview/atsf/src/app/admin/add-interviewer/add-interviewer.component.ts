import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GetCategoryService } from '../../get-category.service';
import { categoryData } from 'src/app/interfaces';
import { Router } from '@angular/router';
import { GetInterviewerService } from '../../get-interviewer.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-interviewer',
  templateUrl: './add-interviewer.component.html',
  styleUrls: ['./add-interviewer.component.css']
})
export class AddInterviewerComponent implements OnInit {
  formgroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),
    category: new FormControl('', [Validators.required]),
    designation: new FormControl('', [Validators.required])
  });
  category: categoryData[];
  designation: String[];
  profile: categoryData[];
  constructor(
    private getAllCategoryService: GetCategoryService,
    private getAllInterviewerService: GetInterviewerService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getAllCategoryService.getAllCategory().subscribe(data => {
      this.category = data;
    });
  }
  categorySelected(event) {
    this.profile = this.category.filter(ele => {
      return ele.category === event.target.value;
    });
    this.designation = this.profile[0].designation;
  }
  onSubmit() {
    const interviewerProfile = this.formgroup.value;
    console.log(interviewerProfile);
    this.getAllInterviewerService
      .createNewInterviewer(interviewerProfile)
      .subscribe(data => {
        console.log('Hi' + data);
        this.toastr.success('Interviewer Added');
        this.formgroup.reset();
      });
  }
}
