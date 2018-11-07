import { Injectable } from '@angular/core';
import { Constants } from "../../Constants";
import { Http, Headers, RequestOptions } from '@angular/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  url = Constants.HOME_URL;
  constructor(private http: Http) { }

  getStudent(id) {
    return this.http.get('http://192.168.1.51:8080/students/' + id).pipe(map(res => res.json()));
  }

  payment(id, cardNum,randomNum ,paymentDate, cardType) 
  {
    
    let obj = {
      "paymentDate": paymentDate,
      "paymentMode":cardType,
      "cardNumber": cardNum,
      "paymentReference": randomNum,
      "studentProfile": {
        "stdId": id
      }
     
      
    }
    console.log("date"+paymentDate +"mode" + cardType +"card no"+ cardNum +"rand no"+ randomNum);
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let options = { headers: headers };
    return this.http.post(this.url+'/students/receivePayament', obj, options).pipe(map(res => res.json()));

  }

  getPayment()
  {
    
      let headers = new Headers({
        'Content-Type': 'application/json'
      });
      headers.append('Access-Control-Allow-Origin', '*');
      headers.append('Access-Control-Allow-Headers', 'Content-Type');
      headers.append('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
      let options = { headers: headers };
      return this.http.get(this.url + '/payments/lists', options).pipe(map(res => res.json()));
   
  }
}
