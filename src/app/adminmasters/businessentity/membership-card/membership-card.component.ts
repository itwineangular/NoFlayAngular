import { Component, OnInit } from '@angular/core';
import { MembershipCard, Institution, CourseCategory, CourseProfile, selectedStudents } from './membership-card';
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
  studentstatus:any;


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
  studentList: Student[];
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

  statusList: Student[];


  @ViewChild('instituteName') public ngSelectInstituteName: SelectDropDownComponent;
  @ViewChild('courseCategoryName') public ngSelectCourseCategoryName: SelectDropDownComponent;
  @ViewChild('courseName') public ngSelectCourseName: SelectDropDownComponent;

  get values(): string[] {
    return this.value.split('\n');
  }

  // selectedStudentsForEmailOrId: selectedStudents[] = [];
  selectedStudentsForEmailOrId: any = [];



  studentPaymentTemplate: any;


  constructor(private membershipCardService: MembershipCardService,
    private emailTemplateservice: EmailTemplateServicesService,
    private studentService: StudentService) { }

  ngOnInit() {

    this.isListContainsData = false;
    this.isSearchClicked = false;
    this.myAngularxQrCode = 'Name:ROSS GELLER,Id:NFRVBECS0001,Card:SILVER-ANNUAL,Expiry:08-10-2019';
    this.getInstitution();
    this.getStudent();
    this.getPlanName();
    this.pageChange(5);
    this.getStatus();


    this.getEmailTemplate("froalaEditorStudentPayment", "StudentPayment");


  }

  changelistview(value) {
    console.log(value);
    if (value == 'created') {

      this.cnamechangeflag = true;
      this.pnamechangeflag = false;
    } else if (value == 'Payment') {

      this.cnamechangeflag = false;
      this.pnamechangeflag = true;
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





  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('customMembershipCard').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
          //........Customized style.......
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }

  // onInstituteSelect(institutionId) {

  //   this.courseCategoryList = [];
  //   this.courseList = [];
  //   var institutionListLocal: Institution[] = [];
  //   institutionListLocal = this.institutionList.filter((item) => item.institutionId == institutionId);
  //   for (let item of institutionListLocal[0].courseCategory) {
  //     this.courseCategoryList.push(item);
  //   }

  //   this.selectedInstitute = institutionListLocal[0].instName.toString();

  // }


  // onCourseCategorySelect(categoryId) {

  //   this.courseList = [];
  //   var courseCategoryListLocal: CourseCategory[] = [];
  //   courseCategoryListLocal = this.courseCategoryList.filter((item) => item.categoryId == categoryId);
  //   for (let item of courseCategoryListLocal[0].courseProfileVos) {
  //     this.courseList.push(item);
  //   }
  //   this.selectedCategory = courseCategoryListLocal[0].categoryName.toString();

  // }

  // onCourseSelect(courseId) {
  //   this.selectedCourse = courseId.toString();
  // }

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
    var membershipObject: Student = new Student();
    this.isSearchClicked = true;


    if (typeof this.selectedInstituteName !== 'undefined' && this.selectedInstituteName.length > 0) {
      membershipObject.institutionName = this.selectedInstituteName[0].instName;;
    }

    if (typeof this.selectedCourseCategoryName !== 'undefined' && this.selectedCourseCategoryName.length > 0) {
      membershipObject.courseCategory = this.selectedCourseCategoryName[0].categoryName;;
    }

    if (typeof this.selectedCourseName !== 'undefined' && this.selectedCourseName.length > 0) {
      membershipObject.courseName = this.selectedCourseName[0].courseName;
    }


    membershipObject.stdName = studentParameters.stdName;
    membershipObject.status = studentParameters.status;
    this.studentstatus = membershipObject.status;
    // this.changelistview( membershipObject.status);


    if (typeof membershipObject.institutionName === 'undefined' && typeof membershipObject.courseCategory === 'undefined' && typeof membershipObject.courseName === 'undefined' && typeof membershipObject.stdName === 'undefined' && typeof membershipObject.status === 'undefined') {
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





  searchClear() {
    this.membershipCard = new MembershipCard();

    this.ngSelectInstituteName.deselectItem(this.selectedInstituteName, 0);
    this.ngSelectInstituteName.ngOnInit();
    this.ngSelectCourseCategoryName.deselectItem(this.selectedCourseCategoryName, 0);
    this.ngSelectCourseCategoryName.ngOnInit();
    this.ngSelectCourseName.deselectItem(this.selectedCourseName, 0);
    this.ngSelectCourseName.ngOnInit();



  }


  public currentDateModule: any;
  public endDateModule: any;
  localDate = new Date();

  selectedStudent(itemstatus,student, checked) {
    console.log(student);
    console.log(this.planNameList);

    this.changelistview(itemstatus);

    if (checked) {

      // var selectedStudent = new selectedStudents();
      // selectedStudent.stdName = student.stdName;
      // selectedStudent.course = student.courseName;
      // selectedStudent.stdEmail = student.stdEmail;
      // selectedStudent.institutionName = student.institutionName;     
      // selectedStudent.courseCategory = student.courseCategory;      
      // selectedStudent.stdId = student.stdId;
      

      // var planData = this.planNameList.filter(x => x.planId == student.plan);
      // console.log(planData);
      // if (planData.length > 0) {
      //   selectedStudent.plan = planData[0].planName;
      //   selectedStudent.planAmount = planData[0].planPrice;
      //   selectedStudent.membershipType = planData[0].planMembership;
      // }

      // this.selectedStudentsForEmailOrId.push(selectedStudent);

      this.selectedStudentsForEmailOrId.push({
        'stdName' :student.stdName,
        'course' : student.courseName,
        'stdEmail' : student.stdEmail,
        'institutionName' : student.institutionName,     
        'courseCategory' : student.courseCategory,      
        'stdId' : student.stdId,
      });
      console.log(this.selectedStudentsForEmailOrId);

      

    }
    else {
      // var data = this.selectedStudentsForEmailOrId.filter(x => x.stdEmail != student.stdEmail);
      // this.selectedStudentsForEmailOrId = data;
     
      var values = this.selectedStudentsForEmailOrId.map(function(o) { return o.stdId; });
      const index = values.indexOf(student.stdId);
      this.selectedStudentsForEmailOrId.splice(index, 1); 
      if (this.selectedStudentsForEmailOrId.length === 0) {
        this.cnamechangeflag=false;
        this.pnamechangeflag=false;
      }
    }


   
    
  }

  planChange(plan) {
    this.planNameListLocal = this.planNameList.filter((item) => item.planId == plan);
    this.selectedStudentData.plan = "" + this.planNameListLocal[0].planId;
    this.selectedStudentData.planAmount = this.planNameListLocal[0].planPrice;

    if (this.planNameListLocal[0].planMembership == "Monthly") {
      this.currentDateModule = { date: { year: this.localDate.getFullYear(), month: this.localDate.getMonth() + 2, day: this.localDate.getDate() } };
      this.selectedStudentData.planEndDate = this.currentDateModule;
    }
    else if (this.planNameListLocal[0].planMembership == "Annual") {
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
    // console.log(institutionListLocal[0].instShortName.substring(0,2));

    //   var courseCategoryListLocal : CourseCategory[] = [];
    //   courseCategoryListLocal = this.courseCategoryList.filter((item)=> item.categoryName == this.selectedStudentData.courseCategory); 

    //   console.log(courseCategoryListLocal);
    //   console.log(courseCategoryListLocal[0].categoryCode);

    //   var courseList : CourseProfile[] = [];
    //   courseList = courseCategoryListLocal[0].courseProfile;
    //   var courseListLocal : CourseProfile[] = [];
    //   courseListLocal = courseListLocal.filter((item)=> item.courseName == this.selectedStudentData.course); 

    //   console.log(courseListLocal);
    //   console.log(courseListLocal[0].courseCode);

    //  var randomNum =   Math.floor(Math.random() * 1000) + 1  ;
    //  console.log(randomNum);

    //   var membershipId = "NF"+institutionListLocal[0].instShortName.substring(0,2)+courseCategoryListLocal[0].categoryCode+courseListLocal[0].courseCode+randomNum;
    //   console.log(membershipId);
    //   console.log(this.selectedStudentData);
  }



  proceedClick() {

  }


  getStatus() {
    this.studentService.getStatus().subscribe(data => {
      console.log(data);
      this.statusList = data;
      console.log(this.statusList);

    });
  }

  checkedval: boolean;
  toggleSelect(checked) {
   
    this.changelistview(this.studentstatus);

    if (checked) {
      this.checkedval = true;
      this.studentList.forEach(element => {
        // element.stdName = this.planname;
        var selectedStudent = new selectedStudents();
        selectedStudent.stdName = element.stdName;
        selectedStudent.course = element.courseName;
        selectedStudent.stdEmail = element.stdEmail;
        selectedStudent.institutionName = element.institutionName;
        selectedStudent.plan = element.plan;
        selectedStudent.planAmount = element.planAmount;
        selectedStudent.courseCategory = element.courseCategory;

        this.selectedStudentsForEmailOrId.push(selectedStudent);
        console.log(selectedStudent);

      });
      console.log(this.selectedStudentsForEmailOrId);
    } else {
      this.checkedval = null;
      this.cnamechangeflag=false;
      this.pnamechangeflag=false;
      // this.studentList.forEach(element => {
      //   element.plan = "";
      //   // this.selectedStudentsForEmailOrId.push(element.stdId);

      // });
    }
  }

  editUser(user)
  {
   console.log(user);
   this.selectedStudentData = user;
      this.planNameListLocal = this.planNameList.filter((item) => item.planId == user.plan);
      this.selectedStudentData.planAmount = this.planNameListLocal[0].planPrice;
      this.selectedStudentData.membershipType = this.planNameListLocal[0].planMembership;
      this.currentDateModule = { date: { year: this.localDate.getFullYear(), month: this.localDate.getMonth() + 1, day: this.localDate.getDate() } };
      this.selectedStudentData.planStartDate = this.currentDateModule;
  
      if (this.planNameListLocal[0].planMembership == "Monthly") {
        this.currentDateModule = { date: { year: this.localDate.getFullYear(), month: this.localDate.getMonth() + 2, day: this.localDate.getDate() } };
        this.selectedStudentData.planEndDate = this.currentDateModule;
      }
      else if (this.planNameListLocal[0].planMembership == "Annualy") {
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
  sendEmail(){
    this.membershipCardService.sendStudentPaymentRequestMail(this.studentPaymentTemplate)
          .subscribe(
            (data) => {
              console.log("mail");
              console.log(data);
              alert("mail sent");
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

}
