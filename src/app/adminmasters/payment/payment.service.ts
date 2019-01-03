import { Injectable } from '@angular/core';
import { Constants } from "../../Constants";
import { Http, Headers, RequestOptions } from '@angular/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  url = Constants.HOME_URL;

  tokens = sessionStorage.getItem("token_type");
  constructor(private http: Http) { }

  getStudent(id) {
    let headers = new Headers({
      'Content-Type': 'application/json',
      // 'Authorization': 'Bearer ' + this.tokens
    });
    
    let options = { headers: headers };
    return this.http.get('http://192.168.1.65:9090/students/'+id, options).pipe(map(res => res.json()));
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
      'Content-Type': 'application/json',
      // 'Authorization': 'Bearer ' + this.tokens
    });
    let options = { headers: headers };
    return this.http.post('http://192.168.1.65:9090/students/receivePayament', obj, options).pipe(map(res => res.json()));

  }

  getPayment()
  {
    
      let headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.tokens
      });
    
      let options = { headers: headers };
      return this.http.get(this.url + '/payments/lists', options).pipe(map(res => res.json()));
   
  }

  getPlan() {
  
    
    // let options = { headers: headers };
    return this.http.get( 'http://192.168.1.65:9090/plans/list').pipe(map(res => res.json()));
  }
}
