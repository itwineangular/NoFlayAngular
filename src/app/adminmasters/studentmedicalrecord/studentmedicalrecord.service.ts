import { Injectable } from '@angular/core';
import { Constants } from "../../Constants";
import { Http, Headers, RequestOptions } from '@angular/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class StudentmedicalrecordService {

  url = Constants.HOME_URL;
  tokens = sessionStorage.getItem("token_type");
  constructor(private http : Http)
  {


  }


  saveStudentMedicalRecord(data, studentId) {
    console.log("here");
    console.log(data);
    console.log(studentId);
    let obj = {

      "weight": data.weight,
      "height": data.height,
      "bloodPressure": data.bloodPressure,
      "bloodGluContent": data.bloodGluContent,
      "pulse": data.pulse,
      "respiratoryRate": data.respiratoryRate,
      "bodyTemp": data.bodyTemp,
      "bodyFat": data.bodyFat,
      "bodyMass": data.bodyMass,
      "leanBody": data.leanBody,
      "waistCirumference": data.waistCirumference,
      "hospitalNmae": data.hospitalNmae,
      "dateOfAdmission": data.dateOfAdmission.formatted,
      "dateOfDischarge": data.dateOfDischarge.formatted,
      "treatementFor": data.treatementFor,
      "dischargeSummary": data.dischargeSummary,
      "medication": data.medication,
      "specialCare": data.specialCare,
      "stdId": studentId
    };


    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokens
    });
   
    let options = { headers: headers };
    return this.http.post(this.url + '/medicalrecord/create', obj, options).pipe(map(res => res.json()));

  }


  updateStudentMedicalRecord(data) {
    let obj = {
      "id":data.id,
      "weight": data.weight,
      "height": data.height,
      "bloodPressure": data.bloodPressure,
      "bloodGluContent": data.bloodGluContent,
      "pulse": data.pulse,
      "respiratoryRate": data.respiratoryRate,
      "bodyTemp": data.bodyTemp,
      "bodyFat": data.bodyFat,
      "bodyMass": data.bodyMass,
      "leanBody": data.leanBody,
      "waistCirumference": data.waistCirumference,
      "hospitalNmae": data.hospitalNmae,
      "dateOfAdmission": data.dateOfAdmission.formatted,
      "dateOfDischarge": data.dateOfDischarge.formatted,
      "treatementFor": data.treatementFor,
      "dischargeSummary": data.dischargeSummary,
      "medication": data.medication,
      "specialCare": data.specialCare
    };


    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokens
    });
   
    let options = { headers: headers };
    return this.http.post(this.url + '/medicalrecord/update/' + data.medicalId, obj, options).pipe(map(res => res.json()));

  }

  getStudentMedicalRecord(studentId) {
    console.log("student id for get")
    console.log(studentId);
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokens
    });
  
    let options = { headers: headers };
    return this.http.get(this.url + '/medicalrecord/'+studentId, options).pipe(map(res => res.json()));
  }

  searchMedicalRecord(value,studentId) {

    var startDateLocal =value.startDate.formatted;
    var endtDateLocal =value.endDate.formatted;

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokens
    });
   
    let options = { headers: headers };
    
    return this.http.get(this.url+'/students/searchMedicalHistoryBetweenDate?startDate='+startDateLocal+'&endDate='+endtDateLocal+'&stdId='+studentId, options).pipe(map(res => res.json()));

  }
   

}
