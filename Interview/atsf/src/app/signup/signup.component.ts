import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GetCandidateService } from '../get-candidate.service';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  formgroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(10)
    ]),
    experienceMonth: new FormControl(),
    experienceYear: new FormControl(),
    defaultResumeLink: new FormControl(),
    video: new FormControl()
  });
  employeerForm = new FormGroup({
    prevEmployeer: new FormControl(),
    joiningDate: new FormControl(),
    leavingDate: new FormControl(),
    role: new FormControl()
  });
  educationalForm = new FormGroup({
    degree: new FormControl(),
    completionDate: new FormControl(),
    college: new FormControl()
  });
  employeer: [
    {
      prevEmployeer: String;
      joiningDate: Date;
      leavingdate: Date;
      role: String;
    }
  ];
  educational: [
    {
      degree: String;
      completionDate: Date;
      college: String;
    }
  ];
  constructor(
    private getAllCandidateService: GetCandidateService,
    private toastr: ToastrService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.employeer;
    this.educational;
  }
  onEmployeerUpdate() {
    if (this.employeer) {
      this.employeer.push(this.employeerForm.value);
    } else {
      this.employeer = [this.employeerForm.value];
    }
    
  }
  onEducationalUpdate() {
    if (this.educational) {
      this.educational.push(this.educationalForm.value);
    } else {
      this.educational = [this.educationalForm.value];
    }
  
  }
  resumeChanged(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formgroup.get('defaultResumeLink').setValue(file);
      console.log(this.formgroup.get('defaultResumeLink').value);
    }
  }
  videoChanged(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formgroup.get('video').setValue(file);
      console.log(this.formgroup.get('video').value);
    }
  }
  login() {
    this.router.navigate(['/login']);
  }
  onSubmit() {
    let candidateProfile = this.formgroup.value;
    candidateProfile.employeer = this.employeer;
    candidateProfile.educational = this.educational;
    this.getAllCandidateService
      .createNewCandidate(candidateProfile)
      .subscribe(data => {
        console.log('#####');
        const formData = new FormData();
        formData.append(
          'defaultResumeLink',
          this.formgroup.get('defaultResumeLink').value
        );
        formData.append('video', this.formgroup.get('video').value);
        console.log(data);
        this.getAllCandidateService
          .addUploadsToCandidate(formData, data._id)
          .subscribe(response => {
            console.log('@@@@@@@@@@@@@', response);
            this.toastr.success('Candidate Added');
            
          });
      });
  }
}
