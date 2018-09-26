import { Injectable } from '@angular/core';
import { Constants } from "../../../Constants";
import { Http, Headers, RequestOptions } from '@angular/http';
import { map } from "rxjs/operators";
import { Angular2TokenService } from 'angular2-token';

@Injectable({
  providedIn: 'root'
})
export class EducationalInstituteServicesService {

  url = Constants.HOME_URL;
  
  constructor(private http: Http,
    private tokenService: Angular2TokenService) {
    tokenService.init();
  }

  saveEducationalInstitute(institute,courseCategory ,courses) {

    let obj =
    {
      "instName": institute.instName,
      "instShortName": institute.instShortName,
      "instRegistrationCode": institute.instRegistrationCode,
      "instBranch": institute.instBranch,
      "instContactPerson": institute.instContactPerson,
      "instDesignation": institute.instDesignation,
      "instAddressone": institute.instAddressone,
      "instAddresstwo": institute.instAddresstwo,
      "instCountryname": institute.instCountryname,
      "instState": institute.instState,
      "instCity": institute.instCity,
      "instPincode": institute.instPincode,
      "instEmail": institute.instNainstEmailme,
      "instMobile": institute.instMobile,
      "instPhone": institute.instPhone,
      "instFax": institute.instFax,
      "instAccountHolderName": institute.instAccountHolderName,
      "instAccountNumber": institute.instAccountNumber,
      "instIfscCode": institute.instIfscCode,
      "instAccountType": institute.instAccountType,
      "instBankName": institute.instBankName,
      "instBankBranch": institute.instBankBranch
      // "courseProfiles": courses

    };
    console.log(obj);
    var myJsonString = JSON.stringify(obj);
    console.log(myJsonString);
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
    let options = { headers: headers };
    return this.http.post(this.url + '/institutions/create', obj, options).pipe(map(res => res.json()));
  }

  updateEducationalInstitute(institute, courses) {
    let obj =
    {
      "instName": institute.instName,
      "instShortName": institute.instShortName,
      "instRegistrationCode": institute.instRegistrationCode,
      "instBranch": institute.instBranch,

      "instContactPerson": institute.instContactPerson,
      "instDesignation": institute.instDesignation,
      "instAddressone": institute.instAddressone,
      "instAddresstwo": institute.instAddresstwo,
      "instCountryname": institute.instCountryname,
      "instState": institute.instState,
      "instCity": institute.instCity,
      "instPincode": institute.instPincode,
      "instEmail": institute.instNainstEmailme,
      "instMobile": institute.instMobile,
      "instPhone": institute.instPhone,
      "instFax": institute.instFax,

      "instAccountHolderName": institute.instAccountHolderName,
      "instAccountNumber": institute.instAccountNumber,
      "instIfscCode": institute.instIfscCode,
      "instAccountType": institute.instAccountType,
      "instBankName": institute.instBankName,
      "instBankBranch": institute.instBankBranch

    };
    console.log(courses);
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
    let options = { headers: headers };
    return this.http.put(this.url + '/institutions/update/' + institute.institutionId, obj, options).pipe(map(res => res.json()));
  }

  getEducationalInstitute() {
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
    let options = { headers: headers };

    return this.http.get(this.url + '/institutions/list', options).pipe(map(res => res.json()));
  }

  deleteEducationalInstitute(id) {
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
    let options = { headers: headers };
    return this.http.get(this.url + '/institutions/delete/' + id, options).pipe(map(res => res.json()));
  }

  searchEducationalInstitute(institute) {
    let obj =
    {
      "instName": institute.instName,
      "instShortName": institute.instShortName,
      "instRegistrationCode": institute.instRegistrationCode,
      "instBranch": institute.instBranch
    };
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
    let options = { headers: headers };
    return this.http.post(this.url + '/institutions/searchList', obj, options).pipe(map(res => res.json()));
  }

  // uploadImage(imageFile) {
  //   console.log("here");
  //   let headers = new Headers();
  //   headers.append('Access-Control-Allow-Origin', '*');
  //   headers.append('Access-Control-Allow-Credentials', 'true');
  //   headers.append('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  //   headers.append('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');

  //   // headers.append('file',imageFile);
  //   // headers.append('name',imageFile.name);

  //   let options = { headers: headers };

  //   return this.http.post(this.url + '/uploadFile', imageFile, options);
  // }

  // upload(formData) {
  //   let headers = this.tokenService.currentAuthHeaders;
  //   headers.delete('Content-Type');
  //   let options = new RequestOptions({ headers: headers });

  //   return this.tokenService.request({
  //     method: 'post',
  //     url: `http://192.168.1.55:8080/mcmwebservices/uploadFile`,
  //     body: formData,
  //     headers: options.headers
  //   }).pipe(map(res => res.json()));
  // }

  // getCoursesWithCourseCategory() {
  //   let headers = new Headers();
  //   headers.append('Access-Control-Allow-Origin', '*');
  //   headers.append('Access-Control-Allow-Headers', 'Content-Type');
  //   headers.append('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
  //   let options = { headers: headers };

  //   return this.http.get(this.url + '/coursecategory/fetch', options).pipe(map(res => res.json()));
  // }

}
