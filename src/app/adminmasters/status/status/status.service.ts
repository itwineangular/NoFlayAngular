import { Injectable } from '@angular/core';
import { Constants } from "../../../Constants";
import {Http, Headers} from '@angular/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  url = Constants.HOME_URL;
  tokens = localStorage.getItem("token_type");
  constructor(private http : Http) { }

  saveStatus(status)
  {
    let obj = {
      "status": status.status
      };
    let headers = new Headers({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokens
      });
     
    let options = { headers: headers };
    return this.http.post(this.url+'/status/create', obj, options);
  }

  getStatus()
  {
    let headers = new Headers({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokens
      });
    
    let options = { headers: headers };
      return this.http.get(this.url+'/status/list',options).pipe(map(res => res.json()));
  }

  deleteStatus(StatusId)
  {
    let headers = new Headers({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokens
      });
      
      let options = { headers: headers };
      return this.http.get(this.url+'/status/delete/'+StatusId,options);
  }

  updateStatus(status)
  {
    let obj = {
      "status": status.status
      };
    let headers = new Headers({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokens
      });
      
    let options = { headers: headers };
    return this.http.put(this.url+'/status/update/'+status.statusId, obj, options);
  }

  searchStatus(status) {
    let obj =
    {
      "status": status.status
    };
    console.log(obj);
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokens
    });
    
    let options = { headers: headers };
    return this.http.post(this.url+'/status/searchList', obj, options).pipe(map(res => res.json()));
  }

}
