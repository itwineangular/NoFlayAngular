import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Course, courseSearchObject, CourseCategoryVo } from './courses.module';
import { CourseService } from './courses.service';
import { CourseCategoryService } from "../course-category/course-category.service";
import { CourseCategory } from "../course-category/course-category.module";

import Swal from 'sweetalert2';
import { ViewChild } from '@angular/core';
import { SelectDropDownComponent } from "ngx-select-dropdown";

declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  alertMassege = "";
  isListContainsData: boolean;
  isSearchClicked: boolean;

  courseasfdsaf: Course = new Course();

  course: Course = new Course();
  courseSearch: courseSearchObject = new courseSearchObject();
  courseList: Course[];
  courseListLocal: Course[];
  courseCategoryListLocal: CourseCategoryVo[];
  courseCategoryList: CourseCategory[];
  parentCourseCategory: CourseCategory[];
  saveOrUpdate: string;
  key: string ;
  reverse: boolean = false;
  pagenumber : string ;
  p: number = 1;
  itemsPerPage2: number = 1;
  caseInsensitive: boolean = true;

  @ViewChild('courseName') public ngSelectCourseName: SelectDropDownComponent;
  @ViewChild('courseCode') public ngSelectCourseCode: SelectDropDownComponent;
  @ViewChild('categotyName') public ngSelectCategoryName: SelectDropDownComponent;
  // @ViewChild('duration') public ngSelectDuration: SelectDropDownComponent;

  constructor(private service: CourseService,
    private courseCategoryService: CourseCategoryService) { }

  ngOnInit() {

    this.courseSearch.courseName="";
    this.courseSearch.courseCode="";
    this.courseSearch.duration="";
    this.courseSearch.categoryName="";

    this.isListContainsData = false;
    this.getCourse();
    this.getCourseCategory();
    this.pageChange(5);
  }

  addNew() {
    this.saveOrUpdate = "save";
    this.course = new Course();
    $('#addModal').modal({
      backdrop: 'static',
      keyboard: false
  });
  }

  selectedValue : any;
  config = {
    displayKey: "courseName", //if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: 10
  };
  changeValue($event: any)
   {
    if(this.selectedValue.length>0)
    {
      if(this.selectedValue[0].courseCategoryVos.length>0)
      {
        this.ngSelectCategoryName.value = this.selectedValue[0].courseCategoryVos[0];
        this.ngSelectCategoryName.ngOnInit();
      }
    }
    else
    {

    }
    this.ngSelectCategoryName.value = this.selectedValue[0].courseCategoryVos[0];
    this.ngSelectCategoryName.ngOnInit();
    this.ngSelectCourseCode.value=this.selectedValue;
    this.ngSelectCourseCode.ngOnInit();
  }

  selectedcourseCodeValue : any;
  courseCodeconfig = {
    displayKey: "courseCode", 
    search: true,
    limitTo: 10
  };

  selectedcategoryNameValue : any;
  categoryNameconfig = {
    displayKey: "categoryName",
    search: true,
    limitTo: 10
  };


  saveCourse(form: NgForm) {
    if (this.saveOrUpdate == "save") {
      console.log("save");
      this.service.saveCourse(form.value)
        .subscribe(
          (data) => {
            this.alertMassege = "New item add on list successfully!!";
            if (form != null)
              form.reset();
            //this.getCourse();
          },
          (error) => {
            console.log(error);
            alert("Try again");
          }
        );

    }
    else if (this.saveOrUpdate == "update") {
    //  console.log( this.courseCategoryList);
    //  console.log( this.course);
    //  this.parentCourseCategory = this.courseCategoryList.filter(x=>x.categoryId==this.course.courseCategoryVos[0].categoryId);

      this.service.updateCourse(this.course,)
        .subscribe(
          (data) => {
            this.alertMassege = "Item updated on list successfully!!";
           // this.getCourse();
          },
          (error) => {
            console.log(error);
            alert("Try again");
          }
        );

    }
  }

  getCourse() {
    this.service.getCourse().subscribe(data => {
      // this.courseList = data;
      this.courseListLocal = data;
      console.log(this.courseList);
    });
  }

  getCourseCategory() {
    this.courseCategoryService.getCourseCategory().subscribe(data => {
      this.courseCategoryList = data;
      this.courseCategoryListLocal = data;
    });
  }

  selectedUser(user) {
    this.saveOrUpdate = "update";
    this.course = user;
    this.course.categoryName= user.courseCategoryVos[0].categoryId;
  }

  deleteCourse(courseId) {
    this.service.deleteCourse(courseId).subscribe(data => {
      this.alertMassege = "Deleted successfully!!";
     // this.getCourse();
    });
  }

  clickedAlert = function () {
    this.alertMassege = "";
  };

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


  FnSearchCourse(course)
  {
    
    this.service.searchCourse(course)
    .subscribe(
      (data) => {
        this.courseList = data;
        console.log("course list part")
        console.log(this.courseList);
        if (typeof this.courseList !== 'undefined' && this.courseList.length > 0) {
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


  // FnSearchCourse(course)
  // {
    
  //   this.service.searchCourse(course)
  //   .subscribe(
  //     (data) => {
  //       this.courseList = data;
  //       console.log("course list part")
  //       console.log(this.courseList);
  //       if (typeof this.courseList !== 'undefined' && this.courseList.length > 0) {
  //         this.isListContainsData = true;
  //       }
  //       else {
  //         this.isListContainsData = false;
  //       }
  //     },
  //     (error) => {
  //       console.log(error);
  //       alert("Try again");
  //     }
  //   );
  // }

//   searchCourse(courseParameters) {
//     if (typeof courseParameters.value.courseName != "undefined"
//     || typeof courseParameters.value.courseCode != "undefined"
//     || typeof courseParameters.value.categoryName != "undefined"
//     || typeof courseParameters.value.duration != "undefined") { 
//       console.log("if ");
//       this.isSearchClicked=true;
//       if(courseParameters.value.courseName === null
//       || courseParameters.value.courseCode === null
//       || courseParameters.value.categoryName === null
//       || courseParameters.value.duration === null)
//       {

//       }
//       else{    
//         console.log("else part")
//       this.service.searchCourse(courseParameters.value)
//     .subscribe(
//       (data) => {
//         this.courseList = data;
//         console.log("course list part")
//         console.log(this.courseList);
//         if (typeof this.courseList !== 'undefined' && this.courseList.length > 0) {
//           this.isListContainsData = true;
//         }
//         else {
//           this.isListContainsData = false;
//         }
//       },
//       (error) => {
//         console.log(error);
//         alert("Try again");
//       }
//     );
//   }
// }
//   }
// searchClear() {
//   this.course = new Course();
//   // this.courseSearch= new courseSearchObject();
// }



searchCourse(CourseParameters) {
  var courseLocal: Course = new Course();
  this.isSearchClicked=true;
     if (typeof this.selectedValue !== 'undefined'  && this.selectedValue.length>0) 
  {
    courseLocal.courseName = this.selectedValue[0].courseName;
  }
  if (typeof this.selectedcourseCodeValue !== 'undefined' && this.selectedcourseCodeValue.length>0) 
  {
    courseLocal.courseCode = this.selectedcourseCodeValue[0].courseCode
  }

  if (typeof this.selectedcategoryNameValue !== 'undefined' && this.selectedcategoryNameValue.length>0) 
  {
    courseLocal.categoryName = this.selectedcategoryNameValue[0].categoryName
  }

  if (typeof courseLocal.courseName === 'undefined'  && typeof courseLocal.courseCode === 'undefined' && typeof courseLocal.categoryName === 'undefined') 
  {
    Swal({
      title: 'Invalid!!',
      text: 'Atleast enter any one field.',
      showCancelButton: false,
      confirmButtonText: 'Ok',
    });
    this.isListContainsData = false;
    this.courseList=[];
   
  }
  else
  {
    this.service.searchCourse(courseLocal)
    .subscribe(
      (data) => {
        this.courseList = data;
        if (typeof this.courseList !== 'undefined' && this.courseList.length > 0) {
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
//   searchCourse(courseParameters) {
//     if (typeof courseParameters.value.courseName != "undefined"
//     || typeof courseParameters.value.courseCode != "undefined"
//     || typeof courseParameters.value.categoryName != "undefined"
//     || typeof courseParameters.value.duration != "undefined") { 
//       this.isSearchClicked=true;
//       if(courseParameters.value.courseName === null
//       || courseParameters.value.courseCode === null
//       || courseParameters.value.categoryName === null
//       || courseParameters.value.duration === null)
//       {

//       }
//       else{    
//       this.service.searchCourse(courseParameters.value)
//     .subscribe(
//       (data) => {
//         this.courseList = data;
//         if (typeof this.courseList !== 'undefined' && this.courseList.length > 0) {
//           this.isListContainsData = true;
//         }
//         else {
//           this.isListContainsData = false;
//         }
//       },
//       (error) => {
//         console.log(error);
//         alert("Try again");
//       }
//     );
//   }
// }
//   }
searchClear() {
  this.course = new Course();
  this.ngSelectCourseName.deselectItem(this.selectedValue,0);
  this.ngSelectCourseName.ngOnInit();

  this.ngSelectCourseCode.deselectItem(this.selectedcourseCodeValue,0);
  this.ngSelectCourseCode.ngOnInit();

  this.ngSelectCategoryName.deselectItem(this.selectedcategoryNameValue,0);
  this.ngSelectCategoryName.ngOnInit();
  
}

}



