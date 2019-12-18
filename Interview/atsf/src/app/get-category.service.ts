import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { categoryData, designationData } from "./interfaces";

@Injectable({
  providedIn: "root"
})
export class GetCategoryService {
  private url: string = "http://localhost:8000/api";
  constructor(private http: HttpClient) {}
  getAllCategory(): Observable<categoryData[]> {
    return this.http.get<categoryData[]>(this.url + "/genre/");
  }
  getAllDesignation(param: string): Observable<designationData> {
    return this.http.get<designationData>(this.url + "/genre/" + param);
  }
  createNewCategory(param: string): Observable<categoryData> {
    return this.http.post<categoryData>(
      this.url + "/admin/addCategory/",
      param
    );
  }
}
