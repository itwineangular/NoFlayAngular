import { Injectable } from '@angular/core';
import { Constants } from "../../../Constants";
import {Http, Headers} from '@angular/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MembershipServicesService {

  url = Constants.HOME_URL;
  constructor(private http : Http) { }

  saveMembership(membership)
  {
    let obj = {
      "memberName": membership.memberName
      };
    let headers = new Headers({ 
      'Content-Type': 'application/json'
      });
      headers.append('Access-Control-Allow-Origin','*');
      headers.append('Access-Control-Allow-Headers','Content-Type');
      headers.append('Access-Control-Allow-Methods','GET,POST,OPTIONS,DELETE,PUT');
    let options = { headers: headers };
    return this.http.post(this.url+'/membership/create', obj, options);
    // return this.http.post(this.url+'/membership/create', obj, options).pipe(map(res => res.json()));
  }
  getMembership()
  {
    let headers = new Headers();
      headers.append('Access-Control-Allow-Origin','*');
      headers.append('Access-Control-Allow-Headers','Content-Type');
      headers.append('Access-Control-Allow-Methods','GET,POST,OPTIONS,DELETE,PUT');
    let options = { headers: headers };
    return this.http.get(this.url+'/membership/list',options).pipe(map(res => res.json()));
  }

  deleteMembership(MembershipId)
  {
      let headers = new Headers();
      headers.append('Access-Control-Allow-Origin','*');
      headers.append('Access-Control-Allow-Headers','Content-Type');
      headers.append('Access-Control-Allow-Methods','GET,POST,OPTIONS,DELETE,PUT');
      let options = { headers: headers };
      return this.http.get(this.url+'/membership/delete/'+MembershipId,options);
      // return this.http.get(this.url+'/membership/delete/'+MembershipId,options).pipe(map(res => res.json()));
  }

  updateMembership(membership)
  {
    let obj = {
      "membership_id": membership.membership_id,
      "memberName": membership.memberName
      };
    let headers = new Headers({ 
      'Content-Type': 'application/json'
      });
      headers.append('Access-Control-Allow-Origin','*');
      headers.append('Access-Control-Allow-Headers','Content-Type');
      headers.append('Access-Control-Allow-Methods','GET,POST,OPTIONS,DELETE,PUT');
    let options = { headers: headers };
    return this.http.put(this.url+'/membership/update/'+membership.membership_id, obj, options);
    // return this.http.put(this.url+'/membership/update/'+membership.membership_id, obj, options).pipe(map(res => res.json()));
  }


  searchMembership(membership) {
    let obj =
    {
      "memberName": membership.memberName
    };
    console.log(obj);
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
    let options = { headers: headers };
    return this.http.post(this.url+'/membership/searchList', obj, options).pipe(map(res => res.json()));
  }
}
