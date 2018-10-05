import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Constants } from "../../../Constants";
import { Http, Headers } from '@angular/http';
import { map } from "rxjs/operators";
import { BusinessEntity } from "./business-entity";

@Injectable({
  providedIn: 'root'
})
export class BusinessEntityService {

  // business : BusinessEntity;
  url = Constants.HOME_URL;
  constructor(private http: Http) { }

  saveBusinessEntity(business) {
    let obj = {
      "name": business.name,
      "registrationCode": business.registrationCode,
      "businessCategoryCode": business.businessCategoryCode,
      "shortname": business.shortname,

      "contactPerson": business.contactPerson,
      "designation": business.designation,
      "address1": business.address1,
      "address2": business.address2,
      "country": business.country,
      "state": business.state,
      "city": business.city,
      "pincode": business.pincode,
      "mobile": business.mobile,
      "phone": business.phone,
      "fax": business.fax,
      "accountHolderName": business.accountHolderName,
      "accountNumber": business.accountNumber,
      "ifscCode": business.ifscCode,
      "accountType": business.accountType,
      "bankName": business.bankName,
      "bankBranch": business.bankBranch,
      "businessId": business.businessId
    };
    // console.log(obj);
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
    let options = { headers: headers };
    return this.http.post(this.url + '/businessentity/create', obj, options).pipe(map(res => res.json()));
  }

  getBusinessEntity() {
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
    let options = { headers: headers };
    return this.http.get(this.url + '/businessentity/list', options).pipe(map(res => res.json()));
  }

  deleteBusinessEntity(businessId) {
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
    let options = { headers: headers };
    return this.http.get(this.url + '/businessentity/delete/' + businessId, options).pipe(map(res => res.json()));
  }

  updateBusinessEntity(business) {
    let obj = {

      "name": business.name,
      "registrationCode": business.registrationCode,
      "businessCategoryCode": business.businessCategoryCode,
      "shortname": business.shortname,

      "contactPerson": business.contactPerson,
      "designation": business.designation,
      "address1": business.address1,
      "address2": business.address2,
      "country": business.country,
      "state": business.state,
      "city": business.city,
      "pincode": business.pincode,
      "mobile": business.mobile,
      "phone": business.phone,
      "fax": business.fax,
      "accountHolderName": business.accountHolderName,
      "accountNumber": business.accountNumber,
      "ifscCode": business.ifscCode,
      "accountType": business.accountType,
      "bankName": business.bankName,
      "bankBranch": business.bankBranch,
      "businessId": business.businessId


    };

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
    let options = { headers: headers };
    // console.log(data.businessCategoryId);
    console.log(obj);
    return this.http.put(this.url + '/businessentity/update/' + business.businessId, obj, options).pipe(map(res => res.json()));
  }

  searchBusinessEntity(business) {
    let obj =
    {
      "name": business.name,
      "registrationCode": business.registrationCode
      
    };
    console.log("sdftsdegtf");
    console.log(obj);
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
    let options = { headers: headers };
    // return this.http.post(this.url + '/businessentity/searchList', obj, options).pipe(map(res => res.json()));
    return this.http.post(this.url+'/businessentity/searchList', obj, options).pipe(map(res => res.json()));
  }


}


