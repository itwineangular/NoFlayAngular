import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CourseCategory } from './course-category.module';
import { CourseCategoryService } from './course-category.service';


@Component({
  selector: 'app-course-category',
  templateUrl: './course-category.component.html',
  styleUrls: ['./course-category.component.css']
})
export class CourseCategoryComponent implements OnInit {

  alertMassege = "";
  courseCategory: CourseCategory = new CourseCategory();
  courseCategoryList: CourseCategory[];
  saveOrUpdate: string;
  key: string;
  reverse: boolean = false;
  pagenumber: string;
  p: number = 1;
  itemsPerPage2: number = 1;

  constructor(private service: CourseCategoryService) { }

  ngOnInit() {
    this.getCourseCaterory();
    this.pageChange(5);
  }

  addNew() {
    this.saveOrUpdate = "save";
    this.courseCategory = new CourseCategory();
  }

  getCourseCaterory() {
    this.service.getCourseCategory().subscribe(data => {
      this.courseCategoryList = data;
    });
  }

  selectedUser(user) {
    this.saveOrUpdate = "update";
    this.courseCategory = user;
  }

  saveCourseCategory(form: NgForm) {
    if (this.saveOrUpdate == "save") {
      console.log("save");
      this.service.saveCourseCategory(form.value)
        .subscribe(
          (data) => {
            this.alertMassege = "New item add on list successfully!!";
            if (form != null)
              form.reset();
            this.getCourseCaterory();
          },
          (error) => {
            console.log(error);
            alert("Try again");
          }
        );

    }
    else if (this.saveOrUpdate == "update") {
      console.log("update");
      this.service.updateCourseCategory(this.courseCategory)
        .subscribe(
          (data) => {
            this.alertMassege = "Item updated on list successfully!!";
            this.getCourseCaterory();
          },
          (error) => {
            console.log(error);
            alert("Try again");
          }
        );

    }
  }

  deleteCourseCaterory(id) {
    this.service.deleteCourseCategory(id).subscribe(
      (data) => {
        alert(data.message);
        console.log(data.message);
        this.alertMassege = "Deleted successfully!!";
        this.getCourseCaterory();
      },
      (error) => {
        console.log(error);
        alert("You can't delete this data");
      });
  }

  clickedAlert = function () {
    this.alertMassege = "";
  };

  pageChange(pagenumber) {

    this.pagenumber = pagenumber;
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

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  searchCourseCategory(courseCategoryParameters) {
    console.log(courseCategoryParameters.value);
   this.service.searchCourseCategory(courseCategoryParameters.value)
       .subscribe(
     (data) => {
       this.courseCategoryList = data;
       console.log(this.courseCategoryList);
     },
     (error) => {
       console.log(error);
       alert("Try again");
     }
   );
 }

 searchClear() {
   this.courseCategory = new CourseCategory();
   this.service.searchCourseCategory(this.courseCategory)
     .subscribe(
       (data) => {
         this.courseCategoryList = data;
       },
       (error) => {
         console.log(error);
         alert("Try again");
       }
     );
 }

}
