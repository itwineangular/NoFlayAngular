import { Injectable } from '@angular/core';
import { Constants } from "../../../Constants";
import { Http, Headers } from '@angular/http';
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class PrivilegecategoryService {
  url = Constants.HOME_URL;
  tokens = sessionStorage.getItem("token_type");

  constructor(private http: Http) { }

  savePrivilegecategory(data) {
    console.log(data);
    let obj = {
      "privilegeName": data.privilegeName
    };
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokens
    });
    
    let options = { headers: headers };
    return this.http.post(this.url + '/privilege/create', obj, options).pipe(map(res => res.json()));
  }

  getPrivilegeCategory() {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokens
    });
    
    let options = { headers: headers };
    return this.http.get(this.url + '/privilege/list', options).pipe(map(res => res.json()));
  }

  deletePrivilegeCategory(PrivilegeId) {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokens
    });
    
    let options = { headers: headers };
    return this.http.get(this.url + '/privilege/delete/' + PrivilegeId, options);
  }

  updatePrivilegecategory(privilegeCategory) {
    console.log(privilegeCategory);
    let obj = {
      "privilegeName": privilegeCategory.privilegeName
    };
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokens
    });
    
    let options = { headers: headers };
    return this.http.put(this.url + '/privilege/update/' + privilegeCategory.privilegeId, obj, options).pipe(map(res => res.json()));
  }

  searchPrivilegeCategory(data) {
    let obj =
    {
      "privilegeName": data.privilegeCategory
    };
    console.log(obj);
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokens
    });
    
    let options = { headers: headers };
    return this.http.post(this.url + '/privilege/searchByCriteria', obj, options).pipe(map(res => res.json()));
  }
}
