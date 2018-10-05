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
  constructor(private http : Http,
    private tokenService: Angular2TokenService) {
      tokenService.init();
     }

  getStatus() {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
    let options = { headers: headers };
    return this.http.get(this.url + '/studentStatus/list', options).pipe(map(res => res.json()));
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

  saveStudent(data,institute,courseCategory,course) {
    let obj = {

      "stdName": data.stdName,
      "addressOne": data.addressOne,
      "addressTwo": data.addressTwo,
      "city": data.city,
      "state": data.state,
      "zipcode": data.zipcode,
      "countryName": data.countryName,
      "stdPhone": data.stdPhone,
      "gender": data.gender,
      "stdEmail": data.stdEmail,
      "stdAdmissionNumber": data.stdAdmissionNumber,
      "institutionName": institute,
      "course": course,
      "courseCategory": courseCategory,
      "plan": data.plan,
      "status": data.status
      // "yearofjoining": data.yearofjoining
    };


    console.log(obj);
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
    let options = { headers: headers };
    return this.http.post(this.url + '/students/create', obj, options).pipe(map(res => res.json()));

  }

  updateStudent(data,institute,courseCategory,course) {
    let obj = {
      "stdId": data.stdId,
      "stdName": data.stdName,
      "addressOne": data.addressOne,
      "addressTwo": data.addressTwo,
      "city": data.city,
      "state": data.state,
      "zipcode": data.zipcode,
      "countryName": data.countryName,
      "stdPhone": data.stdPhone,
      "gender": data.gender,
      "stdEmail": data.stdEmail,
      "stdAdmissionNumber": data.stdAdmissionNumber,
      "institutionName": institute,
      "course": course,
      "courseCategory": courseCategory,
      "plan": data.plan,
      "status": data.status
      // "yearofjoining": data.yearofjoining
    };

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
    let options = { headers: headers };
    // console.log(data.businessCategoryId);
    // console.log(obj);
    return this.http.put(this.url + '/students/update/' + data.stdId, obj, options).pipe(map(res => res.json()));
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



  deleteStudent(stdId) {
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
    let options = { headers: headers };
    return this.http.get(this.url + '/students/delete/' + stdId, options).pipe(map(res => res.json()));
  }

  upload(formData)
   {
    let headers = this.tokenService.currentAuthHeaders;
    headers.delete('Content-Type');
    let options = new RequestOptions({ headers: headers });

    return this.tokenService.request({
      method: 'post',
      url: `http://192.168.1.44:8080/mcmwebservices/uploadFile`,
      body: formData,
      headers: options.headers
    }).pipe(map(res => res.json()));
  }

  uploadCsvFile(studentsData)
  {
    console.log("here");
   let headers = new Headers();
     headers.append('Access-Control-Allow-Origin','*');
     headers.append('Access-Control-Allow-Credentials','true');
     headers.append('Access-Control-Allow-Headers','Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
     headers.append('Access-Control-Allow-Methods','GET,POST,OPTIONS,DELETE,PUT');
     let options = { headers: headers };
     return this.http.post(this.url+'/students/uploadStudentProfile',studentsData,options);
  
   //  return this.http.post(this.url+'/students/startJob',options);
 }

 uploadImage(imageFile)
 {
   console.log("here");
  let headers = new Headers();
    headers.append('Access-Control-Allow-Origin','*');
    headers.append('Access-Control-Allow-Credentials','true');
    headers.append('Access-Control-Allow-Headers','Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    headers.append('Access-Control-Allow-Methods','GET,POST,OPTIONS,DELETE,PUT');
    let options = { headers: headers };

  return this.http.post(this.url+'/uploadFile',imageFile,options);
}

getPlanName() {
  let headers = new Headers();
  headers.append('Access-Control-Allow-Origin', '*');
  headers.append('Access-Control-Allow-Headers', 'Content-Type');
  headers.append('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
  let options = { headers: headers };
  return this.http.get(this.url+'/plans/list', options).pipe(map(res => res.json()));
}

getBulkStudentsdata() {
  let headers = new Headers();
  headers.append('Access-Control-Allow-Origin', '*');
  headers.append('Access-Control-Allow-Headers', 'Content-Type');
  headers.append('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
  let options = { headers: headers };
  return this.http.get(this.url+'/students/viewExcelData', options).pipe(map(res => res.json()));
}

searchStudent(studentsData) {
  let obj =
  {
    "institutionName": studentsData.institutionName,
    "courseCategory": studentsData.courseCategory,
    "course": studentsData.course,
    "status": studentsData.status
  };
  console.log(obj);
  let headers = new Headers({
    'Content-Type': 'application/json'
  });
  headers.append('Access-Control-Allow-Origin', '*');
  headers.append('Access-Control-Allow-Headers', 'Content-Type');
  headers.append('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
  let options = { headers: headers };
  return this.http.post(this.url+'/students/searchList', obj, options).pipe(map(res => res.json()));
}

}