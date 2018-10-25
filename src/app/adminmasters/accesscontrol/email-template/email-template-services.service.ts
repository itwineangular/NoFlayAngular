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

  saveEmailTemplate(templateName, templateCode) {
    let obj = {
      "emailTemplate": templateName,
      "emailContent": templateCode
    };
    console.log(obj);
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = { headers: headers };
   // return this.http.post('http://192.168.1.57:9090/email/saveEmailTemplate', obj, options).pipe(map(res => res.json()));
    return this.http.post(this.url + '/email/saveEmailTemplate', obj, options).pipe(map(res => res.json()));
  }

  getEmailTemplate(templateName)
  {
    // let headers = new Headers();
    //   headers.append('Access-Control-Allow-Origin','*');
    //   headers.append('Access-Control-Allow-Headers','Content-Type');
    //   headers.append('Access-Control-Allow-Methods','GET,POST,OPTIONS,DELETE,PUT');
    // let options = { headers: headers };
   // return this.http.get('http://192.168.1.57:9090/email/getEmailTemplate?templateName='+templateName).pipe(map(res => res.json()));
     return this.http.get(this.url+'/email/getEmailTemplate?templateName='+templateName).pipe(map(res => res.json()));
  }

}
