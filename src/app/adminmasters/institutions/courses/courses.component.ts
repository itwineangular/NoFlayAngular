import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Course } from './courses.module';
import { CourseService } from './courses.service';
import { CourseCategoryService } from "../course-category/course-category.service";
import { CourseCategory } from "../course-category/course-category.module";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  alertMassege = "";
  isListContainsData: boolean;
  isSearchClicked: boolean;


  course: Course = new Course();
  courseList: Course[];
  courseCategoryList: CourseCategory[];
  saveOrUpdate: string;
  key: string ;
  reverse: boolean = false;
  pagenumber : string ;
  p: number = 1;
  itemsPerPage2: number = 1;
  caseInsensitive: boolean = true;

  constructor(private service: CourseService,
    private courseCategoryService: CourseCategoryService) { }

  ngOnInit() {
    this.isListContainsData = false;
    // this.getCourse();
    this.getCourseCategory();
    this.pageChange(5);
  }

  addNew() {
    this.saveOrUpdate = "save";
    this.course = new Course();
  }

  saveCourse(form: NgForm) {
    if (this.saveOrUpdate == "save") {
      console.log("save");
      this.service.saveCourse(form.value)
        .subscribe(
          (data) => {
            this.alertMassege = "New item add on list successfully!!";
            if (form != null)
              form.reset();
            this.getCourse();
          },
          (error) => {
            console.log(error);
            alert("Try again");
          }
        );

    }
    else if (this.saveOrUpdate == "update") {
      console.log("update");
      this.service.updateCourse(this.course)
        .subscribe(
          (data) => {
            this.alertMassege = "Item updated on list successfully!!";
            this.getCourse();
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
      this.courseList = data;
      console.log(this.courseList);
    });
  }

  getCourseCategory() {
    this.courseCategoryService.getCourseCategory().subscribe(data => {
      this.courseCategoryList = data;
    });
  }

  selectedUser(user) {
    this.saveOrUpdate = "update";
    this.course = user;
  }

  deleteCourse(courseId) {
    this.service.deleteCourse(courseId).subscribe(data => {
      this.alertMassege = "Deleted successfully!!";
      this.getCourse();
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

  searchCourse(courseParameters) {
    if (typeof courseParameters.value.courseName != "undefined"
    || typeof courseParameters.value.courseCode != "undefined"
    || typeof courseParameters.value.categoryName != "undefined"
    || typeof courseParameters.value.duration != "undefined") { 
      this.isSearchClicked=true;
      if(courseParameters.value.courseName === null
      || courseParameters.value.courseCode === null
      || courseParameters.value.categoryName === null
      || courseParameters.value.duration === null)
      {

      }
      else{    
      this.service.searchCourse(courseParameters.value)
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
  }
searchClear() {
  this.course = new Course();
  // this.service.searchCourseCategory(this.courseCategory)
  //   .subscribe(
  //     (data) => {
  //       this.courseCategoryList = data;
  //     },
  //     (error) => {
  //       console.log(error);
  //       alert("Try again");
  //     }
  //   );
}


}



