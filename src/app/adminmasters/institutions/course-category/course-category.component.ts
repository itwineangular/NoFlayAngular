import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CourseCategory } from './course-category.module';
import { CourseCategoryService } from './course-category.service';
import Swal from 'sweetalert2';
import { ViewChild } from '@angular/core';
import { SelectDropDownComponent } from "ngx-select-dropdown";

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-course-category',
  templateUrl: './course-category.component.html',
  styleUrls: ['./course-category.component.css']
})
export class CourseCategoryComponent implements OnInit {

  alertMassege = "";
  isSearchClicked: boolean;
  isListContainsData: boolean;
  courseCategory: CourseCategory = new CourseCategory();
  courseCategoryList: CourseCategory[];
  courseCategoryListLocal: CourseCategory[];
  saveOrUpdate: string;
  key: string;
  reverse: boolean = false;
  pagenumber: string;
  p: number = 1;
  itemsPerPage2: number = 1;
  caseInsensitive: boolean = true;

  @ViewChild('categoryName') public ngSelectCategoryName: SelectDropDownComponent;
  @ViewChild('categoryCode') public ngSelectCategoryCode: SelectDropDownComponent;

  constructor(private service: CourseCategoryService) { }

  ngOnInit() {
    this.isListContainsData = false;
    this.isSearchClicked=false;
    this.getCourseCaterory();
    this.pageChange(5);
  }

  selectedValue : any;
  config = {
    displayKey: "categoryName", //if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: 10
  };
  changeValue($event: any) {
    if(this.selectedValue.length>0)
    {
      this.courseCategory.status=this.selectedValue[0].status;
    }
    else
    {
      this.courseCategory = new CourseCategory();
    }
    this.ngSelectCategoryCode.value=this.selectedValue;
    this.ngSelectCategoryCode.ngOnInit();
  }

  selectedCategoryCodeValue : any;
  CategoryCodeconfig = {
    displayKey: "categoryCode", //if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: 10
  };
  // CategoryCodeChangeValue($event: any) {
  //   console.log(this.selectedCategoryCodeValue);
  //   this.isListContainsData = true;
  //   this.courseCategoryList = this.selectedCategoryCodeValue;
  // }

  addNew() {
    this.saveOrUpdate = "save";
    this.courseCategory = new CourseCategory();
    $('#addModal').modal({
      backdrop: 'static',
      keyboard: false
  });
  }

  getCourseCaterory() {
    this.service.getCourseCategory().subscribe(data => {
      // this.courseCategoryList = data;
      this.courseCategoryListLocal = data;
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
        this.alertMassege = "Deleted successfully!!";
        this.getCourseCaterory();
        var categoryListLocal = this.courseCategoryList.filter(x=>x.categoryId!==id);
        this.courseCategoryList=categoryListLocal;
      },
      (error) => {
         alert("You can't delete this data");
      });
  }

  clickedAlert = function () {
    this.alertMassege = "";
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

  searchCourseCategory(courseCategoryParameters) {
    var courseCategoryLocal: CourseCategory = new CourseCategory();
    this.isSearchClicked=true;
    courseCategoryLocal.status = courseCategoryParameters.status;
    if (typeof this.selectedValue !== 'undefined'  && this.selectedValue.length>0) 
    {
      courseCategoryLocal.categoryName = this.selectedValue[0].categoryName;
    }
    if (typeof this.selectedCategoryCodeValue !== 'undefined' && this.selectedCategoryCodeValue.length>0) 
    {
      courseCategoryLocal.categoryCode = this.selectedCategoryCodeValue[0].categoryCode
    }

    if (typeof courseCategoryLocal.categoryName === 'undefined'  && typeof courseCategoryLocal.categoryCode === 'undefined' && typeof courseCategoryLocal.status === 'undefined') 
    {
      Swal({
        title: 'Invalid!!',
        text: 'Atleast enter any one field.',
        showCancelButton: false,
        confirmButtonText: 'Ok',
      });
      this.isListContainsData = false;
      this.courseCategoryList=[];
     
    }
    else
    {
      this.service.searchCourseCategory(courseCategoryLocal)
      .subscribe(
        (data) => {
          this.courseCategoryList = data;
          if (typeof this.courseCategoryList !== 'undefined' && this.courseCategoryList.length > 0) {
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
    this.courseCategory = new CourseCategory();
    this.ngSelectCategoryName.deselectItem(this.selectedValue,0);
    this.ngSelectCategoryName.ngOnInit();

    this.ngSelectCategoryCode.deselectItem(this.selectedCategoryCodeValue,0);
    this.ngSelectCategoryCode.ngOnInit();
  }

}
