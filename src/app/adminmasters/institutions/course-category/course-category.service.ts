import { Injectable } from '@angular/core';
import { Constants } from "../../../Constants";
import {Http, Headers} from '@angular/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CourseCategoryService {

  url = Constants.HOME_URL;
  tokens = sessionStorage.getItem("token_type");


  constructor(private http : Http) { }

  saveCourseCategory(courseCategory)
  {
    let obj = {
      "categoryName": courseCategory.categoryName,
      "categoryCode": courseCategory.categoryCode,
      "status": courseCategory.status
      };
    let headers = new Headers({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokens
      });
     
    let options = { headers: headers };
    return this.http.post(this.url+'/coursecategory/create', obj, options).pipe(map(res => res.json()));
  }

  updateCourseCategory(courseCategory)
  {
    let obj = {
      "categoryName": courseCategory.categoryName,
      "categoryCode": courseCategory.categoryCode,
      "status": courseCategory.status
      };
      console.log(obj);
    let headers = new Headers({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokens
      });
    
    let options = { headers: headers };
    return this.http.put(this.url+'/coursecategory/update/'+courseCategory.categoryId, obj, options).pipe(map(res => res.json()));
  }

  getCourseCategory()
  {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokens
    });
   let options = { headers: headers };
    return this.http.get(this.url+'/coursecategory/list',options).pipe(map(res => res.json()));
  }


  fetchCourseCategory()
  {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokens
    });
    let options = { headers: headers };

     return this.http.get(this.url+'/coursecategory/fetch',options).pipe(map(res => res.json()));
  }

  deleteCourseCategory(id)
  {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokens
    });
    let options = { headers: headers };
     return this.http.get(this.url+'/coursecategory/delete/'+id,options).pipe(map(res => res.json()));
  }

  searchCourseCategory(courseCategory) {
    let obj =
    {
      "categoryName": courseCategory.categoryName,
      "categoryCode": courseCategory.categoryCode,
      "status": courseCategory.status
    };
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokens
    });
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
    let options = { headers: headers };
    return this.http.post(this.url+'/coursecategory/searchByCriteria', obj, options).pipe(map(res => res.json()));
  }
}
