import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from '../admin/admin.component';
import { AddInterviewerComponent } from '../admin/add-interviewer/add-interviewer.component';
import { AddJobComponent } from '../admin/add-job/add-job.component';
import { AddCategoryComponent } from '../admin/add-category/add-category.component';
import { AddDesignationComponent } from '../admin/add-designation/add-designation.component';
import { SignupComponent } from '../signup/signup.component';
import { JobAllComponent } from '../candidate/job-all/job-all.component';
import { JobDetailComponent } from '../job-detail/job-detail.component';
import { LoginComponent } from '../login/login.component';
import { ScheduleInterviewComponent } from '../admin/schedule-interview/schedule-interview.component';
import { RoleGuardService } from '../role-guard.service';
import { InterviewerComponent } from '../interviewer/interviewer.component';
import { MyjobsComponent } from '../candidate/myjobs/myjobs.component';
import { ProfileComponent } from '../profile/profile.component';
import { CandidateComponent } from '../candidate/candidate.component';
import { OtpVerifyComponent } from '../otp-verify/otp-verify.component';
import { EmailverifyComponent } from '../emailverify/emailverify.component';
import { AuthguardServiceService } from '../authguard-service.service';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [RoleGuardService],
    data: { expectedRole: 'admin' },
    children: [
      { path: 'addinterviewer', component: AddInterviewerComponent },
      { path: 'addjob', component: AddJobComponent },
      { path: 'addcategory', component: AddCategoryComponent },
      { path: 'adddesignation', component: AddDesignationComponent },
      { path: 'scheduleinterview', component: ScheduleInterviewComponent }
    ]
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'emailverify/:id',
    component: EmailverifyComponent
  },
  {
    path: 'candidate/myprofile/:id',
    component: ProfileComponent
  },
  {
    path: 'user/otpverify',
    component: OtpVerifyComponent
  },
  {
    path: 'candidate',
    component: CandidateComponent,
    canActivate: [RoleGuardService],
    data: { expectedRole: 'candidate' },
    children: [
      { path: 'job', component: JobAllComponent },
      { path: 'myjobs', component: MyjobsComponent }
    ]
  },
  {
    path: 'job/:id',
    component: JobDetailComponent
  },
  {
    path: 'interviewer',
    component: InterviewerComponent,
    canActivate: [RoleGuardService],
    data: { expectedRole: 'interviewer' }
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthguardServiceService]
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];
@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouterModule {}
