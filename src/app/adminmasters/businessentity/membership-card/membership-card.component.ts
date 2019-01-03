import { Component, OnInit } from '@angular/core';
import { MembershipCard, Institution, CourseCategory, CourseProfile, selectedStudents, StudentCard } from './membership-card';
import { MembershipCardService } from './membership-card.service';
import { Student } from '../../institutions/student/student';
import { StudentService } from '../../institutions/student/student.service';
import { PlanName } from '../../businessentity/plan-name/plan-name';
import { PlansObject } from "../../businessentity/plans/plans-object";
import Swal from 'sweetalert2';
import { ViewChild } from '@angular/core';
import { SelectDropDownComponent } from "ngx-select-dropdown";
import { EmailTemplateServicesService } from '../../accesscontrol/email-template/email-template-services.service';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-membership-card',
  templateUrl: './membership-card.component.html',
  styleUrls: ['./membership-card.component.css']
})
export class MembershipCardComponent implements OnInit {
  public myAngularxQrCode: string = null;
  elementType = 'svg';
  value = 'Chandler Bing';
  format = 'CODE128';
  lineColor = '#000000';
  width = 1;
  height = 40;
  displayValue = false;
  fontOptions = '';
  font = 'monospace';
  textAlign = 'center';
  textPosition = 'bottom';
  textMargin = 2;
  fontSize = 20;
  background = '#ffffff';
  margin = 10;
  marginTop = 10;
  marginBottom = 10;
  marginLeft = 10;
  marginRight = 10;
  itemsPerPage2: number = 1;
  pagenumber: string;
  p: number = 1;
  pnamechangeflag: boolean;
  cnamechangeflag: boolean;
  anamechangeflag: boolean;
  enamechangeflag : boolean;

  studentstatus: any;


  isListContainsData: boolean;
  isSearchClicked = false;
  // alertMassege = "";

  plan: PlanName = new PlanName();
  planNameList: PlansObject[] = [];
  planNameListLocal: PlansObject[] = [];

  courseCategoryLocal = [];
  courseLocal = [];
  courseCategory = [];
  courses = [];
  studentList: Student[]=[];
  selectedStudentName: string;
  membershipCard: MembershipCard = new MembershipCard();
  membershipCardList: MembershipCard[] = [];

  institution: Institution = new Institution();
  student: Student = new Student();
  selectedStudentData: Student = new Student();


  institutionList: Institution[] = [];
  institutionListLocal: Institution[] = [];
  selectedInstitute: string;

  courseCategoryList: CourseCategory[] = [];
  selectedCategory: string;

  courseList: CourseProfile[] = [];
  selectedCourse: string;

  statusList: Student[] = [];
  isEditColumnVisible: boolean;
  isStartDateColumnVisible : boolean;
  studentDetailsForCard: Student = new Student();

  studentCardList: StudentCard[] = [];


  @ViewChild('instituteName') public ngSelectInstituteName: SelectDropDownComponent;
  @ViewChild('courseCategoryName') public ngSelectCourseCategoryName: SelectDropDownComponent;
  @ViewChild('courseName') public ngSelectCourseName: SelectDropDownComponent;
  @ViewChild('status') public ngSelectStatusValue: SelectDropDownComponent;

  get values(): string[] {
    return this.value.split('\n');
  }

  // selectedStudentsForEmailOrId: selectedStudents[] = [];
  selectedStudentsForEmailOrId: Student[] = [];



  studentPaymentTemplate: any;


  constructor(private membershipCardService: MembershipCardService,
    private emailTemplateservice: EmailTemplateServicesService,
    private studentService: StudentService) { }

  ngOnInit() {
    this.isStartDateColumnVisible = false;
    this.isListContainsData = false;
    this.isSearchClicked = false;
    this.myAngularxQrCode = 'Name:ROSS GELLER,Id:NFRVBECS0001,Card:SILVER-ANNUAL,Expiry:08-10-2019';
    this.getInstitution();
    this.getStudent();
    this.getPlanName();
    this.pageChange(5);
    this.getStatus();
    this.selectedStudentsForEmailOrId= [];


    this.getEmailTemplate("froalaEditorStudentPayment", "StudentPayment");

    this.changelistview("");
  }

