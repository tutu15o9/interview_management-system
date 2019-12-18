import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  appliedData,
  assignData,
  jobData,
  closeData,
  appliedJobData
} from './interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetappliedService {
  private url: string = 'http://localhost:8000/api/';
  constructor(
    private getAllAppliedService: GetappliedService,
    private http: HttpClient
  ) {}

  getAllCandidate(data: string) {
    return this.http.get<appliedData[]>(this.url + 'apply/' + data);
  }
  applyForJob(data: assignData) {
    return this.http.post<appliedData>(this.url + 'apply/', data);
  }
  interviewAssigned(data: assignData): Observable<{ status }> {
    return this.http.post<{ status }>(this.url + 'apply/assign', data);
  }
  closeApplication(data: closeData): Observable<appliedData> {
    return this.http.post<appliedData>(this.url + 'apply/assign/close', data);
  }

  createNewJob(data: jobData): Observable<jobData> {
    return this.http.post<jobData>(this.url + 'admin/addjob', data);
  }
  getAppliedJob(data: string): Observable<appliedJobData[]> {
    console.log(data);
    console.log('cane to g a s');
    return this.http.get<appliedJobData[]>(
      this.url + 'apply/candidate/' + data
    );
  }
}
