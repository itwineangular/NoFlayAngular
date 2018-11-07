import { Injectable } from '@angular/core';
import { Constants } from "../Constants";
import { Http, Headers, RequestOptions } from '@angular/http';
import { map } from "rxjs/operators";
import { Angular2TokenService } from 'angular2-token';

@Injectable({
  providedIn: 'root'
})
export class StudentregistrationService {
 


  url = Constants.HOME_URL;
  constructor(private http: Http,
    private tokenService: Angular2TokenService) {
      tokenService.init();
     }

     saveStudent(data, institute, courseCategory, course, plan) {
      console.log(data);
         let obj = {
     
           "stdName": data.stdName,
            "stdMobile": data.stdMobile,
           "stdEmail": data.stdEmail,
           "stdRollnumber": data.stdRollnumber,
           "institutionName": institute[0].instName,
           "courseName": course[0].courseName,
           "courseCategory": courseCategory[0].categoryName,
           "plan": plan[0].planName
     
          
           // "stdName": "Bhagyapgowda",
           // "stdMobile": 8898989876,
           // "stdEmail": "bhagyagowda@itwinetech.com",
           // "stdRollnumber": 103,
           // "institutionName": "BMS Eng",
           // "courseCategory": "UG",
           // "courseName": "BE",
           // "plan": "Gold"
          
     
     
         };
         console.log(obj);
         let headers = new Headers({
     
           'Content-Type': 'application/json'
     
         });
     
         headers.append('Access-Control-Allow-Origin', '*');
         headers.append('Access-Control-Allow-Headers', 'Content-Type');
         headers.append('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
         let options = { headers: headers };
         
         // console.log(obj);
         return this.http.post(this.url + '/students/create', obj, options);
     
       }

       getStudent() {
        let headers = new Headers({
          'Content-Type': 'application/json'
        });
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Headers', 'Content-Type');
        headers.append('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
        let options = { headers: headers };
        return this.http.get(this.url + '/students/list', options).pipe(map(res => res.json()));
      }

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

      getCourse() {
        let headers = new Headers({
          'Content-Type': 'application/json'
        });
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Headers', 'Content-Type');
        headers.append('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
        let options = { headers: headers };
        return this.http.get(this.url + '/courseprofile/list', options).pipe(map(res => res.json()));
      }

      getCourseCategory() {
        let headers = new Headers({
          'Content-Type': 'application/json'
        });
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Headers', 'Content-Type');
        headers.append('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
        let options = { headers: headers };
        return this.http.get(this.url + '/coursecategory/list', options).pipe(map(res => res.json()));
      }

      getPlanName() {
        let headers = new Headers();
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Headers', 'Content-Type');
        headers.append('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
        let options = { headers: headers };
        return this.http.get(this.url + '/plans/list', options).pipe(map(res => res.json()));
      }
    
}
