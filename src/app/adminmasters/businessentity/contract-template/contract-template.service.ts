import { Injectable } from '@angular/core';
import { Constants } from "../../../Constants";
import { Http, Headers } from '@angular/http';
import { map } from "rxjs/operators";
// import { ContarctTemplate } from "./contarcttemplate";
// import Observable from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContractTemplateService {

  url = Constants.HOME_URL;

  constructor(private http: Http) { }

  saveContractTemplate(templateName, discountEntityExtended, selectedServices) {
    let obj =
    {
      "contractTemplateName": templateName,
      "discountEntities": []
    };
    discountEntityExtended.forEach(element => {
      if (selectedServices.findIndex(x => x === element.attributesEntityExtended.id) >= 0) {
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
      }
    });

    console.log(obj);

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = { headers: headers };
    // return this.http.post('http://192.168.1.57:9090/contractTemplate/create', obj, options).pipe(map(res => res.json()));
    return this.http.post(this.url + '/contractTemplate/create', obj, options).pipe(map(res => res.json()));
  }

  updateContractTemplate(templateName, discountEntityExtended, selectedServices, id) {
    let obj =
    {
      "contractTemplateName": templateName,
      "discountEntities": []
    };
    discountEntityExtended.forEach(element => {
      if (selectedServices.findIndex(x => x === element.attributesEntityExtended.id) >= 0) {
        element.attributesEntityExtended.planEntityExtended.forEach(element2 => {
          let objPlan =
          {
            "discount": +element2.discount,
            "attributesEntity": {
              "attributeId": element.attributesEntityExtended.id,
            },
            "planEntity": {
              "planId": element2.id
            }
          }
          obj.discountEntities.push(objPlan);
        });
      }
    });

    console.log(obj);

    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = { headers: headers };
    return this.http.put(this.url + '/contractTemplate/update/' + id, obj, options).pipe(map(res => res.json()));
  }

  searchContractTemplate(templateName) {
    let obj =
    {
      "contractTemplateName": templateName,
    };
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = { headers: headers };
    return this.http.post(this.url + '/contractTemplate/search', obj, options).pipe(map(res => res.json()));
  }

  getContractTemplate() {
    return this.http.get(this.url + '/contractTemplate/list').pipe(map(res => res.json()));
  }

  //   http://localhost:9090/contractTemplate/list

  // http://localhost:9090/contractTemplate/create
 


}
