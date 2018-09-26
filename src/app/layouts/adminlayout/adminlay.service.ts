import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AdminlayService {

  constructor(public http:Http) { }

  getMenues()
  {
     return this.http.get('../assets/i18n/en.json').pipe(map(res => res.json()));
  }
  
}
