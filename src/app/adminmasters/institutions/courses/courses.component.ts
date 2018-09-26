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
  course: Course = new Course();
  courseList: Course[];
  courseCategoryList: CourseCategory[];
  saveOrUpdate: string;
  key: string ;
  reverse: boolean = false;
  pagenumber : string ;
  p: number = 1;
  itemsPerPage2: number = 1;

  constructor(private service: CourseService,
    private courseCategoryService: CourseCategoryService) { }

  ngOnInit() {
    this.getCourse();
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
    // console.log(courseParameters.value);
    this.service.searchCourse(courseParameters.value)
      .subscribe(
        (data) => {
          this.courseList = data;
          console.log(this.courseList);
        },
        (error) => {
          console.log(error);
          alert("Try again");
        }
      );
  }

  searchClear() {
    this.course = new Course();
    this.service.searchCourse(this.course)
      .subscribe(
        (data) => {
          this.courseList = data;
        },
        (error) => {
          console.log(error);
          alert("Try again");
        }
      );
  }

}
