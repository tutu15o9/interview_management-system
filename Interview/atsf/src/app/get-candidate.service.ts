import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { candidateData } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class GetCandidateService {
  private url: String = ' http://localhost:8000/api';
  constructor(private http: HttpClient) {}

  createNewCandidate(data: candidateData): Observable<candidateData> {
    return this.http.post<candidateData>(this.url + '/candidate/signup', data);
  }
  addUploadsToCandidate(uploads, userId) {
    return this.http.post(
      this.url + `/candidate/add/uploads/${userId}`,
      uploads
    );
  }
  myProfile(data: string) {
    return this.http.get<candidateData>(
      this.url + `/candidate/myprofile/` + data
    );
  }
}
