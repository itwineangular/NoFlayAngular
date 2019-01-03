import { Injectable } from '@angular/core';
import { Constants } from "../../../Constants";
import { Http, Headers, RequestOptions } from '@angular/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailsService {

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

  searchStudent(studentsData) {
    console.log("studentsData");
    console.log(studentsData);
    var startDateLocal =studentsData.startDate.formatted;
    var endtDateLocal =studentsData.endDate.formatted;
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokens
    });
    
    let options = { headers: headers };
    //return this.http.post(this.url + '/students/searchStudent', obj, options).pipe(map(res => res.json()));
   // return this.http.get(this.url + '/students/getPaymentHistory?paymentDate=' + studentsData.paymentDate + '&stdId=&courseId=' + studentsData.courseId + '&categoryId=' + studentsData.categoryId + '&institutionId=' + studentsData.institutionId, options).pipe(map(res => res.json()));
  
    return this.http.get(this.url+'/students/searchPaymentHistory?institutionId=' + studentsData.institutionId +  '&categoryId=' + studentsData.categoryId + '&courseId=' + studentsData.courseId + '&stdId=' + studentsData.stdId1 +'&startDate=' + startDateLocal + '&endDate=' + endtDateLocal +'', options).pipe(map(res => res.json()));
    
  }

}
