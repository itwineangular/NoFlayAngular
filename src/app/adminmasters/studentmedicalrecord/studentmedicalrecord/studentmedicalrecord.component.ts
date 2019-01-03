import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../institutions/student/student.service';
import { Student } from '../../institutions/student/student';
import Swal from 'sweetalert2';
import { IMyDpOptions } from 'mydatepicker';
import { StudentmedicalrecordService } from '../studentmedicalrecord.service';
import { Medicalrecord, MedicalrecordDate } from '../studentmedicalrecord/medicalrecord';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-studentmedicalrecord',
  templateUrl: './studentmedicalrecord.component.html',
  styleUrls: ['./studentmedicalrecord.component.css']
})


export class StudentmedicalrecordComponent implements OnInit {
  student: Student = new Student();
  studentList: Student[] = [];
  studentRecord: Medicalrecord = new Medicalrecord();
  medicalrecordDate: MedicalrecordDate = new MedicalrecordDate();
  studentMedicalList: Medicalrecord[] = [];
  isListContainsData: boolean;
  isListContainsMedicalRecord: boolean;
  isSearchClicked: boolean;
  isSearchClickedforMedicalRecord: boolean;
  key: string;
  reverse: boolean = false;
  pagenumber: string;
  p: number = 1;
  itemsPerPage2: number = 1;
  date = new Date();
  saveOrUpdate: string;
  alertMassege = "";
  


  constructor(private studentService: StudentService,
    private studentmedicalrecordService: StudentmedicalrecordService) {

  }

  ngOnInit() {
    this.getStudent();
    this.pageChange(5);
    //this.getStudentMedicalRecord();

  }


  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd',
    disableUntil: { year: this.date.getFullYear(), month: this.date.getMonth(), day: this.date.getDate() }
  };
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

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  addNew() {
    this.saveOrUpdate = "save";
    this.studentRecord = new Medicalrecord();

  }

  selectUser(item) {
    this.getStudentMedicalRecord(item.stdId);
  }

  selectUserRecord(item) {
    console.log(item)
    this.saveOrUpdate = "update";
    this.studentRecord = item;
  }

  clickedAlert = function () {
    this.alertMassege = "";
  };

  getStudent() {
    this.studentService.getStudent()
      .subscribe(
        (data) => {
          this.studentList = data;
          // console.log( this.studentList);


        }
      );
  }

  getStudentMedicalRecord(studentId) {

    this.studentmedicalrecordService.getStudentMedicalRecord(studentId)
      .subscribe(
        (data) => {
          this.studentMedicalList = data;
          console.log(" thisstudentMedicalList");
          console.log(this.studentMedicalList);

        }
      );
  }

  saveStudentMediRecord(value) {

    if (this.saveOrUpdate == "save") {
      console.log("save");
      this.studentmedicalrecordService.saveStudentMedicalRecord(value, this.studentList[0].stdId)
        .subscribe(
          (data) => {
            console.log("list of students");
            console.log(this.studentList);
            this.alertMassege = "New item add on list successfully!!";
            // this.getAttribute();
          },
          (error) => {
            console.log("error");
            alert("Try again");
          }
        );

    }
    else if (this.saveOrUpdate == "update") {
      console.log("update");
      this.studentmedicalrecordService.updateStudentMedicalRecord(this.studentRecord)
        .subscribe(
          (data) => {
            this.alertMassege = "Item updated on list successfully!!";

            // this.getStudentMedicalRecord();
          },
          (error) => {
            console.log(error);
            alert("Try again");
          }
        );

    }


  }


  searchStudent(studentParameters) {
    console.log("student list")
    console.log(studentParameters);
    var studentObject: Student = new Student();


    studentObject.mcmId = studentParameters.mcmId;
    console.log(studentObject.mcmId);

    if (typeof studentObject.mcmId === 'undefined') {
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
      this.studentService.searchStudent(studentObject)
        .subscribe(
          (data) => {
            this.studentList = data;
            // this.studentMedicalList = data;
            if (typeof this.studentList !== 'undefined' && this.studentList.length > 0) {
              this.isListContainsData = true;
              console.log(" student list for serach")
              console.log(this.studentList)
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
    this.student = new Student();
    this.student.mcmId = "";

  }
  searchClearRecord(){
    this.medicalrecordDate= new MedicalrecordDate();
    this.medicalrecordDate.startDate= null;
    this.medicalrecordDate.endDate= null;
    
  }

  searchMedicalRecord(value) {

    console.log("date display")
    console.log(value);
    var medicalRecordObject: MedicalrecordDate = new MedicalrecordDate();
    medicalRecordObject.startDate = value.startDate;
    medicalRecordObject.endDate = value.endDate;
    if (typeof medicalRecordObject.startDate === 'undefined' && typeof medicalRecordObject.startDate === 'undefined') {
      Swal({
        title: 'Invalid!!',
        text: 'Atleast enter any one field.',
        showCancelButton: false,
        confirmButtonText: 'Ok',
      });
      this.isListContainsMedicalRecord = false;
      this.studentMedicalList = [];
    }
    else {
    this.studentmedicalrecordService.searchMedicalRecord(value, this.studentList[0].stdId)
      .subscribe(
        (data) => { 
          this.studentMedicalList = data;
          // this.studentMedicalList = data;
          if (typeof this.studentMedicalList !== 'undefined' && this.studentMedicalList.length > 0) {
            this.isListContainsMedicalRecord = true;
            console.log(" student list for  date serach")
            console.log(this.studentMedicalList)
          }
          else {
              this.isListContainsMedicalRecord = false;
              console.log("hi");
            
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }

  }

  viewStudentdetails(id) {
    console.log(id);
    var studentDetailListLocal: Medicalrecord[] = [];
    studentDetailListLocal = this.studentMedicalList.filter((item) => item.id == id);
    console.log("her jsdkgds")
    console.log(studentDetailListLocal)
    this.studentService.getStudent().subscribe(data => {
      // const popupData = data[0];
      const popupData = studentDetailListLocal[0];

      Swal({
        title: '<strong>Student Discharge Details</strong>',
        type: 'info',
        width: 1000,
        padding: 3,
        html:
          '<div class="panel panel-default"><style>th, td{border: 2px solid #ddd !important;}</style>' +
          '<div class="panel-body nopadding">' +
          '<table class="new-table table table-striped nomargin" border=1 style="font-size: 13px !important;">' +
          '<thead>' +
          // '<th> Name </th>' +

          '<th> Dischrge Summary</th>' +
          // '<th>Email</th>' +
          // '<th> MCM ID</th>' +
          // '<th> Institution </th>' +
          +
          '</thead>' +
          '<tbody>' +
          // '<td> Manual Asset </td>' +
          '<td>' + popupData.dischargeSummary + '</td>' +
          // '<td>' + popupData.stdEmail + '</td>' +
          // '<td>' + popupData.mcmId + '</td>' +
          // '<td>' + popupData.institutionName + '</td>' +

          '</tbody>' +
          '</table>' +
          '</div>' +
          '</div>',
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:
          '<i class="fa fa-check"></i>',
        confirmButtonAriaLabel: 'Ok',
        cancelButtonText:
          '<i class="fa fa-close"></i>',
        cancelButtonAriaLabel: 'Close',
      });

    });
  }


}
