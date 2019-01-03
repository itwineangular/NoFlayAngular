import { Injectable } from '@angular/core';
import { Constants } from "../../../Constants";
import { Http, Headers } from '@angular/http';
import { map } from "rxjs/operators";
import { ContractObject } from "./contractObject";
// import Observable from 'rxjs';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  url = Constants.HOME_URL;
  tokens = sessionStorage.getItem("token_type");

  constructor(private http: Http) { }

  // searchBusinessEntity(businessEntityName, businessEntityCategoryCode) {
  //   let obj =
  //   {
  //     "name": businessEntityName,
  //     "businessCategoryCode": businessEntityCategoryCode
  //   };
  //   let headers = new Headers({
  //     'Content-Type': 'application/json'
  //   });
  //   let options = { headers: headers };
  //   return this.http.post(this.url + '/businessentity/searchByCriteria', obj, options).pipe(map(res => res.json()));
  // }


  searchBusinessEntity(businessEntityId) {
    // let obj =
    // {
    //   "businessId": businessEntityId
    // }
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokens
    });
    
    let options = { headers: headers };
    console.log("id")
    console.log(businessEntityId);
    return this.http.get(this.url+'/contractor/findByBusinessId/'+businessEntityId+'',options).pipe(map(res => res.json()));

  }

  saveContract(businessEntityId, contractObject, discountEntityExtended)  {
    console.log(contractObject);
    let obj =
    {
      "actInd": contractObject.actInd,
      "name": contractObject.name,
      "startDate": contractObject.startDate.formatted,
      "endDate": contractObject.endDate.formatted,
      "businessProfileEntity": {
        "businessId": businessEntityId
      },
      "discountEntities": []
    };

    discountEntityExtended.forEach(element => {
      element.attributesEntityExtended.planEntityExtended.forEach(element2 => {
        let objPlan =
        {
          "discount": element2.discount,
          "attributesEntity": {
            "attributeId": element.attributesEntityExtended.id,
          },
          "planEntity": {
            "planId": element2.id
          }
        }
        obj.discountEntities.push(objPlan);
      });
    });

    console.log(obj);

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokens
    });
    
    let options = { headers: headers };
    return this.http.post(this.url +'/contractor/create', obj, options).pipe(map(res => res.json()));
  }

  getContract() : Observable<ContractObject[]> 
  {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokens
    });
    
    let options = { headers: headers };
    return this.http.get(this.url +'/contractor/list',options).pipe(map(res => res.json()));
  }
  deleteContractTemplate(id) {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokens
    });
    
    let options = { headers: headers };
    return this.http.get(this.url + '/contractor/delete/' + id, options).pipe(map(res => res.json()));
  }
  updateContract(businessEntityId, contractObject, discountEntityExtended){
    console.log(contractObject.id)
    let obj={
      "actInd": contractObject.actInd,
      "name": contractObject.name,
      "startDate": contractObject.startDate.formatted,
      "endDate": contractObject.endDate.formatted,
      "businessProfileEntity": {
        "businessId": businessEntityId
      },
      "discountEntities": []

    };

    discountEntityExtended.forEach(element => {
      element.attributesEntityExtended.planEntityExtended.forEach(element2 => {
        let objPlan =
        {
          "discount": element2.discount,
          "attributesEntity": {
            "attributeId": element.attributesEntityExtended.id,
          },
          "planEntity": {
            "planId": element2.id
          }
        }
        obj.discountEntities.push(objPlan);
      });
    });

    console.log(obj);

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokens
    });
    
    let options = { headers: headers };
    return this.http.put(this.url +'/contractor/update/'+contractObject.id, obj, options).pipe(map(res => res.json()));
  }


}
