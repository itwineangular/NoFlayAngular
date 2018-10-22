import { Component, OnInit } from '@angular/core';
import { MembershipCard, Institution, CourseCategory, CourseProfile} from './membership-card';
import {MembershipCardService} from './membership-card.service';
import {Student} from '../../institutions/student/student';
import {StudentService} from '../../institutions/student/student.service';
import {PlanName} from '../../businessentity/plan-name/plan-name';
import { PlansObject } from "../../businessentity/plans/plans-object";

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


  isListContainsData: boolean;
  isSearchClicked=false;
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
  membershipCard:MembershipCard=new MembershipCard();
  membershipCardList:MembershipCard[]=[];

    institution: Institution = new Institution();
    student: Student = new Student();
    selectedStudentData : Student = new Student();


    institutionList: Institution[] = [];
    institutionListLocal : Institution[] = [];
    selectedInstitute: string;
    
    courseCategoryList: CourseCategory[] = [];
    selectedCategory: string;
    
    courseList: CourseProfile[]=[];
    selectedCourse : string;


    

  get values(): string[] {
    return this.value.split('\n');
  }

  constructor(private membershipCardService:MembershipCardService,private studentService: StudentService) { }

  ngOnInit() {
    this.isListContainsData = false;
    this.isSearchClicked=false;
    this.myAngularxQrCode = 'Name:ROSS GELLER,Id:NFRVBECS0001,Card:SILVER-ANNUAL,Expiry:08-10-2019';
    this.getInstitution();
    this.getStudent();
     this.getPlanName();
     this.pageChange(5);

  }

//   printBarcode(): void {
//     let printContents, popupWin;
//     printContents = document.getElementById('membershipCard1').innerHTML;
//     popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
//     popupWin.document.open();
//     popupWin.document.write(`
//       <html>
//         <head>
//           <title>Print tab</title>
//           <style>
//           //........Customized style.......
//           </style>
//         </head>
//     <body onload="window.print();window.close()">${printContents}</body>
//       </html>`
//     );
//     popupWin.document.close();
// }

  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('membershipCard').innerHTML;
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

onInstituteSelect(institutionId) {
  
  this.courseCategoryList = [];
  this.courseList = [];
  var institutionListLocal : Institution[] = [];
  institutionListLocal = this.institutionList.filter((item)=> item.institutionId == institutionId);
  for(let item of institutionListLocal[0].courseCategory)
  {
      this.courseCategoryList.push(item);
  }

  this.selectedInstitute = institutionListLocal[0].instName.toString();

}


onCourseCategorySelect(categoryId) {

 this.courseList = [];
  var courseCategoryListLocal : CourseCategory[] = [];
  courseCategoryListLocal = this.courseCategoryList.filter((item)=> item.categoryId == categoryId); 
  for(let item of courseCategoryListLocal[0].courseProfile)
  {
      this.courseList.push(item);
  }
  this.selectedCategory = courseCategoryListLocal[0].categoryName.toString();

}

onCourseSelect(courseId)
{
  this.selectedCourse = courseId.toString();
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
//  console.log(this.selectedCourse);
//console.log(studentParameters.value);

 this.student = new Student();
 this.student.institutionName=this.selectedInstitute;
 this.student.courseCategory=this.selectedCategory;
 this.student.course=this.selectedCourse;
 this.student.stdName=studentParameters.value.stdName;
 this.isSearchClicked=true;

 this.membershipCardService.searchStudent(this.student)
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

searchClear() {
 this.membershipCard = new MembershipCard();
}

planname: any;
errormsg: any;
onSelectPlan(i, checked) {
  console.log(this.planNameList);
  // this.planname = $('#planName').val();
  // if (this.planname == null) {
  //     // this.errormsg = "Please Select Plan Name First..!";
  //     $('#mycheck-' + i).prop("checked", false);
  //     $('#planName').focus();
  // } else {
  //     this.errormsg = "";
  //     if ($('#mycheck-' + i).prop("checked") == true) {
  //         i--;
  //         this.studentList[i].plan = this.planname;
  //     } else if ($('#mycheck-' + i).prop("checked") == false) {
  //         i--;
  //         this.studentList[i].plan = '';
  //     }
  // }

}

public currentDateModule : any;
public endDateModule : any;
localDate = new Date();

selectedStudent(student)
{
  console.log(student);
   console.log(this.planNameList);
  // if(this.selectedStudentData.stdId==student.stdId)
  // {
  //    this.selectedStudentData = new Student();
  // }
  // else
  // {
    this.selectedStudentData = student;
    this.planNameListLocal = this.planNameList.filter((item) => item.planId == student.plan);
   console.log(this.planNameListLocal);
    this.selectedStudentData.planPrice = this.planNameListLocal[0].planPrice;
    this.currentDateModule = { date: {year: this.localDate.getFullYear(), month: this.localDate.getMonth()+1, day: this.localDate.getDate()}};
    this.selectedStudentData.planStartDate = this.currentDateModule;
  
    if(this.planNameListLocal[0].planMembership =="Monthly")
    {
      this.currentDateModule = { date: {year: this.localDate.getFullYear(), month: this.localDate.getMonth()+2, day: this.localDate.getDate()}};
      this.selectedStudentData.planEndEnd = this.currentDateModule;
    }
    else if(this.planNameListLocal[0].planMembership =="Annual")
    {
      this.currentDateModule = { date: {year: this.localDate.getFullYear()+1, month: this.localDate.getMonth()+1, day: this.localDate.getDate()}};
      this.selectedStudentData.planEndEnd = this.currentDateModule;
    }
  // }
  // console.log(this.selectedStudentData);
}

planChange(plan)
{
  this.planNameListLocal = this.planNameList.filter((item) => item.planId == plan);
  this.selectedStudentData.plan = ""+this.planNameListLocal[0].planId;
  this.selectedStudentData.planPrice =  this.planNameListLocal[0].planPrice;

  if(this.planNameListLocal[0].planMembership =="Monthly")
  {
    this.currentDateModule = { date: {year: this.localDate.getFullYear(), month: this.localDate.getMonth()+2, day: this.localDate.getDate()}};
    this.selectedStudentData.planEndEnd = this.currentDateModule;
  }
  else if(this.planNameListLocal[0].planMembership =="Annual")
  {
    this.currentDateModule = { date: {year: this.localDate.getFullYear()+1, month: this.localDate.getMonth()+1, day: this.localDate.getDate()}};
    this.selectedStudentData.planEndEnd = this.currentDateModule;
  }

}

generateMembershipId()
{
  console.log(this.selectedStudentData);
  console.log(this.institutionList);
  
  var institutionListLocal : Institution[] = [];
  institutionListLocal = this.institutionList.filter((item)=> item.instName == this.selectedStudentData.institutionName);

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



proceedClick()
{
  
}




}
