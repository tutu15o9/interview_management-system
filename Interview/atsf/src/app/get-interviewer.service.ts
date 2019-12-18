import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { interviewerData } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class GetInterviewerService {
  private url: string = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  createNewInterviewer(data: interviewerData): Observable<interviewerData> {
    return this.http.post<interviewerData>(
      this.url + '/admin/addinterviewer',
      data
    );
  }
  getInterviewerList(data: string) {
    console.log(data);
    return this.http.get<interviewerData[]>(data);
  }
}
