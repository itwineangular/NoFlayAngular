import { Injectable } from '@angular/core';
import { Constants } from '../Constants';
import {Http, Headers} from '@angular/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PrivilegeService {
  url = Constants.HOME_URL;
  tokens = sessionStorage.getItem("token_type");

  constructor(private http : Http) { }

  

  getBusinessCategory()
  {
    let headers = new Headers({
      'Content-Type': 'application/json',
      
    });
    
    let options = { headers: headers };
      return this.http.get('http://192.168.1.65:9090/businesscategory/list',options).pipe(map(res => res.json()));;
  }


 
  getBusinessEntity() {
    let headers = new Headers({
      'Content-Type': 'application/json',
     
    });
    
    let options = { headers: headers };
    return this.http.get('http://192.168.1.65:9090/businessentity/list', options).pipe(map(res => res.json()));
  }


  getPrivilegeCategory() {
    let headers = new Headers({
      'Content-Type': 'application/json',
     
    });
    
    let options = { headers: headers };
    return this.http.get('http://192.168.1.65:9090/privilege/list', options).pipe(map(res => res.json()));
  }


  getAttribute() {
    let headers = new Headers({
      'Content-Type': 'application/json',
     
    });
    let options = { headers: headers };
    return this.http.get('http://192.168.1.65:9090/attribute/list', options).pipe(map(res => res.json()));

  }



}
