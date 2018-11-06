import { Injectable } from '@angular/core';
import { Constants } from "../../../Constants";
import { Http, Headers } from '@angular/http';
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class PrivilegecategoryService {
  url = Constants.HOME_URL;

  constructor(private http: Http) { }

  savePrivilegecategory(data) {
    console.log(data);
    let obj = {
      "privilegeName": data.privilegeName
    };
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = { headers: headers };
    //return this.http.post('http://192.168.1.52:9090/privilege/create', obj, options).pipe(map(res => res.json()));
    return this.http.post(this.url + '/privilege/create', obj, options).pipe(map(res => res.json()));
  }

  getPrivilegeCategory() {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
    let options = { headers: headers };
    return this.http.get('http://192.168.1.52:9090/privilege/list', options).pipe(map(res => res.json()));
    // return this.http.get(this.url + '/privilege/list', options).pipe(map(res => res.json()));
  }

  deletePrivilegeCategory(PrivilegeId)
  {
      let headers = new Headers();
      headers.append('Access-Control-Allow-Origin','*');
      headers.append('Access-Control-Allow-Headers','Content-Type');
      headers.append('Access-Control-Allow-Methods','GET,POST,OPTIONS,DELETE,PUT');
      let options = { headers: headers };
      return this.http.get(this.url + '/privilege/delete/'+PrivilegeId,options);
     // return this.http.get('http://192.168.1.52:9090/privilege/delete/'+PrivilegeId,options);
      // return this.http.get'http://192.168.1.57:9090/Privilege_Id,options).pipe(map(res => res.json()));
  }

  updatePrivilegecategory(privilegeCategory) {
    console.log(privilegeCategory);
    let obj = {
      "privilegeName": privilegeCategory.privilegeName
    };
    let headers = new Headers({
      'Content-Type': 'application/json'
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
      'Content-Type': 'application/json'
    });
    // headers.append('Access-Control-Allow-Origin', '*');
    // headers.append('Access-Control-Allow-Headers', 'Content-Type');
    // headers.append('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
    let options = { headers: headers };
    return this.http.post(this.url + '/privilege/searchByCriteria', obj, options).pipe(map(res => res.json()));
  }
}
