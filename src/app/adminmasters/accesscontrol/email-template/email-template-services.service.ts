import { Injectable } from '@angular/core';
import { Constants } from "../../../Constants";
import { Http, Headers } from '@angular/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class EmailTemplateServicesService {

  url = Constants.HOME_URL;

  constructor(private http: Http) { }

  saveEmailTemplate(template) {
    // "emailContent": "<html><body><h1 style='color:red;'>Hi [name],</h1><br/><p>Welcome to Spring Boot.</p><br/><br/><h3>Thanks & Regards,<h3><br/><h3>admin</h3></body</html>"
    let obj = {
      "emailTemplate": "Student Credentials",
      "emailContent": template
    };
    console.log(obj);
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
    let options = { headers: headers };
    // return this.http.post('http://192.168.1.60:9090/email/sendEmail', obj, options).pipe(map(res => res.json()));
    return this.http.post(this.url + '/email/sendEmail', obj, options).pipe(map(res => res.json()));
  }

}
