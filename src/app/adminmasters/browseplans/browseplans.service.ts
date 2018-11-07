import { Injectable } from '@angular/core';
import { Constants } from "../../Constants";
import { Http, Headers, RequestOptions } from '@angular/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class BrowseplansService {
  url = Constants.HOME_URL;
  constructor(private http: Http) { }

  getPlan() {
    return this.http.get('http://192.168.1.51:8080/plans/list').pipe(map(res => res.json()));
  }
}
