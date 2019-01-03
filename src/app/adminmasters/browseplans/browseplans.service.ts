import { Injectable } from '@angular/core';
import { Constants } from "../../Constants";
import { Http, Headers, RequestOptions } from '@angular/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class BrowseplansService {

  tokens = sessionStorage.getItem("token_type");
  url = Constants.HOME_URL;
  constructor(private http: Http) { }

  getPlan() {
    let headers = new Headers({
      'Content-Type': 'application/json',
      // 'Authorization': 'Bearer ' + this.tokens
    });
    
    let options = { headers: headers };
    return this.http.get('http://192.168.1.65:9090/plans/list',options).pipe(map(res => res.json()));
  }

  updateStudent(data) {
    let obj = {
      "stdName": data.stdName,
      "addressOne": data.addressOne,
      "addressTwo": data.addressTwo,
      "city": data.city,
      "state": data.state,
      "zipCode": data.zipCode,
      "countryName": data.countryName,
      "stdMobile": data.stdMobile,
      "gender": data.gender,
      "stdEmail": data.stdEmail,
      "stdRollnumber": data.stdRollnumber,
      "institutionId": data.institutionId,
      "courseId": data.courseId,
      "categoryId": data.categoryId,
      "planId": data.planId,
      "statusId": data.statusId,
      "yearofjoining": data.yearofjoining,
      "planStartDate":data.planStartDate,
      "planEndDate":data.planEndDate,
      "mcmId":data.mcmId
    };

    let headers = new Headers({
      'Content-Type': 'application/json',
      // 'Authorization': 'Bearer ' + this.tokens
    });
    
    let options = { headers: headers };
    // console.log(data.businessCategoryId);
    // console.log(obj);
    return this.http.put( 'http://192.168.1.65:9090/students/update/' + data.stdId, obj, options).pipe(map(res => res.json()));
  }

}
