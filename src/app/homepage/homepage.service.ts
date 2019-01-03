import { Injectable } from '@angular/core';
import { Constants } from "../Constants";
import { Http, Headers, RequestOptions } from '@angular/http';
import { map } from "rxjs/operators";
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthServiceConfig } from 'angular-6-social-login';
import { Response } from '@angular/http';


@Injectable({
  providedIn: 'root'
})
export class HomepageService {
  url = Constants.HOME_URL;
  private authUrl = 'http://192.168.1.51:9090/oauth/token';
  private headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded', 'withCredentials': 'true', 'Authorization': 'Basic ' + btoa('read-write-client:oauth2-read-write-client-password') });

  constructor(private http: Http) {
  }



  userAuthentication(usernameLocal: string, passwordLocal: string): Observable<boolean> {

    let payload = "grant_type=password" + "&username=" + usernameLocal + "&password=" + passwordLocal +
      "&client_id=read-write-client";
    return this.http.post(this.authUrl, payload, { headers: this.headers }).pipe(map(res => res.json()));

  }
}







