import { Component, OnInit, NgZone } from '@angular/core';
import { Student } from "../../app/adminmasters/institutions/student/student";
import { StudentProfileService } from "./student-profile.service";
import { CommonServicesService } from "../../app/common-services.service";
import { StudentDetailsService } from '../shared/student-details.service';
import { StudentPayment } from './studentPaymentObject';
import { PlanService } from '../adminmasters/businessentity/plans/plans.service';
declare var $:any;

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {

  student : Student = new Student();
  studentPlan : Student = new Student();
  studentPayment : StudentPayment = new StudentPayment();
  studentPaymentList: StudentPayment[]=[];

 countries = [];
  states = [];
  cities = [];
  statesLocal = [];
  citiesLocal = [];
  inidisabled:boolean = true;
  studentEmail : string;
  stdId : number;
  itemsPerPage2: number = 1;
  pagenumber: string;
  p: number = 1;

  constructor(private studentProfileService : StudentProfileService,
    private studentDetailsService : StudentDetailsService,
    private service: PlanService,
    private commonService: CommonServicesService) {
     
     }

  ngOnInit() {
    this.studentEmail = this.studentDetailsService.getStudentEmail();
    this.getCountries();
    this.getStates();
    this.getCities();
    this.getStudentDetails(this.studentEmail);
    this.stdId= this.studentDetailsService.getStudentId();
    this.getPaymentDetails(this.stdId);
    this.pageChange(5);

  }

  uploadimage($event){
    console.log($event);
  }



  getStudentDetails(studentEmail : string) : void
  {
  
    console.log(studentEmail);
    this.studentProfileService.getStudent(studentEmail).subscribe(
      (data)=>{
        this.student = data;
        console.log(this.student);
        this.onSelect(this.student.countryName);
        this.onStateSelect(this.student.state);
      }
    );

  }

  getPaymentDetails(stdId : number) : void
  {
    this.studentProfileService.getPaymentDetails(stdId).subscribe(
      (data)=>{
        this.studentPaymentList = data;
        console.log(this.studentPaymentList);
      }
    );

  }

  editenable(){
    this.inidisabled = false;
  }


  getCountries() {
    this.commonService.getCountries().subscribe(data => {
      this.countries = data
    });
  }

  getStates() {
    this.commonService.getStates().subscribe(data => {
      this.statesLocal = data
    });
  }
  getCities() {
    this.commonService.getCities().subscribe(data => {
      this.citiesLocal = data
    });
  }

  onSelect(countryid) {
   
    this.states = this.statesLocal.filter((item) => item.countryCode == countryid);
   
    this.cities = [];
  }

  onStateSelect(stateid) {
   
    this.cities = this.citiesLocal.filter((item) => item.stateCode == stateid);
  }

  update()
  {
    this.studentProfileService.updateStudent(this.student)
        .subscribe (
        (data) => 
            {   
                 this.getStudentDetails(this.studentEmail);
                 this.inidisabled = true;
            },
            (error) => 
            {
                console.log(error);
                alert("Try again");
            }
        );
  }

 
  
  pageChange(pagenumber) {

    this.pagenumber = pagenumber;
  }
  customPageChange(number) {
    this.p = number;
    this.itemsPerPage2 = number;
    if (this.p == 1) {
      this.itemsPerPage2 = 1;
    }
    else {
      this.itemsPerPage2 = +this.pagenumber;
    }
  }
  

}
