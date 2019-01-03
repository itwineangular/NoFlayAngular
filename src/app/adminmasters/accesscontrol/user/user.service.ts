import { Injectable } from '@angular/core';
import { Constants } from '../../../Constants';
import {Http, Headers} from '@angular/http';
import { map } from "rxjs/operators";
import { Userroles } from './userroles';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = Constants.HOME_URL;
  tokens = sessionStorage.getItem("token_type");

  constructor(private http : Http) { }

  saveUser(userData)
  {
    console.log(userData.username);
    let obj ={
       "username": userData.username,
       "password": userData.password,
       "roles":[userData.roles]
           };
    console.log(userData);
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokens
    });
    
    let options = { headers: headers };
    return this.http.post(this.url+'/user/addUser', obj, options).pipe(map(res => res.json()));

  }

  updateUser(user)
{
  let obj ={
 
    "password": user.password
  
        };

        let headers = new Headers({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.tokens
        });
        
        let options = { headers: headers };
      return this.http.put(this.url+'/user/update/?username='+user.username, obj, options).pipe(map(res => res.json()));
}

deleteUser(id)
{
  let headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.tokens
  });
  
  let options = { headers: headers };
    return this.http.get(this.url+'/user/delete/'+id,options)
}

getUser()
{
  let headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.tokens
  });
  
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
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokens
    });
    
    let options = { headers: headers };
  return this.http.post(this.url+'/user/searchByCriteria', obj, options).pipe(map(res => res.json()));
}

}
