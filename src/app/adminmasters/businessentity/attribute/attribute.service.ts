import { Injectable } from '@angular/core';
import { Constants } from "../../../Constants";
import {Http, Headers} from '@angular/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AttributeService {
  url = Constants.HOME_URL;
  constructor(private http : Http) { }

saveattribute(data)
  {
    let obj = {
      // attribute
      "attributeName" : data.attributeName,
      "attributeCode" : data.attributeCode,
      "businessCatCode" : data.businessCatCode
      
      };
   console.log(obj);
    let headers = new Headers({ 
      'Content-Type': 'application/json'
      });
      headers.append('Access-Control-Allow-Origin','*');
      headers.append('Access-Control-Allow-Headers','Content-Type');
      headers.append('Access-Control-Allow-Methods','GET,POST,OPTIONS,DELETE,PUT');
    let options = { headers: headers };
    return this.http.post(this.url+'/attribute/create', obj, options).pipe(map(res => res.json()));

  }

getAttribute()
  {
    let headers = new Headers({ 
      'Content-Type': 'application/json'
      });
      headers.append('Access-Control-Allow-Origin','*');
      headers.append('Access-Control-Allow-Headers','Content-Type');
      headers.append('Access-Control-Allow-Methods','GET,POST,OPTIONS,DELETE,PUT');
    let options = { headers: headers };
      return this.http.get(this.url+'/attribute/list',options).pipe(map(res => res.json()));
  }

  
deleteAttribute(attributeId)
  {
      let headers = new Headers();
      headers.append('Access-Control-Allow-Origin','*');
      headers.append('Access-Control-Allow-Headers','Content-Type');
      headers.append('Access-Control-Allow-Methods','GET,POST,OPTIONS,DELETE,PUT');
      let options = { headers: headers };
      return this.http.get(this.url+'/attribute/delete/'+attributeId,options).pipe(map(res => res.json()));
  }

updateAttribute(data)
  {
      let obj = {
      "attributeId":data.attributeId,
      "attributeName": data.attributeName,
      "attributeCode": data.attributeCode,
      "businessCatCode" : data.businessCatCode
      };

      let headers = new Headers({ 
      'Content-Type': 'application/json'
      });
      headers.append('Access-Control-Allow-Origin','*');
      headers.append('Access-Control-Allow-Headers','Content-Type');
      headers.append('Access-Control-Allow-Methods','GET,POST,OPTIONS,DELETE,PUT');
      let options = { headers: headers };
      // console.log(data.businessCategoryId);
      // console.log(obj);
      return this.http.put(this.url+'/attribute/update/'+data.attributeId, obj, options).pipe(map(res => res.json()));
  }


  searchAttribute(data) {
    let obj =
    {
      "attributeName": data.attributeName,
      "attributeCode": data.attributeCode,
      "businessCatCode": data.businessCatCode,
     
    };
    console.log(obj);
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
    let options = { headers: headers };
    return this.http.post(this.url+'/attribute/searchList', obj, options).pipe(map(res => res.json()));
  }
// getBusinessCategory()
//   {
//     let headers = new Headers({ 
//       'Content-Type': 'application/json'
//       });
//       headers.append('Access-Control-Allow-Origin','*');
//       headers.append('Access-Control-Allow-Headers','Content-Type');
//       headers.append('Access-Control-Allow-Methods','GET,POST,OPTIONS,DELETE,PUT');
//     let options = { headers: headers };
//       return this.http.get('http://192.168.1.55:8080/mcmwebservices/businesscategory/list',options).pipe(map(res => res.json()));;
//   }
}
