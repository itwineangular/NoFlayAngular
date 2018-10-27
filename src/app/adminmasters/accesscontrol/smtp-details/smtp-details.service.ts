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
    let obj = {
      "host": intialconfiguration.host,
      "port": intialconfiguration.port,
      "username": intialconfiguration.username,
      "password": intialconfiguration.password,
      "auth": intialconfiguration.auth,
      "connectionTimeout": intialconfiguration.connectionTimeout,
      "timeout": intialconfiguration.timeout,
      "writeTimeout": intialconfiguration.writeTimeout,
      "enable": intialconfiguration.enable,
      "required": intialconfiguration.required
    };

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = { headers: headers };
    return this.http.put(this.url + '/properties/update/' + intialconfiguration.appPropertiesId, obj, options).pipe(map(res => res.json()));
  }

  getIntialConfiguration()
  {
     return this.http.get(this.url+'/properties/list').pipe(map(res => res.json()));
  }

}