  changelistview(value) {
    console.log("value");
    console.log(value);
    if (value == 'created') {
      this.cnamechangeflag = true;
      this.pnamechangeflag = false;
      this.anamechangeflag = false;
      this.enamechangeflag = false;
    } else if (value == 'Payment') {
      this.cnamechangeflag = false;
      this.pnamechangeflag = true;
      this.anamechangeflag = false;
      this.enamechangeflag = false;
    }
    else if (value == 'Active') {
      this.cnamechangeflag = false;
      this.pnamechangeflag = false;
      this.anamechangeflag = true;
      this.enamechangeflag = true;
    }
    else
    {
      this.cnamechangeflag = false;
      this.pnamechangeflag = false;
      this.anamechangeflag = false;
      this.enamechangeflag = false;
    }
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

        // this.selectedInstituteName[0].courseCategoryVos.forEach(element => {
        //   this.courseCategoryList.push(element);
        // });

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

  selectedStatusValue: any;
  statusNameconfig = {
    displayKey: "status", //if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: this.statusList.length
  };
  changeValueStatus($event: any) {

  }





  print(): void {
    this.studentCardList = [];
    var studentCard: StudentCard = new StudentCard();
    studentCard.studentName = this.studentDetailsForCard.stdName;
    studentCard.studentEmail = this.studentDetailsForCard.stdEmail;
    studentCard.studentMcmId = this.studentDetailsForCard.mcmId;
    studentCard.studentPlan = this.studentDetailsForCard.planName;
    studentCard.studentMembership = this.studentDetailsForCard.membershipType;
    studentCard.studentQrCode = "Name:" + this.studentDetailsForCard.stdName + ",Id:" + this.studentDetailsForCard.mcmId + ",Card:" + this.studentDetailsForCard.planName+ ".";
    this.studentCardList.push(studentCard);

    setTimeout(() => {
      let printContents = "", popupWin;
      printContents = document.getElementById('customMembershipCard').innerHTML;
      popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
      popupWin.document.open();
      popupWin.document.write(`
      <html>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
      );
      popupWin.document.close();
    }, 1000);

  }



  getInstitution() {
    this.membershipCardService.getInstitution()
      .subscribe(
        (data) => {
          this.institutionList = data;
        }
      );

  }

  getStudent() {
    this.studentService.getStudent()
      .subscribe(
        (data) => {
          this.studentList = data;
          console.log(this.studentList);
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

  searchStudent(studentParameters) {


    this.changelistview("");


    var membershipObject: Student = new Student();
    this.isSearchClicked = true;


    if (typeof this.selectedInstituteName !== 'undefined' && this.selectedInstituteName.length > 0) {
      membershipObject.institutionId = this.selectedInstituteName[0].institutionId;;
    }

    if (typeof this.selectedCourseCategoryName !== 'undefined' && this.selectedCourseCategoryName.length > 0) {
      membershipObject.categoryId = this.selectedCourseCategoryName[0].categoryId;;
    }

    if (typeof this.selectedCourseName !== 'undefined' && this.selectedCourseName.length > 0) {
      membershipObject.courseId = this.selectedCourseName[0].courseId;
    }

    if (typeof this.selectedStatusValue !== 'undefined' && this.selectedStatusValue.length > 0) {
      membershipObject.statusId = this.selectedStatusValue[0].statusId
    }


    membershipObject.stdName = studentParameters.stdName;  



    if (typeof membershipObject.institutionId === 'undefined' && typeof membershipObject.categoryId === 'undefined' && typeof membershipObject.courseId === 'undefined' && typeof membershipObject.stdName === 'undefined' && typeof membershipObject.statusId === 'undefined') {
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
      this.studentService.searchStudent(membershipObject)
        .subscribe(
          (data) => {
            this.studentList = data;
            if (typeof this.studentList !== 'undefined' && this.studentList.length > 0) {
              this.isListContainsData = true;
              console.log(this.studentList);
              if (this.studentList[0].statusName.toLowerCase() == 'created') {
                //this.isEditColumnVisible = true;
                this.makeCreatedStudentColumnsVisible();

              } else if (this.studentList[0].statusName.toLowerCase() == 'payment') {
               // this.isEditColumnVisible = true;
               this.makeCreatedStudentColumnsVisible();
              }
              else if (this.studentList[0].statusName.toLowerCase() == 'active') {
                this.makeActiveStudentColumnsVisible()
               // this.isStartDateColumnVisible = true;
              }
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

  makeCreatedStudentColumnsVisible()
  {
   // this.isEditColumnVisible = true;
    this.isStartDateColumnVisible = false;
  }
  makeActiveStudentColumnsVisible()
  {
   // this.isEditColumnVisible = false;
    this.isStartDateColumnVisible = true;
  }





  searchClear() {
    this.membershipCard = new MembershipCard();

    this.ngSelectInstituteName.deselectItem(this.selectedInstituteName, 0);
    this.ngSelectInstituteName.ngOnInit();
    this.ngSelectCourseCategoryName.deselectItem(this.selectedCourseCategoryName, 0);
    this.ngSelectCourseCategoryName.ngOnInit();
    this.ngSelectCourseName.deselectItem(this.selectedCourseName, 0);
    this.ngSelectCourseName.ngOnInit();
    this.ngSelectStatusValue.deselectItem(this.selectedStatusValue, 0);
    this.ngSelectStatusValue.ngOnInit();
  }


  public currentDateModule: any;
  public endDateModule: any;
  localDate = new Date();

  selectedStudent(itemstatus, student, checked) {
    console.log(student);
    // console.log(this.planNameList);

    this.changelistview(itemstatus);

    if (checked) {
      this.selectedStudentsForEmailOrId.push(student);
    }
    else {
      var localData = this.selectedStudentsForEmailOrId.filter(x => x.stdId != student.stdId);
      this.selectedStudentsForEmailOrId = localData;

      if (this.selectedStudentsForEmailOrId.length === 0) {
        this.cnamechangeflag = false;
        this.pnamechangeflag = false;
        this.anamechangeflag = false;
        this.enamechangeflag = false;
      }
    }




  }
  studentListLocal: Student[] = [];
  planChange(plan) {

    this.studentListLocal = this.studentList.filter((item) => item.planId == plan)
    // this.planNameListLocal = this.planNameList.filter((item) => item.planId == plan);
    // this.selectedStudentData.plan = "" + this.planNameListLocal[0].planId;
    // this.selectedStudentData.planAmount = this.planNameListLocal[0].planPrice;

    if (this.studentListLocal[0].plan.planMembership == "Monthly") {
      this.currentDateModule = { date: { year: this.localDate.getFullYear(), month: this.localDate.getMonth() + 2, day: this.localDate.getDate() } };
      this.selectedStudentData.planEndDate = this.currentDateModule;
    }
    else if (this.studentListLocal[0].plan.planMembership == "Annual") {
      this.currentDateModule = { date: { year: this.localDate.getFullYear() + 1, month: this.localDate.getMonth() + 1, day: this.localDate.getDate() } };
      this.selectedStudentData.planEndDate = this.currentDateModule;
    }

  }

  generateMembershipId() {
    console.log(this.selectedStudentData);
    console.log(this.institutionList);

    var institutionListLocal: Institution[] = [];
    institutionListLocal = this.institutionList.filter((item) => item.instName == this.selectedStudentData.institutionName);

    console.log(institutionListLocal);
    ;
  }



  studentNameLocal = "";
  mcmIdLocal = "";
  planLocal = "";

  idCardTemplate: any[] = [];

  proceedClick() {
    this.studentCardList = [];
    console.log("seklected")
    console.log(this.selectedStudentsForEmailOrId)

    for (let studentLocal of this.selectedStudentsForEmailOrId) {
      console.log("studentlocallist")
      console.log(studentLocal)
      console.log(studentLocal.mcmId)
      var studentCard: StudentCard = new StudentCard();
      studentCard.studentName = studentLocal.stdName;
      studentCard.studentMcmId = studentLocal.mcmId;
      studentCard.studentPlan = studentLocal.planName;
      studentCard.studentMembership=studentLocal.membershipType;
       console.log(studentCard.studentPlan);
   
      studentCard.studentEmail = studentLocal.stdEmail;
      // // this.planNameListLocal = this.planNameList.filter((item) => item.planId == studentLocal.plan);
      // var planName = "";
      // if (this.planNameListLocal.length > 0) {
      //   planName = this.planNameListLocal[0].planName;
      // }
      
      // console.log(studentLocal.planName);
      studentCard.studentQrCode = "Name:" + studentLocal.stdName + ",Id:" + studentLocal.mcmId + ",Card:" + studentLocal.planName+ ".";
      this.studentCardList.push(studentCard);
    }

    setTimeout(() => {
      let printContents = "", popupWin;
      printContents = document.getElementById('customMembershipCard').innerHTML;
      popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
      popupWin.document.open();
      popupWin.document.write(`
      <html>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
      );
      popupWin.document.close();
    }, 1000)

    // console.log(this.planNameList);

    // let printContents = "", popupWin;
    // let list2 = [];
    // for (let studentLocal of this.selectedStudentsForEmailOrId) {
    //   this.studentNameLocal = studentLocal.stdName;
    //   this.mcmIdLocal = studentLocal.mcmId;
    //   this.planNameListLocal = this.planNameList.filter((item) => item.planId == studentLocal.plan);
    //   var planName = "";
    //   if (this.planNameListLocal.length > 0) {
    //     planName = this.planNameListLocal[0].planName;
    //   }

    //   var htmlCode = document.getElementById('customMembershipCard').innerHTML;
    //   var stdName = /studentName/gi;
    //   var stdMcmId = /studentMcmId/gi;
    //   var stdPlan = /studentPlan/gi;
    //   var temp = htmlCode.replace(stdName, studentLocal.stdName);
    //   var temp2 = temp.replace(stdMcmId, studentLocal.mcmId);
    //   var temp3 = temp2.replace(stdPlan, planName);
    //   list2.push(temp3);
    // }

    // list2.forEach(element => {
    //   printContents += element;
    // });

    // popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    // popupWin.document.open();
    // popupWin.document.write(`
    //   <html>
    // <body onload="window.print();window.close()">${printContents}</body>
    //   </html>`
    // );
    // popupWin.document.close();

  }


  getStatus() {
    this.studentService.getStatus().subscribe(data => {
      console.log(data);
      this.statusList = data;
      console.log(this.statusList);

    });
  }
  selectedStudentsStatus: any;
  checkedval: boolean;
  toggleSelect(checked) {
    this.selectedStudentsForEmailOrId = [];
    this.selectedStudentsStatus = this.studentList[0].statusName;
    this.changelistview(this.selectedStudentsStatus);
    console.log("this.student.statusId")
    console.log(this.selectedStudentsStatus)


    if (checked) {
      this.checkedval = true;
      this.studentList.forEach(element => {
        this.selectedStudentsForEmailOrId.push(element);
      });
      this.selectedStudentsForEmailOrId = this.studentList;

    }
    else {
      this.checkedval = null;
      this.cnamechangeflag = false;
      this.pnamechangeflag = false;
      this.anamechangeflag = false;
      this.enamechangeflag = false;

      this.selectedStudentsForEmailOrId = [];
    }
  }

  editUser(user) {
    console.log(user);
    this.selectedStudentData = user;
    this.studentListLocal = this.studentList.filter((item) => item.plan.planId == user.plan.planId);
    this.selectedStudentData.plan.planName = this.studentListLocal[0].plan.planName;
    this.selectedStudentData.plan.planPrice = this.studentListLocal[0].plan.planPrice;
    // this.selectedStudentData.plan.planMembership = this.planNameListLocal[0].planMembership;
    this.currentDateModule = { date: { year: this.localDate.getFullYear(), month: this.localDate.getMonth() + 1, day: this.localDate.getDate() } };
    this.selectedStudentData.planStartDate = this.currentDateModule;

    if (this.studentListLocal[0].plan.planMembership == "Monthly") {
      this.currentDateModule = { date: { year: this.localDate.getFullYear(), month: this.localDate.getMonth() + 2, day: this.localDate.getDate() } };
      this.selectedStudentData.planEndDate = this.currentDateModule;
    }
    else if (this.studentListLocal[0].plan.planMembership == "Annualy") {
      this.currentDateModule = { date: { year: this.localDate.getFullYear() + 1, month: this.localDate.getMonth() + 1, day: this.localDate.getDate() } };
      this.selectedStudentData.planEndDate = this.currentDateModule;
    }
    console.log(this.selectedStudentData);
  }

  // sendEmail() {
  //   // console.log(this.studentPaymentTemplate);
  //   this.selectedStudentsForEmailOrId.forEach(element => {
  //     console.log(element);
  //     console.log(this.studentPaymentTemplate);
  //     var studentName = /@studentName/gi;
  //     var collegeName = /@collegeName/gi;
  //     var planName = /@planName/gi;
  //     var membershipType = /@membershipType/gi;
  //     var amount = /@amount/gi;
  //     var url =  /@id/gi;

  //      var temp = this.studentPaymentTemplate.replace(studentName, element.stdName);
  //      var temp2 = temp.replace(amount, element.planAmount);
  //      var temp3 = temp2.replace(collegeName, element.institutionName);
  //      var temp4 = temp3.replace(planName, element.plan);
  //      var temp5 = temp4.replace(membershipType, element.membershipType);
  //      var temp6 = temp5.replace(url, element.stdId);

  //     console.log(temp6);
  //     this.membershipCardService.sendStudentPaymentRequestMail(temp6)
  //       .subscribe(
  //         (data) => {
  //           console.log(data);
  //         },
  //         (error) => {
  //           console.log(error);
  //         }
  //       );
  //   });

  //   console.log("completed");


  // }
  sendEmail() {
    this.membershipCardService.sendStudentPaymentRequestMail(this.studentPaymentTemplate, this.selectedStudentsForEmailOrId)
      .subscribe(
        (data) => {
          this.selectedStudentsForEmailOrId = [];
          alert("mail sent");
        },
        (error) => {
          console.log(error);
        }
      );



  }

  sendLoginEmail() {
    this.membershipCardService.sendstudentCredentialtMail(this.studentPaymentTemplate, this.selectedStudentsForEmailOrId)
      .subscribe(
        (data) => {
          alert("Login mail sent");
        },
        (error) => {
          console.log(error);
        }
      );



  }

  getEmailTemplate(editorId, templateName) {
    this.emailTemplateservice.getEmailTemplate(templateName).subscribe(data => {
      this.studentPaymentTemplate = data.emailContent;
      console.log(this.studentPaymentTemplate);
    });
  }

  selectedStudentForcard(student: Student): void {
    this.studentDetailsForCard = student;

  }

  generateId() {
    var listSelectedStudentsForEmailOrIdLocal = this.selectedStudentsForEmailOrId;
    this.membershipCardService.generateMCMId(listSelectedStudentsForEmailOrIdLocal)

      .subscribe(

        (data) => {
          this.selectedStudentsForEmailOrId= [];
          console.log("gsfgsdhgfhds")
          alert("Code  Generated");
          
        },
        (error) => {
          console.log(error);
        }
      );

  }
  

}
