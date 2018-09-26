import { Injectable } from '@angular/core';
import { Constants } from "../../../Constants";
import { Http, Headers } from '@angular/http';
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class PlanService {
  url = Constants.HOME_URL;
  constructor(private http: Http) { }

  saveplans(data) {
    let obj = {
      // plan
      // "planId":data.planId,
      "planName": data.planName,
      "planPrice": data.planPrice,
      "planMembership": data.planMembership,
      "startDateTime": data.startDateTime

      // "planName":"silver",
      // "planMembership":"annual",
      // 	"planPrice":1000,
      // 	"createdBy":"hsdjfh",
      // 	"modifiedBy":"hscfjh"


    };
    console.log("and here");
    console.log(obj);
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
    let options = { headers: headers };
    return this.http.post(this.url + '/plans/create', obj, options);
  }

  searchPlan(data) {
    let obj =
    {
      "planName": data.planName,
      "planPrice": data.planPrice,
      "planMembership": data.planMembership,
      "startDateTime": data.startDateTime
    };
    console.log(obj);
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
    let options = { headers: headers };
    return this.http.post(this.url+'/plans/searchList', obj, options).pipe(map(res => res.json()));
  }

  getPlan() {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
    let options = { headers: headers };
    return this.http.get(this.url + '/plans/list', options).pipe(map(res => res.json()));
  }


  deletePlan(planId) {
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
    let options = { headers: headers };
    return this.http.get(this.url + '/plans/delete/' + planId, options).pipe(map(res => res.json()));
  }

  updatePlan(data) {
    let obj = {
      "planId": data.planId,
      "planName": data.planName,
      "planPrice": data.planPrice,
      "planMembership": data.planMembership,
      "startDateTime": data.startDateTime
    };

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
    let options = { headers: headers };
    // console.log(data.businessCategoryId);
    // console.log(obj);
    return this.http.put(this.url + '/plans/update/' + data.planId, obj, options);
  }

  getMembership() {
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
    let options = { headers: headers };
    return this.http.get(this.url+'/membership/list', options).pipe(map(res => res.json()));
  }

  getPlanName() {
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
    let options = { headers: headers };
    return this.http.get(this.url+'/plan/list', options).pipe(map(res => res.json()));
  }

}
