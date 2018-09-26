import { Injectable } from '@angular/core';
import { Constants } from "../../../Constants";
import {Http, Headers} from '@angular/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  url = Constants.HOME_URL;
  constructor(private http : Http) { }

  getStatus()
  {
    let headers = new Headers({ 
      'Content-Type': 'application/json'
      });
      headers.append('Access-Control-Allow-Origin','*');
      headers.append('Access-Control-Allow-Headers','Content-Type');
      headers.append('Access-Control-Allow-Methods','GET,POST,OPTIONS,DELETE,PUT');
    let options = { headers: headers };
      return this.http.get(this.url+'/studentStatus/list',options).pipe(map(res => res.json()));
  }

}
