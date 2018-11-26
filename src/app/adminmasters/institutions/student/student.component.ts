import { Component, OnInit } from '@angular/core';

import { Student, PlanNameObject, Institution, CourseCategory, CourseProfile, Status } from './student';
import { StudentService } from "./student.service";
import { CommonServicesService } from "../../../common-services.service";
import { DatepickerOptions, NgDatepickerModule, NgDatepickerComponent } from 'ng2-datepicker';
import * as frLocale from 'date-fns/locale/fr';
import * as enLocale from 'date-fns/locale/en';
import { FileQueueObject, FileuploaderService } from '../educational-institute/fileuploader.service';
import { Observable } from 'rxjs';
import { ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { SelectDropDownComponent } from "ngx-select-dropdown";
import { CourseCategoryService } from "../course-category/course-category.service";
import { Course } from '../courses/courses.module';
import { CourseService } from "../courses/courses.service";
import Swal from 'sweetalert2';
import { Router } from "@angular/router";
import { Constants } from "../../../Constants";


import { NgForm } from '@angular/forms';
declare var jquery: any;
declare var $: any;


// import * as $ from 'jquery';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  globalurl = Constants.HOME_URL;
  url: any;
  viewdisable: boolean = true;
  startDate = new Date(1990, 0, 1);
  alertMassege = "";
  errorMessage: string = "";
  successMessage: string = "";
  warningMessage: string = "";
  isListContainsData: boolean;
  isSearchClicked: boolean;
  caseInsensitive: boolean = true;
  saveOrUpdate: string;
  key: string;
  reverse: boolean = false;
  pagenumber: string;
  p: number = 1;
  itemsPerPage2: number = 1;
  checkedval: boolean;

  countries = [];
  statesLocal = [];
  citiesLocal = [];
  states = [];
  cities = [];
  courseCategoryLocal = [];
  courseLocal = [];
  courseCategory = [];
  courses = [];
  statusList: Student[]=[];
  planList: Student[];
  studentList: Student[];
  studentBulkList: Student[] = [];

  retresult: any;
  student: Student = new Student();

  selectedStudentName: string;

  plan: PlanNameObject = new PlanNameObject();
  planNameList: PlanNameObject[] = [];

  status: Status = new Status();
  statusNameList: Status[] = [];


  institution: Institution = new Institution();


  institutionList: Institution[] = [];
  selectedInstitute: string;

  courseCategoryList: CourseCategory[] = [];
  selectedCategory: string;

  courseList: CourseProfile[] = [];
  selectedCourse: string;  

  academicYear: string;
  academicYearsList: string[] = [];

  d = new Date();

  options: DatepickerOptions = {
    locale: enLocale,
    minDate: new Date(this.d.setDate(this.d.getDate() - 1))
  };

  input;

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onCompleteItem = new EventEmitter();


  @ViewChild('fileInput') fileInput;
  queue: Observable<FileQueueObject[]>;

  @ViewChild('instituteName') public ngSelectInstituteName: SelectDropDownComponent;
  @ViewChild('categoryName') public ngSelectinstCategoryName: SelectDropDownComponent;
  @ViewChild('courseName') public ngSelectCourseName: SelectDropDownComponent;
  @ViewChild('status') public ngSelectStatusValue: SelectDropDownComponent;
  @ViewChild('studentForm') mytemplateForm : NgForm;

  courseCategoryListForSearch: CourseCategory[]=[];
  courseListLocal: Course[]=[];

  constructor(private commonService: CommonServicesService,
    private studentService: StudentService,
    private courseCategoryService: CourseCategoryService,
    private courseservice: CourseService,
    private uploader: FileuploaderService,
    public router:Router) { }

  ngOnInit() {
    this.getAcademicYears();
    var currentYear = this.d.getFullYear();
    var nextYear = currentYear + 1;
    this.academicYear = currentYear.toString() + " - " + nextYear.toString();


    this.getInstitution();
    this.getCourseCaterory();
    this.getCourse();
    this.getCountries();
    this.getStates();
    this.getCities();
    this.getStatus();
    this.getPlans();
    this.isListContainsData = false;
    this.isSearchClicked = false;
    this.getStudent();

    this.pageChange(5);
    this.getPlanName();

    this.getBulkStudents();

    this.queue = this.uploader.queue;
    this.uploader.onCompleteItem = this.completeItem;

    // add button jquery fumction
    // $(document).ready(function () {
    //   $(".btnns").hide();
    //   $("#show").click(function () {
    //     $(".btnns").show();
    //     $("#show").hide();
    //   });
    // });
  }

  selectedInstituteValue : any;
  instituteNameconfig = {
    displayKey: "instName",
    search: true,
    limitTo: this.institutionList.length
  };
  changeValueInstitute($event: any) {
    console.log(this.selectedInstituteValue);
    }

  selectedCourseCategoryValue : any;
  courseCategorNameconfig = {
    displayKey: "categoryName",
    search: true,
    limitTo: this.courseCategoryListForSearch.length
  };
  changeValueCourseCategory($event: any) {
    
  }

  selectedCourseValue : any;
  courseNameconfig = {
    displayKey: "courseName", //if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: this.courseListLocal.length
  };
  changeValueCourse($event: any)
   {
    
  }
  selectedStatusValue : any;
  statusNameconfig = {
    displayKey: "status", //if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: this.statusList.length
  };
  changeValueStatus($event: any)
   {
    console.log(this.statusList)
  }

  openbulkuploadpopup() {
    $('#bulk').modal({
      backdrop: 'static',
      keyboard: false
    });
  }

  viewuploadedlistinpopup() {
    $('#bulk').modal('toggle');
    $('#studentFileUploadModal').modal({
      backdrop: 'static',
      keyboard: false
    });
  }
  completeItem = (item: FileQueueObject, response: any) => {
    this.onCompleteItem.emit({ item, response });
  }
  resetmodal() {
    var $el = $('#uid');
    $el.wrap('<form>').closest('form').get(0).reset();
    $el.unwrap();
    this.successMessage = "";
    this.errorMessage = "";
    this.viewdisable = true;
    $('#bulk').modal('toggle');
  }

  clickedAlert = function () {
    this.alertMassege = "";
  };
  abc: string = "xlsx";
  onFileChange(event) {

    let reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      let fileName = file.name;
      let fileExtension = fileName.substr((fileName.lastIndexOf('.') + 1));
   

      if (this.abc == fileExtension) {
        this.viewdisable = false;
        this.onFileChanged;
        this.errorMessage = "";
        this.warningMessage = "";
        this.successMessage = "File Uploaded Successfully";
      }
      else {
        this.successMessage = "";
        this.errorMessage = "File format should be xlsx";
      }



    } else {
      this.successMessage = "";
      this.errorMessage = "";
      this.warningMessage = "Please Select File";
    }



  }


  addNew() {
    this.saveOrUpdate = "save";
    this.student = new Student();
    // $('#addModal').modal({
    //   backdrop: 'static',
    //   keyboard: false
    // });
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

  selectUser(user) {
   
    console.log("user");
    this.saveOrUpdate = "update";
    this.student = user;
    this.onSelect(this.student.countryName);
    this.onStateSelect(this.student.state);
    console.log(this.student);
    console.log(this.institutionList);
    console.log(this.student.institutionId);
   // this.student.institutionName = this.student.institution.institutionId;
  //  this.student.institutionId = this.student.institution.institutionId;
  //  this.student.categoryId =  this.student.courseCategory.categoryId;
  //  this.student.courseId =  this.student.courseProfile.courseId;
    this.onInstituteSelect(this.student.institutionId);
    this.onCourseCategorySelect(this.student.categoryId);
  //   this.student.planId= this.student.plan.planId;
  //   // this.student.statusId= this.student.status.statusId;
    this.url = this.globalurl+"/students/imageFiles/"+this.student.stdEmail;

  }

  getBulkStudents() {
    this.studentService.getBulkStudentsdata().subscribe(data => {
      this.studentBulkList = data;

    });
  }

 
  
onInstituteSelect(institutionId)
{
  this.courseCategoryList = [];
  var institutionListLocal : Institution[] = [];
  institutionListLocal = this.institutionList.filter((item)=> item.institutionId == institutionId);
  
  console.log(this.institutionList);

  for(let item of institutionListLocal[0].courseCategoryVos)
  {
    console.log("gdhsfghdsgfh");
    console.log(this.courseCategoryList);

      this.courseCategoryList.push(item);
  }
  this.selectedInstitute = institutionListLocal[0].instName.toString();

}


  onCourseCategorySelect(categoryId)
 {
   console.log(categoryId);
   console.log(this.courseCategoryList);
    this.courseList = [];
    var courseCategoryListLocal : CourseCategory[] = [];
    courseCategoryListLocal = this.courseCategoryList.filter((item)=> item.categoryId == categoryId); 
    for(let item of courseCategoryListLocal[0].courseProfileVos)
    {
        this.courseList.push(item);
    }
    this.selectedCategory = courseCategoryListLocal[0].categoryName.toString();


}

  onCourseSelect(courseId) {
    this.selectedCourse = courseId.toString();
  }

  displayStudentsForUpdate() {

    this.getBulkStudents();
    let email = [];
    for (let i = 0; i < this.studentBulkList.length; i++) {
      if (!email.includes(this.studentBulkList[i].stdEmail)) {
        email.push(this.studentBulkList[i].stdEmail);
        this.studentBulkList[i].stdEmail = this.studentBulkList[i].stdEmail;

      }
      else {
        this.studentBulkList[i].stdEmail = "";
      }

    }
    
  }







  onSelect(countryid) {
    this.states = this.statesLocal.filter((item) => item.countryCode == countryid);
    this.cities = [];
  }

  onStateSelect(stateid) {
    this.cities = this.citiesLocal.filter((item) => item.stateCode == stateid);
  }

  getStatus() {
    this.studentService.getStatus().subscribe(data => {
      console.log(data);
      this.statusList = data;

    });
  }

  getPlans() {
    this.studentService.getPlanName().subscribe(data => {
      this.planList = data;

    });
  }

  // saveStudent(studentValue) {

  //   this.uploader.uploadAll(studentValue,"studentImage");

  //   if (this.saveOrUpdate == "save") {
   
  //     this.studentService.saveStudent(studentValue)
  //       .subscribe(
  //         (data) => {
  //           this.alertMassege = "Student Registered successfully!!";
  //           this.getStudent();
  //         },
  //         (error) => {
  //           console.log(error);
  //           alert("Try again");
  //         }
  //       );

  //   }
  //   else if (this.saveOrUpdate == "update") {
     
  //     this.studentService.updateStudent(this.student)
  //       .subscribe(
  //         (data) => {
  //           this.alertMassege = "Item updated on list successfully!!";

  //           this.getStudent();
  //         },
  //         (error) => {
  //           console.log(error);
  //           alert("Try again");
  //         }
  //       );

  //   }


  // }

  saveStudent(studentValue) {
console.log("student ****");
  

     if (this.saveOrUpdate == "save")
     {
   console.log("save student");
      this.studentService.saveStudent(studentValue)
        .subscribe(
          (data) => {
            this.uploader.uploadAll(studentValue,"studentImage");
            this.mytemplateForm.reset();
            this.url = "";
            $("#fileControl").val('');
            this.alertMassege = "Student Registered successfully!!";
            this.getStudent();
          
            // Swal({
            //   title: 'successfull !!!!',
            //   text: "Your data is saved successfully, expect an mail.",
            // confirmButtonText: 'OK!'
            // })
           
          },
          (error) => {
            console.log(error);
           // alert("Try again");
            var string = error['_body'];
            
            console.log(string);
            var substring = "Already existing mail";
            if (string.includes(substring)) {
              Swal({
                title: 'Already existing mail !!!!',
                text: "Email already exists. Please choose a different email",
              confirmButtonText: 'OK!'
              });
              this.student.stdEmail="";
            }
            
            else {
              alert("Try again");
  
            }
          }
        );

    }
    else if (this.saveOrUpdate == "update") {
     
      this.studentService.updateStudent(this.student)
        .subscribe(
          (data) => {
            this.alertMassege = "Item updated on list successfully!!";

            this.getStudent();
          },
          (error) => {
            console.log(error);
            alert("Try again");
          }
        );

    }


  }

  
  saveStudentBulk(studentValue) {
    this.studentService.uploadCsvFile(this.studentBulkList)
      .subscribe(
        (data) => {
          alert("success");
        },
        (error) => {
          console.log(error);
          alert("try again");
        }
      );
  }



  getStudent() {
    this.studentService.getStudent()
      .subscribe(
        (data) => {
          this.studentList = data;
          
          
        }
      );

  }


  getInstitution() {
    this.studentService.getInstitution()
      .subscribe(
        (data) => {
          this.institutionList = data;
        }
      );

  }

  getCourseCaterory() {
    this.courseCategoryService.getCourseCategory().subscribe(data => {
      
      this.courseCategoryListForSearch = data;
    });
  }

  getCourse() {
    this.courseservice.getCourse().subscribe(data => {
      this.courseListLocal = data;
    });
  }

  deleteStudent(stdId) {
    this.studentService.deleteStudent(stdId).subscribe(data => {
      this.alertMassege = "Deleted successfully!!";
      this.getStudent();
    });
  }

  getAcademicYears() {
    var firstYear = this.d.getFullYear() - 3;
    var currentYear = this.d.getFullYear();
    for (let i = firstYear; i < currentYear; i++) {
      this.academicYearsList.push(i.toString() + " - " + (i + 1).toString());
    }


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

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  selectedStudent(data) {
    this.student = data;
    // this.selectedStudentName = this.studentBulk.stdName;

  }

  onFileChanged(event) {
    const file = event.target.files[0]
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event) => {
        //    this.url = event.target.result;
      }

    }


    let fileBrowser = this.fileInput.nativeElement;

    if (fileBrowser.files && fileBrowser.files[0]) {
      const formData = new FormData();
      formData.append("image", file);
     
      // this.service.uploadImage(formData).subscribe(res => {
      //     console.log("succed");
      //   });
    }

    this.studentService.uploadImage(file)
      .subscribe(
        (data) => {
          alert("success");
        },
        (error) => {
          console.log(error);
          alert("Try again");
        }
      );
  }

  addToQueue(file: FileList) {

    if (file && file[0]) {
        var reader = new FileReader();
        reader.readAsDataURL(file[0]); // read file as data url
        reader.onload = (event) => {
            let target: any = event.target;
            let content: string = target.result;
            this.url = content;

            // let file = fileInput.target.files[0];
            // let fileName = file.name;
            // this.url = event.target.result;
  
        }
    }
  
    this.uploader.addToQueue(file);
    this.uploader.uploadAll("abcd", "file");
  }

  //convert to csv to json
  addToFileToQueue(item) {
    this.input = this.fileInput.nativeElement;
    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result;
      this.retresult = this.csvJSON(text);
      this.studentBulkList = JSON.parse(JSON.stringify(this.retresult));
    };
    reader.readAsText(this.input.files[0]);
  }
  csvJSON(csv) {
    const lines = csv.split('\n');
    const result = [];
    const headers = lines[0].split(',');
    for (let i = 1; i < lines.length; i++) {
      const obj = {};
      const currentline = lines[i].split(',');

      for (let j = 0; j < headers.length; j++) {


        try {
          obj[headers[j].replace(/[^a-zA-Z0-9._%+-@ ]/g, "")] = currentline[j].replace(/[^a-zA-Z0-9._%+-@ ]/g, "");

        }
        catch
        {

        }

      }
      result.push(obj);
    }

    return result;

  }
  jsonemail: any;



  convertToCSVKiran(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';

    for (var i = 0; i < array.length; i++) {
      var line = '';
      for (var index in array[i]) {
        if (line != '') line += ','

        line += array[i][index];
      }

      str += line + '\r\n';
    }
    
    return str;
  }


  deleteStudentBulk(data) {

    const index: number = this.studentBulkList.indexOf(this.student);
    if (index !== -1) {
      this.studentBulkList.splice(index, 1);
    }
  }

  saveStudentuploadFile(studentsData) {
    this.studentService.uploadCsvFile(this.studentBulkList)
      .subscribe(
        (data) => {
          alert("success");
          this.resetmodal();
        },
        (error) => {
          console.log(error);
          alert("try again");
        }

      );
  }

  addToFileToServer(file: FileList) {
    //this.addToFileToQueue("");
    
    this.uploader.addToQueue(file);
    this.uploader.uploadAll("1239", "file");
    // this.studentService.upload(file);

  }


  // Planname dropdown
  getPlanName() {
    this.studentService.getPlanName().subscribe(data => {
      this.planNameList = data;
      
    });
  }

  // check box
  planname: any;
  errormsg: any;

  onSelectPlan(i, checked) {
    this.planname = $('#planName').val();
    if (this.planname == null) {
      this.errormsg = "Please Select Plan Name First..!";
      $('#mycheck-' + i).prop("checked", false);
      $('#planName').focus();
    } else {
      this.errormsg = "";
      if ($('#mycheck-' + i).prop("checked") == true) {
        i--;
        this.studentBulkList[i].planId = this.planname;
        this.studentBulkList[i].institutionId = this.student.institutionId;
        this.studentBulkList[i].categoryId = this.student.categoryId;
        this.studentBulkList[i].courseId = this.student.courseId;
        
      } else if ($('#mycheck-' + i).prop("checked") == false) {
        i--;
        this.studentBulkList[i].planId = '';
        this.studentBulkList[i].institutionId = '';
        this.studentBulkList[i].categoryId = '';
        this.studentBulkList[i].courseId = '';
      }
    }

  }

  
  toggleSelect(checked) {
    this.planname = $('#planName').val();
    if (this.planname == null) {
      this.errormsg = "Please Select Plan Name First..!";
      $('#mycheck-' + checked).prop("checked", false);
      $('#planName').focus();
    } else {
      if (checked) {
        this.checkedval = true;
        this.studentBulkList.forEach(element => {
          element.planId = this.planname;
        });
        this.studentBulkList.forEach(element => {
          element.institutionId = this.student.institutionId;
        });
        this.studentBulkList.forEach(element => {
          element.categoryId = this.student.categoryId;
        });
        this.studentBulkList.forEach(element => {
          element.courseId = this.student.courseId;
        });
      } else {
        this.checkedval = null;
        this.studentBulkList.forEach(element => {
          element.planId = "";
        });
        this.studentBulkList.forEach(element => {
          element.institutionId = "";
        });
        this.studentBulkList.forEach(element => {
          element.categoryId = "";
        });
        this.studentBulkList.forEach(element => {
          element.courseId = "";
        });
      }
    }
  }


  searchStudent(studentParameters) {
      var studentObject: Student = new Student();
    this.isSearchClicked = true;
    if (typeof this.selectedInstituteValue !== 'undefined' && this.selectedInstituteValue.length > 0) {
      studentObject.institutionId = this.selectedInstituteValue[0].institutionId;
     
    }

    if (typeof this.selectedCourseCategoryValue !== 'undefined' && this.selectedCourseCategoryValue.length > 0) {
     
      studentObject.categoryId = this.selectedCourseCategoryValue[0].categoryId;     
   
    }

    if (typeof this.selectedCourseValue !== 'undefined' && this.selectedCourseValue.length>0) 
    {
      studentObject.courseId = this.selectedCourseValue[0].courseId
    }

    if (typeof this.selectedStatusValue !== 'undefined' && this.selectedStatusValue.length>0) 
    {
      studentObject.statusId = this.selectedStatusValue[0].statusId
    }

    // studentObject.status = studentParameters.status;
    studentObject.mcmId = studentParameters.mcmId;

 
  

    if (typeof studentObject.institutionId === 'undefined'  && typeof studentObject.categoryId === 'undefined' && typeof studentObject.courseId === 'undefined' && typeof studentObject.statusId === 'undefined'  && typeof studentObject.mcmId === 'undefined') 
  {
    Swal({
      title: 'Invalid!!',
      text: 'Atleast enter any one field.',
      showCancelButton: false,
      confirmButtonText: 'Ok',
    });
    this.isListContainsData = false;
    this.studentList=[];
   
  }

  else
  {
    this.studentService.searchStudent(studentObject)
        .subscribe(
      (data) => {
        console.log("studentObject");
        console.log(studentObject);

        this.studentList = data;
        if (typeof this.studentList !== 'undefined' && this.studentList.length > 0) {
          this.isListContainsData = true;         
          // this.studentList = data;
          // this.studentList = data;
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



   //  console.log(studentObject);
    //  this.studentService.searchStudent(studentObject)
    //       .subscribe(
    //         (data) => {
    //           this.studentList = data;
    //           if (typeof this.studentList !== 'undefined' && this.studentList.length > 0) {
    //             this.isListContainsData = true;
    //             this.studentList = data;
    //             this.studentList = data;
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

    // if (typeof studentParameters.value.institutionName != "undefined"
    //   || typeof studentParameters.value.courseCategory != "undefined"
    //   || typeof studentParameters.value.course != "undefined"
    //   || typeof studentParameters.value.status != "undefined") {
    //   this.isSearchClicked = true;
    //   if (studentParameters.value.institutionName === null
    //     || studentParameters.value.courseCategory === null
    //     || studentParameters.value.course === null
    //     || studentParameters.value.status === null) {

    //   }
    //   else {
    //     this.studentService.searchStudent(studentParameters.value)
    //       .subscribe(
    //         (data) => {
    //           this.studentList = data;
    //           if (typeof this.studentList !== 'undefined' && this.studentList.length > 0) {
    //             this.isListContainsData = true;
    //             this.studentList = data;
    //             this.studentList = data;
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
    this.student = new Student();

    this.ngSelectInstituteName.deselectItem(this.selectedInstituteValue,0);
    this.ngSelectInstituteName.ngOnInit();
    this.ngSelectinstCategoryName.deselectItem(this.selectedCourseCategoryValue,0);
    this.ngSelectinstCategoryName.ngOnInit();
    this.ngSelectCourseName.deselectItem(this.selectedCourseValue,0);
    this.ngSelectCourseName.ngOnInit();
    this.ngSelectStatusValue.deselectItem(this.selectedStatusValue,0);
    this.ngSelectStatusValue.ngOnInit();
    
  }

  viewStudentdetails(id) {
    console.log(id);
    var studentDetailListLocal: Student[]=[];
    studentDetailListLocal = this.studentList.filter((item)=> item.stdId == id); 
    console.log("her jsdkgds")
    console.log(studentDetailListLocal)
    this.studentService.getStudent().subscribe(data => {
      // const popupData = data[0];
      const popupData = studentDetailListLocal[0];         
     
        Swal({
          title: '<strong>Student Details</strong>',
          type: 'info',
          width: 1000,
          padding: 3,
          html:
            '<div class="panel panel-default"><style>th, td{border: 2px solid #ddd !important;}</style>' +
            '<div class="panel-body nopadding">' +
            '<table class="new-table table table-striped nomargin" border=1 style="font-size: 13px !important;">' +
            '<thead>' +
            // '<th> Name </th>' +
            
            '<th> Name</th>' +
            '<th>Email</th>' +
            '<th> MCM ID</th>' +
            '<th> Institution </th>' +
          +
            '</thead>' +
            '<tbody>' +
            // '<td> Manual Asset </td>' +
            '<td>' + popupData.stdName + '</td>' +
            '<td>' + popupData.stdEmail + '</td>' +
            '<td>' + popupData.mcmId + '</td>' +
            '<td>' + popupData.institutionName + '</td>' +
           
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
