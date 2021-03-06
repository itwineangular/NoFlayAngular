import { Injectable } from '@angular/core';
import { Constants } from "../../../Constants";
import { Http, Headers, RequestOptions } from '@angular/http';
import { map } from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class MembershipCardService {
  url = Constants.HOME_URL;
  tokens = sessionStorage.getItem("token_type");

  constructor(private http: Http) { }

  getInstitution() {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokens
    });
    
    let options = { headers: headers };
    return this.http.get(this.url + '/institutions/list', options).pipe(map(res => res.json()));
  }

  getPlanName() {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokens
    });
    
    let options = { headers: headers };
    return this.http.get(this.url + '/plans/list', options).pipe(map(res => res.json()));
  }

  getStatus() {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokens
    });
    
    let options = { headers: headers };
    return this.http.get(this.url + '/status/list', options).pipe(map(res => res.json()));
  }



  sendEmail(students) {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokens
    });
    
    let options = { headers: headers };
    return this.http.post(this.url + '/students/EmailStudProfile', students, options).pipe(map(res => res.json()));
  }

  sendStudentPaymentRequestMail(template, students) {
    let obj =
    {
      "emailTemplate": "Student Credentials",
      "emailContent": template
    };
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokens
    });
    
   

    let url = "http://192.168.1.51:9090/email/sendEmail/";
    students.forEach(element => {
      var loalUrl = url + element.stdId + ",";
      url = loalUrl;
    });

    var newStr = url;
    if (url.substring(url.length - 1) === ',') {
      newStr = url.substring(0, url.length - 1);
    }
    console.log(newStr);
    let options = { headers: headers };
    return this.http.post(newStr, obj, options).pipe(map(res => res.json()));
  }

 
  sendstudentCredentialtMail(template, students) {
    let obj =
    {
      "emailTemplate": "Student Credentials",
      "emailContent": template
    };
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokens
    });
    
   

    let url = "http://192.168.1.51:9090/email/studentCredential/";
    students.forEach(element => {
      var loalUrl = url + element.stdId + ",";
      url = loalUrl;
    });

    var newStr = url;
    if (url.substring(url.length - 1) === ',') {
      newStr = url.substring(0, url.length - 1);
    }
    console.log(newStr);
    let options = { headers: headers };
    return this.http.post(newStr, obj, options).pipe(map(res => res.json()));
  }



  generateMCMId(students) {

    console.log(students);

    let studentIdArrays = [];
    students.forEach(element => {
      studentIdArrays.push(element.stdId);
    });


    let obj = {
      "stdIdArr": studentIdArrays
    };
    

    console.log(obj);
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokens
    });
    
    let options = { headers: headers };
    return this.http.post(this.url + '/students/updateMCMID', obj, options).pipe(map(res => res.json()));
  }
}
