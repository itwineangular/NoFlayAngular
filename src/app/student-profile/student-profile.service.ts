import { Injectable } from '@angular/core';
import { Constants } from "../Constants";
import { Http, Headers, RequestOptions } from '@angular/http';
import { map } from "rxjs/operators";
import { Student } from "../../app/adminmasters/institutions/student/student";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StudentProfileService {

  url = Constants.HOME_URL;
  constructor(private http: Http) { }

  getStudent(studentMailId: string) {
    return this.http.get('http://192.168.1.51:9090/students/findByStdEmail?stdEmail=' +studentMailId).pipe(map(res => res.json()));
  }

  

  updateStudent(data) {
    console.log(data);
    let obj = {
      "stdId": data.stdId,
      "stdName": data.stdName,
      "addressOne": data.addressOne,
      "addressTwo": data.addressTwo,
      "city": data.city,
      "state": data.state,
      "zipCode": data.zipCode,
      "countryName": data.countryName,
      "stdMobile": data.stdMobile,
      "stdEmail": data.stdEmail,
      // ,ljfg
      "categoryId":data.categoryId,
      "courseId":data.courseId,
      "parPhone":data.parPhone,
      "courseCategory":  data.courseCategory,
      "courseName":  data.courseName,
      "createDateTime": data.createDateTime,
      "createdBy":  data.createdBy,
      "gender":  data.gender,
      "institutionId":data.institutionId,
      "institutionName": data.institutionName,
      "mcmId":  data.mcmId,
      "membershipType":  data.membershipType,
      "modifiedBy":  data.modifiedBy,
      "modifiedDateTime": data.modifiedDateTime,
      "plan": data.plan,
      "planId":data.planId,
      "planName":data.planName,
      "statusId":data.statusId,
      "statusName":data.statusName,
      "stdImage":data.stdImage,
      "planAmount":  data.planAmount,
      "planEndDate":  data.planEndDate,
      "planStartDate": data.planStartDate,
      "status":  data.status,
      "stdRollnumber": data.stdRollnumber,
      "yearOfJoining": data.yearOfJoining
    };

    console.log(obj);

    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let options = { headers: headers };
    // console.log(data.businessCategoryId);
    // console.log(obj);
    //return null;
    return this.http.put(this.url + '/students/update/' + data.stdId, obj, options).pipe(map(res => res.json()));
  }

  getPaymentDetails(stdId: number)
  {
     return this.http.get('http://192.168.1.51:9090/payments/getPaymentHistory/'+ stdId).pipe(map(res => res.json()));
  }

}
