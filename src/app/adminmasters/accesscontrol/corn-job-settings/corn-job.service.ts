import { Injectable } from '@angular/core';
import { Constants } from "../../../Constants";
import {Http} from '@angular/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CornJobService {
  url =  Constants.HOME_URL;
  constructor(private http : Http) { }

  SaveCornJob(cornJobDetails)
  {
    let obj ={
      "renewalEmailBefore":cornJobDetails.renewalEmailBefore,
      "renewalEmailTime":cornJobDetails.renewalEmailTime
    }
     return this.http.post(this.url+'/renewal/create', obj).pipe(map(res => res.json()));
  }

  UpdateCornJob(cornJobDetails)
  {
    let obj ={
      "renewalEmailBefore":cornJobDetails.renewalEmailBefore,
      "renewalEmailTime":cornJobDetails.renewalEmailTime
    }
    console.log(obj);
     return this.http.put(this.url+'/renewal/update/'+cornJobDetails.id, obj).pipe(map(res => res.json()));
  }

  getCornJob()
  {
     return this.http.get(this.url+'/renewal/list',).pipe(map(res => res.json()));
  }

}
