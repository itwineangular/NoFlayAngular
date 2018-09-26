import { Injectable } from '@angular/core';
import { Constants } from "../../../Constants";
import {Http, Headers} from '@angular/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PlanNameServicesService {

  url = Constants.HOME_URL;
  constructor(private http : Http) { }

  savePlanName(planName)
  {
    let obj = {
      "planName": planName.planName
      };

    
    let headers = new Headers({ 
      'Content-Type': 'application/json'
      });
      headers.append('Access-Control-Allow-Origin','*');
      headers.append('Access-Control-Allow-Headers','Content-Type');
      headers.append('Access-Control-Allow-Methods','GET,POST,OPTIONS,DELETE,PUT');
    let options = { headers: headers };
     return this.http.post(this.url+'/plan/create', obj, options);
    //return this.http.post(this.url+'/plan/create', obj, options).pipe(map(res => res.json()));
  }
  getplanName()
  {
    let headers = new Headers();
      headers.append('Access-Control-Allow-Origin','*');
      headers.append('Access-Control-Allow-Headers','Content-Type');
      headers.append('Access-Control-Allow-Methods','GET,POST,OPTIONS,DELETE,PUT');
    let options = { headers: headers };
    return this.http.get(this.url+'/plan/list',options).pipe(map(res => res.json()));
  }

  deletePlanName(plannameId)
  {
      let headers = new Headers();
      headers.append('Access-Control-Allow-Origin','*');
      headers.append('Access-Control-Allow-Headers','Content-Type');
      headers.append('Access-Control-Allow-Methods','GET,POST,OPTIONS,DELETE,PUT');
      let options = { headers: headers };
      return this.http.get(this.url+'/plan/delete/'+plannameId,options);
     // return this.http.get(this.url+'/plan/delete/'+plannameId,options).pipe(map(res => res.json()));
  }

  updatePlanName(planName)
  {
    let obj = {
      "plannameId": planName.plannameId,
      "planName": planName.planName
      };
    let headers = new Headers({ 
      'Content-Type': 'application/json'
      });
      headers.append('Access-Control-Allow-Origin','*');
      headers.append('Access-Control-Allow-Headers','Content-Type');
      headers.append('Access-Control-Allow-Methods','GET,POST,OPTIONS,DELETE,PUT');
    let options = { headers: headers };
   return this.http.put(this.url+'/plan/update/'+planName.plannameId, obj, options);
     //return this.http.put(this.url+'/plan/update/'+membership.plannameId, obj, options).pipe(map(res => res.json()));
  }

  searchPlanName(planName) {
    let obj =
    {
      "planName": planName.planName
    };
    console.log(obj);
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
    let options = { headers: headers };
    return this.http.post(this.url+'/plan/searchList', obj, options).pipe(map(res => res.json()));
  }
}
