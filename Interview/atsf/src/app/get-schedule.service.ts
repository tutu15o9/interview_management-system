import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  scheduleData,
  scheduleInterviewerPopulateData,
  appliedLatestData
} from './interfaces';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GetScheduleService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  assignInterviewer(data: scheduleData) {
    return this.http.post<scheduleData>(
      `http://localhost:8000/api/admin/assigninterviewer`,
      data
    );
  }
  getCandidateHistory(data: string) {
    return this.http.get<scheduleInterviewerPopulateData[]>(data);
  }

  getCandidateLatest() {
    return this.http.get<appliedLatestData[]>(
      `http://localhost:8000/api/apply/candidate/myjob/${
        this.auth.userInfo().userId
      }`
    );
  }
  getInterviewerSchedule(data: string) {
    return this.http.get<scheduleData[]>(data);
  }
  rejectSchedule(data: string) {
    return this.http.get<scheduleData>(data);
  }
  submitResponse(data: scheduleData) {
    return this.http.post<scheduleData>(
      `http://localhost:8000/api/schedule/submitresponse`,
      data
    );
  }
}
