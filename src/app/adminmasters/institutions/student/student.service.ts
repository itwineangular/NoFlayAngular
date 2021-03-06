import { Injectable } from '@angular/core';
import { Constants } from "../../../Constants";
import { Http, Headers, RequestOptions } from '@angular/http';
import { map } from "rxjs/operators";
import { Angular2TokenService } from 'angular2-token';




@Injectable({
  providedIn: 'root'
})
export class StudentService {


  url = Constants.HOME_URL;
  tokens = sessionStorage.getItem("token_type");
  constructor(private http : Http,
    private tokenService: Angular2TokenService) {
      tokenService.init();
     }

  getStatus() {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokens
    });
    
    let options = { headers: headers };
    return this.http.get(this.url +'/status/list', options).pipe(map(res => res.json()));
  }

  // getPlan() {
  //   let headers = new Headers({
  //     'Content-Type': 'application/json'
  //   });
  //   headers.append('Access-Control-Allow-Origin', '*');
  //   headers.append('Access-Control-Allow-Headers', 'Content-Type');
  //   headers.append('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
  //   let options = { headers: headers };
  //   return this.http.get(this.url + '/plans/list', options).pipe(map(res => res.json()));
  // }

  saveStudent(data) {
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
      "yearofjoining": data.yearofjoining
    };


    console.log(obj);
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokens
    });
   
    let options = { headers: headers };
    return this.http.post(this.url + '/students/create', obj, options).pipe(map(res => res.json()));

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
      "yearofjoining": data.yearofjoining
    };

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokens
    });
    
    let options = { headers: headers };
    // console.log(data.businessCategoryId);
    // console.log(obj);
    return this.http.put(this.url + '/students/update/' + data.stdId, obj, options).pipe(map(res => res.json()));
  }

  getStudent() {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokens
    });
  
    let options = { headers: headers };
    return this.http.get(this.url + '/students/list', options).pipe(map(res => res.json()));
  }


  getInstitution() {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokens
    });
  
    let options = { headers: headers };
    return this.http.get(this.url + '/institutions/list', options).pipe(map(res => res.json()));
  }



  deleteStudent(stdId) {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokens
    });
   
    let options = { headers: headers };
    return this.http.get(this.url + '/students/delete/' + stdId, options).pipe(map(res => res.json()));
  }


  saveBulkStudentFile(data)
  {
    
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
      // "statusId": 1,
      "yearofjoining": data.yearofjoining
      
    };

    console.log("here");
    console.log(data);
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokens
    });
     let options = { headers: headers };
     return this.http.post(this.url+'/students/saveExcelStudProfile',data,options);
  
   //  return this.http.post(this.url+'/students/startJob',options);
 }

getPlanName() {
  let headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.tokens
  });
  let options = { headers: headers };
  return this.http.get(this.url+'/plans/list', options).pipe(map(res => res.json()));
}

getBulkStudentsdata() {
  let headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.tokens
  });
  let options = { headers: headers };
  return this.http.get('http://192.168.1.65:9090/students/viewExcelData', options).pipe(map(res => res.json()));
}

searchStudent(studentsData) {
  let obj =
  {
    "institutionId": studentsData.institutionId,
    "categoryId": studentsData.categoryId,
    "courseId": studentsData.courseId,    
    "statusId": studentsData.statusId,
    "stdName": studentsData.stdName,
    "mcmId":studentsData.mcmId

  };
  console.log(obj);
  let headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.tokens
  });
  
  let options = { headers: headers };
  return this.http.post(this.url+'/students/searchStudent', obj, options).pipe(map(res => res.json()));
  // return this.http.post(this.url+'/students/searchByCriteria', obj, options).pipe(map(res => res.json()));
}  

}
