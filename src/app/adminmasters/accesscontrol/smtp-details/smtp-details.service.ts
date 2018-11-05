import { Injectable } from '@angular/core';
import { Constants } from "../../../Constants";
import { Http, Headers } from '@angular/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SmtpDetailsService {

  url = Constants.HOME_URL;
  constructor(private http: Http) { }

  saveIntialConfiguration(intialconfiguration) {
    console.log(intialconfiguration);
    let obj = {
      "paramKey": "EMAIL",
      "paramValues": [intialconfiguration.username,intialconfiguration.password]
    };

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = { headers: headers };
    console.log(obj);
    return this.http.post(this.url+'/maintenance/saveOrUpdate', obj,options).pipe(map(res => res.json()));
  }

  getIntialConfiguration()
  {
     return this.http.get(this.url+'/maintenance/list',).pipe(map(res => res.json()));
  }

  getIntialConfiguration2()
  {
    return this.http.get(this.url+'/properties/list').pipe(map(res => res.json()));
  }

}
