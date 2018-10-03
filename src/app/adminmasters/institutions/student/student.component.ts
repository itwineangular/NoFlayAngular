import { Component, OnInit } from '@angular/core';

import { Student,PlanNameObject, Institution, CourseCategory, CourseProfile } from './student';
import { StudentService } from "./student.service";
import { CommonServicesService } from "../../../common-services.service";
import { DatepickerOptions, NgDatepickerModule, NgDatepickerComponent } from 'ng2-datepicker';
import * as frLocale from 'date-fns/locale/fr';
import * as enLocale from 'date-fns/locale/en';
import { FileQueueObject, FileuploaderService } from '../educational-institute/fileuploader.service';
import { Observable } from 'rxjs';
import { ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

declare var jquery: any;
declare var $: any;


// import * as $ from 'jquery';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  startDate = new Date(1990, 0, 1);
  alertMassege = "";
  saveOrUpdate: string;
  key: string;
  reverse: boolean = false;
  pagenumber : string ;
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
  statusList: Student[];
  planList: Student[];
  studentList: Student[];
  studentBulkList:Student[] = [];
 
  retresult: any;
  student: Student = new Student();
  
  selectedStudentName: string;
  
  plan: PlanNameObject = new PlanNameObject();
    planNameList: PlanNameObject[] = [];

    
  institution: Institution = new Institution();


    institutionList: Institution[] = [];
    selectedInstitute: string;
    
    courseCategoryList: CourseCategory[] = [];
    selectedCategory: string;
    
    courseList: CourseProfile[]=[];
    selectedCourse : string;

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

  constructor(private commonService: CommonServicesService,
    private studentService: StudentService,
    private uploader: FileuploaderService) { }

  ngOnInit() {
    this.getAcademicYears();
    var currentYear = this.d.getFullYear();
    var nextYear = currentYear + 1;
    this.academicYear = currentYear.toString() + " - " + nextYear.toString();
    // console.log( this.academicYear);

    
    this.getInstitution();
    this.getCountries();
    this.getStates();
    this.getCities();
    this.getStatus();
    this.getPlans();
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
    //     console.log('here');
    //   });
    // });
  }
  completeItem = (item: FileQueueObject, response: any) => {
    this.onCompleteItem.emit({ item, response });
}


  clickedAlert = function () {
    this.alertMassege = "";
  };

  addNew() {
    this.saveOrUpdate = "save";
    this.student = new Student();
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
    this.saveOrUpdate = "update";
    this.student = user;
  }

  getBulkStudents() {
    this.studentService.getBulkStudentsdata().subscribe(data => {
        this.studentBulkList = data;
        
        console.log(this.studentBulkList);
    });
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

  displayStudentsForUpdate()
    {
     
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
        console.log(email);
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
      this.statusList = data;

    });
  }

  getPlans() {
    this.studentService.getPlanName().subscribe(data => {
      this.planList = data;

    });
  }
  saveStudent(studentValue) {
    
    if (this.saveOrUpdate == "save") {
      console.log("save");
      this.studentService.saveStudent(studentValue,this.selectedInstitute,this.selectedCategory,this.selectedCourse)
        .subscribe(
          (data) => {
            this.alertMassege = "New item add on list successfully!!";
            this.getStudent();
          },
          (error) => {
            console.log(error);
            alert("Try again");
          }
        );

    }
    else if (this.saveOrUpdate == "update") {
      console.log("update");
      this.studentService.updateStudent(this.student,this.selectedInstitute,this.selectedCategory,this.selectedCourse)
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
  saveStudentBulk(studentValue){
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
          console.log(this.studentList);
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

  deleteStudent(stdId) {
    this.studentService.deleteStudent(stdId).subscribe(data => {
      this.alertMassege = "Deleted successfully!!";
      this.getStudent();
    });
  }

  getAcademicYears() {
    var firstYear = this.d.getFullYear() - 3;
    var currentYear = this.d.getFullYear();
    for (let i = firstYear; i < currentYear; i++) 
    {
      this.academicYearsList.push(i.toString() + " - " + (i + 1).toString());
    }


  }

  pageChange(pagenumber){
  
    this.pagenumber=pagenumber;
  }

  customPageChange(number)
  {
    this.p=number;
    this.itemsPerPage2 = number;
    if(this.p==1)
    {
      this.itemsPerPage2 = 1;
    }
    else
    {
      this.itemsPerPage2 = +this.pagenumber;
    }
  }

  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }

  selectedStudent(data) {
    this.student = data;
    // this.selectedStudentName = this.studentBulk.stdName;
    // console.log(this.selectedStudentData);
    
    }
    
  onFileChanged(event) {
    // console.log("here");
    const file = event.target.files[0]
    console.log(file);
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
        console.log(formData);
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

    //convert to csv to json
    addToFileToQueue(item) {
      this.input = this.fileInput.nativeElement;
      const reader = new FileReader();
      reader.onload = () => {
          const text = reader.result;
          this.retresult = this.csvJSON(text);
          //    console.log('JSON: ', JSON.parse(JSON.stringify(this.retresult)));
          this.studentBulkList = JSON.parse(JSON.stringify(this.retresult));
          //console.log(this.studentBulkList);
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
     
      console.log(result);
      return result;

  }
  jsonemail: any;
 


  convertToCSVKiran(objArray) {
      console.log(objArray);
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
      console.log("kiran");
      console.log(str);
      return str;
  }


  deleteStudentBulk(data) {
      console.log(data.stdName);

      const index: number = this.studentBulkList.indexOf(this.student);
      console.log(index);
      if (index !== -1) {
          this.studentBulkList.splice(index, 1);
      }
  }

  saveStudentuploadFile(studentsData) {
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
    
    addToFileToServer(file: FileList) {
    //this.addToFileToQueue("");
    console.log("before conversion")
    console.log(file);
    this.uploader.addToQueue(file);
    this.uploader.uploadAll("1239","file");
    // this.studentService.upload(file);
    
    }


// Planname dropdown
getPlanName() {
  this.studentService.getPlanName().subscribe(data => {
      this.planNameList = data;
      console.log("planNameList");
      console.log(this.planNameList);
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
        this.studentBulkList[i].plan = this.planname;
        this.studentBulkList[i].institutionName = this.selectedInstitute;
        this.studentBulkList[i].courseCategory = this.selectedCategory;
        this.studentBulkList[i].course = this.selectedCourse;
      } else if ($('#mycheck-' + i).prop("checked") == false) {
        i--;
        this.studentBulkList[i].plan = '';
        this.studentBulkList[i].institutionName = '';
        this.studentBulkList[i].courseCategory = '';
        this.studentBulkList[i].course = '';
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
          element.plan = this.planname;
        });
        this.studentBulkList.forEach(element => {
          element.institutionName = this.selectedInstitute;
        });
        this.studentBulkList.forEach(element => {
          element.courseCategory = this.selectedCategory;
        });
        this.studentBulkList.forEach(element => {
          element.course = this.selectedCourse;
        });
      } else {
        this.checkedval = null;
        this.studentBulkList.forEach(element => {
          element.plan = "";
        });
        this.studentBulkList.forEach(element => {
          element.institutionName = "";
        });
        this.studentBulkList.forEach(element => {
          element.courseCategory = "";
        });
        this.studentBulkList.forEach(element => {
          element.course = "";
        });
      }
    }
  }

searchStudent(studentParameters) {
   console.log(this.selectedCourse);
  this.student = new Student();
  this.student.institutionName=this.selectedInstitute;
  this.student.courseCategory=this.selectedCategory;
  this.student.course=this.selectedCourse;
  this.student.status=studentParameters.value.status;
 // this.student.stdEmail="david@gmail.com";

  this.studentService.searchStudent(this.student)
    .subscribe(
      (data) => {
        this.studentList = data;
        console.log(this.studentList);
      },
      (error) => {
        console.log(error);
        alert("Try again");
      }
    );
}

searchClear() {
  this.student = new Student();
  this.getStudent();
  // this.studentService.searchStudent(this.student)
  //   .subscribe(
  //     (data) => {
  //       console.log(data);
  //       this.studentList = data;
  //     },
  //     (error) => {
  //       console.log(error);
  //       alert("Try again");
  //     }
  //   );
}
}
