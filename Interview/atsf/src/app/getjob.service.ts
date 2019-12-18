import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { jobData, categoryData, genreData } from './interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetjobService {
  private url: string = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) {}

  getAllJob(): Observable<jobData[]> {
    return this.http.get<jobData[]>(this.url + 'job');
  }
  getDetailOfJob(data: String): Observable<jobData> {
    return this.http.get<jobData>(this.url + 'job/' + data);
  }
  createNewJob(data: jobData): Observable<jobData> {
    return this.http.post<jobData>(this.url + 'admin/addjob', data);
  }
  createNewCategory(data: String): Observable<{ status }> {
    return this.http.post<{ status }>(this.url + 'admin/addcategory', data);
  }
  createNewDesignation(data: genreData): Observable<{ status }> {
    return this.http.post<{ status }>(this.url + 'admin/adddesignation', data);
  }
}
