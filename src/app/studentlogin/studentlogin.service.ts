import { Injectable } from '@angular/core';
import { Constants } from 'src/app/Constants';
import { Http, Headers, RequestOptions } from '@angular/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class StudentloginService {

  url = Constants.HOME_URL;
  tokens = sessionStorage.getItem("token_type");
  constructor(private http : Http) { }

  sendStudentPasswordResetRequestMail(studentId,template) {
    let obj =
    {
      "emailTemplate": "Password Reset",
      "emailContent":  template.emailContent
    };
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokens
    });
    
   

    console.log(studentId);
    console.log(template);
    console.log(obj);

    let options = { headers: headers };
    //http://localhost:8080/email/sendEmailByid/160
    return this.http.post(this.url+'/email/sendEmailByid/'+studentId, obj, options).pipe(map(res => res.json()));
  }

}