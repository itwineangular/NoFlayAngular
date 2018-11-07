import { Injectable } from '@angular/core';
import { Constants } from "../../../Constants";
import { Http, Headers } from '@angular/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AttributeService {
  url = Constants.HOME_URL;
  constructor(private http: Http) { }

  saveattribute(data, selectedPrivileges) {
    let obj = {
      "attributeName": data.attributeName,
      "attributeCode": data.attributeCode,
      "privilegesList": []
    };
    selectedPrivileges.forEach(element => {
      let objPrivilege = {
        "privilegeId": element.privilegeId,
      }
      obj.privilegesList.push(objPrivilege);
    });
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = { headers: headers };
    return this.http.post(this.url + '/attribute/create', obj, options).pipe(map(res => res.json()));

  }

  getAttribute() {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
    let options = { headers: headers };
    return this.http.get(this.url + '/attribute/list', options).pipe(map(res => res.json()));

  }


  deleteAttribute(attributeId) {
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
    let options = { headers: headers };
    return this.http.get(this.url + '/attribute/delete/' + attributeId, options).pipe(map(res => res.json()));
  }

  updateAttribute(data, selectedPrivileges) {
    let obj = {
      "attributeName": data.attributeName,
      "attributeCode": data.attributeCode,
      "privilegesList": []
    };
    selectedPrivileges.forEach(element => {
      let objPrivilege = {
        "privilegeId": element.privilegeId,
      }
      obj.privilegesList.push(objPrivilege);
    });

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
    let options = { headers: headers };
    return this.http.put(this.url + '/attribute/update/' + data.attributeId, obj, options).pipe(map(res => res.json()));
  }


  searchAttribute(attributeName, attributeCode, privilegeId) {
    console.log(attributeName, attributeCode, privilegeId);
    return this.http.get(this.url + `/attribute/searchAttribute?attributeName=${attributeName.trim()}`
      + `&attributeCode=${attributeCode}`
      + `&privilegeId=${privilegeId}`).pipe(map(res => res.json()));
  }
}
