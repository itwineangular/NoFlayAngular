import { Injectable } from '@angular/core';
import { Constants } from "../../../Constants";
import { Http, Headers, RequestOptions } from '@angular/http';
import { map } from "rxjs/operators";
import { Angular2TokenService } from 'angular2-token';
import { SelectedCourses } from "./educational-institute";

@Injectable({
  providedIn: 'root'
})
export class EducationalInstituteServicesService {

  url = Constants.HOME_URL;
  selectedCourses : SelectedCourses = new SelectedCourses();
  arrayCC = ["9","10","11"];
   array = ["4","5","6"];
  
  constructor(private http: Http,
    private tokenService: Angular2TokenService) {
    tokenService.init();
  }

  saveEducationalInstitute(institute,courseCategory ,courses) {

    // let obj =
    // {
    //   "instName": institute.instName,
    //   "instShortName": institute.instShortName,
    //   "instRegistrationCode": institute.instRegistrationCode,
    //   "instBranch": institute.instBranch,
    //   "instContactPerson": institute.instContactPerson,
    //   "instDesignation": institute.instDesignation,
    //   "instAddressone": institute.instAddressone,
    //   "instAddresstwo": institute.instAddresstwo,
    //   "instCountryname": institute.instCountryname,
    //   "instState": institute.instState,
    //   "instCity": institute.instCity,
    //   "instPincode": institute.instPincode,
    //   "instEmail": institute.instNainstEmailme,
    //   "instMobile": institute.instMobile,
    //   "instPhone": institute.instPhone,
    //   "instFax": institute.instFax,
    //   "instAccountHolderName": institute.instAccountHolderName,
    //   "instAccountNumber": institute.instAccountNumber,
    //   "instIfscCode": institute.instIfscCode,
    //   "instAccountType": institute.instAccountType,
    //   "instBankName": institute.instBankName,
    //   "instBankBranch": institute.instBankBranch

    // };

    let obj ={
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
      "instBankBranch": institute.instBankBranch,
      "courseCategoryList": []
      }
      
      this.arrayCC.forEach(element => {
        let objLocal=  {
          "categoryId":element,
          "courseProfileList": []
          }
          this.array.forEach(element2 =>{
            this.selectedCourses = new SelectedCourses();
            this.selectedCourses.courseId = element2;
            objLocal.courseProfileList.push(this.selectedCourses);
          })
        obj.courseCategoryList.push(objLocal);
      });

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

}
