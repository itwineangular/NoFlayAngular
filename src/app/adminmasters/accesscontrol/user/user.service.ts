import { Injectable } from '@angular/core';
import { Constants } from '../../../Constants';
import {Http, Headers} from '@angular/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = Constants.HOME_URL;

  constructor(private http : Http) { }

  saveUser(userData)
  {
    console.log(userData.username);
    let obj ={
       "username": userData.username,
       "password": userData.password,
       "roles":userData.roles
           };
    console.log(userData.username);
    let headers = new Headers({ 
      'Content-Type': 'application/json'
      });
      headers.append('Access-Control-Allow-Origin','*');
      headers.append('Access-Control-Allow-Headers','Content-Type');
      headers.append('Access-Control-Allow-Methods','GET,POST,OPTIONS,DELETE,PUT');
    let options = { headers: headers };
    return this.http.post(this.url+'/user/create', obj, options).pipe(map(res => res.json()));

  }

  updateUser(user)
{
  let obj ={
    "username": user.username,
    "password": user.password,
    "roles":user.roles
        };

    let headers = new Headers({ 
    'Content-Type': 'application/json'
    });
    headers.append('Access-Control-Allow-Origin','*');
    headers.append('Access-Control-Allow-Headers','Content-Type');
    headers.append('Access-Control-Allow-Methods','GET,POST,OPTIONS,DELETE,PUT');
    let options = { headers: headers };
      return this.http.put(this.url+'/user/update/'+user.userId, obj, options).pipe(map(res => res.json()));
}

deleteUser(userId)
{
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin','*');
    headers.append('Access-Control-Allow-Headers','Content-Type');
    headers.append('Access-Control-Allow-Methods','GET,POST,OPTIONS,DELETE,PUT');
    let options = { headers: headers };
    return this.http.get(this.url+'/user/delete/'+userId,options).pipe(map(res => res.json()));
}

getUser()
{
  let headers = new Headers({ 
    'Content-Type': 'application/json'
    });
    headers.append('Access-Control-Allow-Origin','*');
    headers.append('Access-Control-Allow-Headers','Content-Type');
    headers.append('Access-Control-Allow-Methods','GET,POST,OPTIONS,DELETE,PUT');
  let options = { headers: headers };
    return this.http.get(this.url+'/user/list',options).pipe(map(res => res.json()));;
}

searchUser(user) {
  let obj =
  {
    "username": user.username,
    "roles": user.roles
  };
  let headers = new Headers({
    'Content-Type': 'application/json'
  });
 console.log(obj);
  let options = { headers: headers };
  return this.http.post(this.url+'/user/searchByCriteria', obj, options).pipe(map(res => res.json()));
}

}
