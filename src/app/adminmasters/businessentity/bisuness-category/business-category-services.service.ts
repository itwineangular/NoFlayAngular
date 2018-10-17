import { Injectable } from '@angular/core';
import { Constants } from '../../../Constants';
import {Http, Headers} from '@angular/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class BusinessCategoryServicesService {
  url = Constants.HOME_URL;

  constructor(private http : Http) { }

  saveBusinessCategory(businessCategory)
  {
    let obj ={
       "businessCategoryName": businessCategory.businessCategoryName,
       "businessCategoryCode": businessCategory.businessCategoryCode,
      //  "createdBy":"admin",
      //  "modifiedBy":"admin",
     
    };
    // console.log(obj);
    let headers = new Headers({ 
      'Content-Type': 'application/json'
      });
      headers.append('Access-Control-Allow-Origin','*');
      headers.append('Access-Control-Allow-Headers','Content-Type');
      headers.append('Access-Control-Allow-Methods','GET,POST,OPTIONS,DELETE,PUT');
    let options = { headers: headers };
    return this.http.post(this.url+'/businesscategory/create', obj, options).pipe(map(res => res.json()));

  }

  getBusinessCategory()
  {
    let headers = new Headers({ 
      'Content-Type': 'application/json'
      });
      headers.append('Access-Control-Allow-Origin','*');
      headers.append('Access-Control-Allow-Headers','Content-Type');
      headers.append('Access-Control-Allow-Methods','GET,POST,OPTIONS,DELETE,PUT');
    let options = { headers: headers };
      return this.http.get(this.url+'/businesscategory/list',options).pipe(map(res => res.json()));;
  }


 

deleteBusinessCategory(businessCategoryId)
{
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin','*');
    headers.append('Access-Control-Allow-Headers','Content-Type');
    headers.append('Access-Control-Allow-Methods','GET,POST,OPTIONS,DELETE,PUT');
    let options = { headers: headers };
    return this.http.get(this.url+'/businesscategory/delete/'+businessCategoryId,options).pipe(map(res => res.json()));
}


updateBusinessCategory(businessCategory)
{
    let obj = {
    "businessCategoryId":businessCategory.businessCategoryId,
    "businessCategoryName": businessCategory.businessCategoryName,
    "businessCategoryCode": businessCategory.businessCategoryCode,

    };

    let headers = new Headers({ 
    'Content-Type': 'application/json'
    });
    headers.append('Access-Control-Allow-Origin','*');
    headers.append('Access-Control-Allow-Headers','Content-Type');
    headers.append('Access-Control-Allow-Methods','GET,POST,OPTIONS,DELETE,PUT');
    let options = { headers: headers };
    // console.log(businessCategory.businessCategoryId);
    // console.log(obj);
    return this.http.put(this.url+'/businesscategory/update/'+businessCategory.businessCategoryId, obj, options).pipe(map(res => res.json()));
}

searchBusinessCategory(businessCategory) {
  let obj =
  {
    "businessCategoryName": businessCategory.businessCategoryName,
       "businessCategoryCode": businessCategory.businessCategoryCode
  };
  let headers = new Headers({
    'Content-Type': 'application/json'
  });
  headers.append('Access-Control-Allow-Origin', '*');
  headers.append('Access-Control-Allow-Headers', 'Content-Type');
  headers.append('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
  let options = { headers: headers };
  return this.http.post(this.url+'/businesscategory/searchByCriteria', obj, options).pipe(map(res => res.json()));
}
}
