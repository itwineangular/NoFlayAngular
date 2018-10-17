import { Injectable } from '@angular/core';
import { Constants } from "../../../Constants";
import { Http, Headers, RequestOptions } from '@angular/http';
import { map } from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class MembershipCardService {
  url = Constants.HOME_URL;

  constructor(private http : Http) { }

  getInstitution() {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
    let options = { headers: headers };
    return this.http.get(this.url + '/institutions/list', options).pipe(map(res => res.json()));
  }

  getPlanName() {
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
    let options = { headers: headers };
    return this.http.get(this.url+'/plans/list', options).pipe(map(res => res.json()));
  }

  searchStudent(studentsData) {
    let obj =
    {
      "institutionName": studentsData.institutionName,
      "courseCategory": studentsData.courseCategory,
      "course": studentsData.course,
      "stdName": studentsData.stdName
    };
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
    let options = { headers: headers };
    return this.http.post('http://192.168.1.57:9090/students/searchByCriteria', obj, options).pipe(map(res => res.json()));
  }
}
