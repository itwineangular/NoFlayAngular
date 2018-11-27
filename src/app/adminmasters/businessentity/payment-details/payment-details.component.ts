import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { SelectDropDownComponent } from "ngx-select-dropdown";
import {PaymentDetails,Institution, CourseCategory, CourseProfile, selectedStudents,Payment } from './payment-details';
import {Student} from '../../institutions/student/student';
import {StudentService} from '../../institutions/student/student.service';
import { PaymentDetailsService } from './payment-details.service';

import Swal from 'sweetalert2';
import {PlanName} from '../plan-name/plan-name';
import {PlansObject} from '../../businessentity/plans/plans-object';
import {PaymentService} from '../../payment/payment.service';


@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent implements OnInit {

  @ViewChild('instituteName') public ngSelectInstituteName: SelectDropDownComponent;
  @ViewChild('courseCategoryName') public ngSelectCourseCategoryName: SelectDropDownComponent;
  @ViewChild('courseName') public ngSelectCourseName: SelectDropDownComponent;
   @ViewChild('status') public ngSelectStatusValue: SelectDropDownComponent;

   
   key: string;
  reverse: boolean = false;
  caseInsensitive: boolean = true;

  itemsPerPage2: number = 1;
  pagenumber: string;
  p: number = 1;

  payment : Payment = new Payment();
  paymentList : Payment[] = [];

  student: Student = new Student();
  studentList: Student[] = [];
  selectedStudentData: Student = new Student();
//paymentDetails : PaymentCard = new PaymentCard();


  //institution: Institution = new Institution();
  institutionList:Institution[]= [];

  plan: PlanName = new PlanName();
  planNameList: PlansObject[] = [];
  planNameListLocal: PlansObject[] = [];

  paymentDetails: PaymentDetails = new PaymentDetails();
  paymentDetailsList :PaymentDetails[]=[];

  courseCategoryList: CourseCategory[] = [];
  courseList: CourseProfile[] = [];

  statusList: Student[]=[];

  isSearchClicked = false;
  isListContainsData: boolean;

 

  studentstatus:any;
  public currentDateModule: any;
  public endDateModule: any;
  localDate = new Date();

  constructor(private studentService: StudentService,
    private paymentDetailsService : PaymentDetailsService,
    private paymentService :PaymentService
    ) { }

  ngOnInit() {
    this.getStudent();
    this.getInstitution();
    this.getStatus();
    this.getPayment();
    this.getPlanName();
    this.isSearchClicked = false;
    this.pageChange(5);

  }

  viewUser(student : Student) : void
  {
    console.log("padgdsfyment");
    console.log(student);
    this.payment =new Payment;
    this.selectedStudentData = student;
    var data = this.paymentList.filter(x=>x.studentProfile.stdId == student.stdId);
    console.log(data);
    if(data.length>0)
    {
      this.payment = data[0];
    }

    // var planData = this.planNameList.filter(x=>x.planId == student.plan);
    // if(planData.length>0)
    // {
    //   this.selectedStudentData.plan = planData[0].planName;
    // }

   
  }

  getPayment() {
    this.paymentService.getPayment()
      .subscribe(
        (data) => {
          console.log("data"+data);
          this.paymentList = data;
          console.log("payment list"+this.paymentList);
        }
      );

  }

  getStudent() {
    this.studentService.getStudent()
      .subscribe(
        (data) => {
          this.studentList = data;
          console.log("student list"+this.studentList);
        }
      );

  }

  getInstitution() {
    this.paymentDetailsService.getInstitution()
      .subscribe(
        (data) => {
          this.institutionList = data;
           console.log("institution list"+this.studentList);
        }
      );

  }


  getPlanName() {
    this.studentService.getPlanName().subscribe(data => {
      this.planNameList = data;
      console.log("planNameList");
      console.log(this.planNameList);
    });
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


  getStatus() {
    this.studentService.getStatus().subscribe(data => {
      console.log(data);
      this.statusList = data;
      console.log(this.statusList);

    });
  }


  selectedInstituteName: any;
  configInstituteName = {
    displayKey: "instName", //if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: this.institutionList.length
  };
  changeInstituteNameValue($event: any) {
    console.log(this.selectedInstituteName);
    if (this.selectedInstituteName.length > 0) {
      if (this.selectedInstituteName[0].courseCategoryVos.length > 0) {
        this.courseCategoryList = [];
        this.courseList = [];
        this.courseCategoryList = this.selectedInstituteName[0].courseCategoryVos;
      }
    }
    else {
      this.courseCategoryList = [];
      this.courseList = [];
    }

    this.ngSelectCourseCategoryName.deselectItem(this.selectedCourseCategoryName, 0);
    this.ngSelectCourseCategoryName.ngOnInit();
    this.ngSelectCourseName.deselectItem(this.selectedCourseName, 0);
    this.ngSelectCourseName.ngOnInit();
  }

  selectedCourseCategoryName: any;
  configCourseCategoryName = {
    displayKey: "categoryName",
    search: true,
    limitTo: this.courseCategoryList.length
  };
  changeCourseCategoryNameValue($event: any) {
    this.courseList = []
    if (this.selectedCourseCategoryName.length > 0) {
      this.courseList = this.selectedCourseCategoryName[0].courseProfileVos;
    }
    this.ngSelectCourseName.deselectItem(this.selectedCourseName, 0);
    this.ngSelectCourseName.ngOnInit();
  }

  selectedCourseName: any;
  configCourseName = {
    displayKey: "courseName",
    search: true,
    limitTo: this.courseList.length
  };
  changeCourseNameValue($event: any) {

  }

  selectedStatusValue : any;
  statusNameconfig = {
    displayKey: "status", //if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: this.statusList.length
  };
  changeValueStatus($event: any)
   {
    
  }

  searchStudent(studentParameters) {
    var paymentDetailsObject: Student = new Student();
    this.isSearchClicked = true;


    if (typeof this.selectedInstituteName !== 'undefined' && this.selectedInstituteName.length > 0) {
      paymentDetailsObject.institutionId = this.selectedInstituteName[0].institutionId;
    }

    if (typeof this.selectedCourseCategoryName !== 'undefined' && this.selectedCourseCategoryName.length > 0) {
      paymentDetailsObject.categoryId = this.selectedCourseCategoryName[0].categoryId;
    }

    if (typeof this.selectedCourseName !== 'undefined' && this.selectedCourseName.length > 0) {
      paymentDetailsObject.courseId = this.selectedCourseName[0].courseId;
    }

    if (typeof this.selectedStatusValue !== 'undefined' && this.selectedStatusValue.length>0) 
    {
      paymentDetailsObject.statusId = this.selectedStatusValue[0].statusId
    }

     paymentDetailsObject.stdName = studentParameters.stdName;
     paymentDetailsObject.status = studentParameters.status;
    // this.studentstatus = paymentDetailsObject.status;
    // this.changelistview( membershipObject.status);


     // paymentDetailsObject.categoryId = this.selectedCourseCategoryName[0].categoryId;
      if (typeof paymentDetailsObject.institutionId === 'undefined' && 
      typeof paymentDetailsObject.categoryId === 'undefined' 
      && typeof paymentDetailsObject.courseId === 'undefined' 
      && typeof paymentDetailsObject.stdName === 'undefined' 
       && typeof paymentDetailsObject.statusId === 'undefined'
    ) {
      Swal({
        title: 'Invalid!!',
        text: 'Atleast enter any one field.',
        showCancelButton: false,
        confirmButtonText: 'Ok',
      });
      this.isListContainsData = false;
      this.studentList = [];

    }

    else {
      this.studentService.searchStudent(paymentDetailsObject)
        .subscribe(
          (data) => {
             this.studentList = data;
            if (typeof this.studentList !== 'undefined' && this.studentList.length > 0) {
              console.log(data);
              this.studentList = [];
              data.forEach(element => {
                var studentDataLocal = element;

                var paymentDetailsLocal = this.paymentList.filter(x=>x.studentProfile.stdId == element.stdId);
                if(paymentDetailsLocal.length>0)
                {
                  studentDataLocal.paymentDate = paymentDetailsLocal[0].paymentDate;
                }
                
                this.studentList.push(studentDataLocal);
              });
              // this.studentList = data;
              console.log(this.studentList);
              this.isListContainsData = true;
            }
            else {
              this.isListContainsData = false;
            }
          },
          (error) => {
            console.log(error);
            alert("Try again");
          }
        );
    }
  }

  //   else {
  //     this.studentService.searchStudent(paymentDetailsObject)
  //       .subscribe(
  //         (data) => {
  //           this.studentList = data;
  //           if (typeof this.studentList !== 'undefined' && this.studentList.length > 0) {
  //             this.isListContainsData = true;
  //           }
  //           else {
  //             this.isListContainsData = false;
  //           }
  //         },
  //         (error) => {
  //           console.log(error);
  //           alert("Try again");
  //         }
  //       );
  //   }
  // }


  searchClear() {
    this.paymentDetails = new PaymentDetails();

    this.ngSelectInstituteName.deselectItem(this.selectedInstituteName, 0);
    this.ngSelectInstituteName.ngOnInit();
    this.ngSelectCourseCategoryName.deselectItem(this.selectedCourseCategoryName, 0);
    this.ngSelectCourseCategoryName.ngOnInit();
    this.ngSelectCourseName.deselectItem(this.selectedCourseName, 0);
    this.ngSelectCourseName.ngOnInit();
    this.ngSelectStatusValue.deselectItem(this.selectedStatusValue,0);
    this.ngSelectStatusValue.ngOnInit();



  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  

}
