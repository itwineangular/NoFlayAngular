import { Injectable } from '@angular/core';
import { Constants } from "../../../Constants";
import { Http, Headers, RequestOptions } from '@angular/http';
import { map } from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class MembershipCardService {
  url = Constants.HOME_URL;

  constructor(private http: Http) { }

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
    return this.http.get(this.url + '/plans/list', options).pipe(map(res => res.json()));
  }

  getStatus() {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
    let options = { headers: headers };
    return this.http.get(this.url + '/status/list', options).pipe(map(res => res.json()));
  }

  searchStudent(studentsData) {
    let obj =
    {
      "institutionName": studentsData.institutionName,
      "courseCategory": studentsData.courseCategory,
      "courseName": studentsData.courseName,
      // "stdName": studentsData.stdName,
      "status": studentsData.status

    };
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
    let options = { headers: headers };
    return this.http.post(this.url + '/students/searchByCriteria', obj, options).pipe(map(res => res.json()));
  }

  sendEmail(students) {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
    let options = { headers: headers };
    return this.http.post(this.url + '/students/EmailStudProfile', students, options).pipe(map(res => res.json()));
  }

  sendStudentPaymentRequestMail(template) {
    let obj =
    {
      "emailTemplate": "Student Credentials",
      "emailContent": template
    };
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = { headers: headers };
    return this.http.post('http://192.168.1.55:8080/email/sendEmail', obj, options).pipe(map(res => res.json()));
  }

}
