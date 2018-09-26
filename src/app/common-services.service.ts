import { Injectable } from '@angular/core';
import { Constants } from "../../src/app/constants";
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class CommonServicesService {

  url = Constants.HOME_URL;
  
  constructor(private http : Http) { }

  getCountries()
  {
     return this.http.get('./assets/cscfiles/country.json').pipe(map(res => res.json()));
  }
  getStates()
  {
     return this.http.get('./assets/cscfiles/state.json').pipe(map(res => res.json()));
  }
  getCities()
  {
     return this.http.get('./assets/cscfiles/city.json').pipe(map(res => res.json()));
  }

  // getCourses()
  // {
  //    return this.http.get('../assets/cscfiles/courses.json').pipe(map(res => res.json()));
  // }
  
  // getCourses()
  // {
  //   let headers = new Headers();
  //     headers.append('Access-Control-Allow-Origin','*');
  //     headers.append('Access-Control-Allow-Headers','Content-Type');
  //     headers.append('Access-Control-Allow-Methods','GET,POST,OPTIONS,DELETE,PUT');
  //   let options = { headers: headers };

  //    return this.http.get(this.url+'/courseprofile/list',options).pipe(map(res => res.json()));
  // }

}
