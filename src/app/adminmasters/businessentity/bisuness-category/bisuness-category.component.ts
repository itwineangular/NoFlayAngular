import { Component, OnInit } from '@angular/core';
import { BusinessCategoryServicesService } from './business-category-services.service';
import { BusinessCategory } from "./business-category";

import Swal from 'sweetalert2';
import { ViewChild } from '@angular/core';
import { SelectDropDownComponent } from "ngx-select-dropdown";

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-bisuness-category',
  templateUrl: './bisuness-category.component.html',
  styleUrls: ['./bisuness-category.component.css']
})
export class BisunessCategoryComponent implements OnInit {

  alertMassege = "";
  isListContainsData: boolean;
  isSearchClicked: boolean;
  caseInsensitive: boolean = true;

  saveOrUpdate: string;
  key: string ;
  reverse: boolean = false;
  pagenumber : string ;
  p: number = 1;
  itemsPerPage2: number = 1;

  businesscategory: BusinessCategory = new BusinessCategory();
  businesscategoryList: BusinessCategory[];
  businesscategoryListLocal: BusinessCategory[]= [];

  @ViewChild('businessCategoryName') public ngSelectbusinessCategoryName: SelectDropDownComponent;
  @ViewChild('businessCategoryCode') public ngSelectbusinessCategoryCode: SelectDropDownComponent;

  constructor(private service: BusinessCategoryServicesService) { }

  ngOnInit() {
    this.getBusinessCategory();
    this.isListContainsData = false;
    this.isSearchClicked= false;


    this.pageChange(5);
  }
  selectUser(item) {
    this.saveOrUpdate = "update";
    this.businesscategory = item;
  }

  addNew() {
    this.saveOrUpdate = "save";
    this.businesscategory = new BusinessCategory();
    $('#addModal').modal({
      backdrop: 'static',
      keyboard: false
  });
  }

  selectedValue: any;
  config = {
    displayKey: "businessCategoryName", //if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: this.businesscategoryListLocal.length
    // limitTo: 10
  };
  changeValue($event: any) {
    console.log(this.selectedValue)
    
    this.ngSelectbusinessCategoryCode.value=this.selectedValue;
    this.ngSelectbusinessCategoryCode.ngOnInit();
  }

  // changeValue($event: any) {
  //   this.isListContainsData = true;
  //   this.businesscategoryList = this.selectedValue;
  // }

  selectedbusinessCategoryCodeValue: any;
  businessCategoryCodeconfig = {
    displayKey: "businessCategoryCode", //if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: this.businesscategoryListLocal.length
    // limitTo: 10
  };
  // businessCategoryCodechangeValue($event: any) {
  //   console.log(this.businessCategoryCodechangeValue);
  //   this.isListContainsData = true;
  //   this.businesscategoryList = this.selectedbusinessCategoryCodeValue;
  // }

  saveBusinessCategory(businessValue) {
    if (this.saveOrUpdate == "save") {
      console.log("save");
      this.service.saveBusinessCategory(businessValue)
        .subscribe(
          (data) => {
            this.alertMassege = "New item add on list successfully!!";
            this.getBusinessCategory();
          },
          (error) => {
            console.log(error);
            alert("Try again");
          }
        );

    }
    else if (this.saveOrUpdate == "update") {
      console.log("update");
      this.service.updateBusinessCategory(this.businesscategory)
        .subscribe(
          (data) => {
            this.alertMassege = "Item updated on list successfully!!";
            this.getBusinessCategory();
          },
          (error) => {
            console.log(error);
            alert("Try again");
          }
        );
    }
  }
  getBusinessCategory() {
    this.service.getBusinessCategory()
      .subscribe(
        (data) => {
          // this.businesscategoryList = data;
          this.businesscategoryListLocal = data;
        }
      );

  }

  clickedAlert = function () {
    this.alertMassege = "";
  };

  deleteBusinessCategory(businessCategoryId) {
    this.service.deleteBusinessCategory(businessCategoryId).subscribe(data => {
      this.alertMassege = "Deleted successfully!!";
      this.getBusinessCategory();
    });
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


  searchBusinessCategory(courseCategoryParameters) {
    var businesscategoryLocal: BusinessCategory = new BusinessCategory();
    this.isSearchClicked = true;
    // businesscategoryLocal.status = courseCategoryParameters.status;
    if (typeof this.selectedValue !== 'undefined' && this.selectedValue.length > 0) {
      businesscategoryLocal.businessCategoryName = this.selectedValue[0].businessCategoryName;
    }
    if (typeof this.selectedbusinessCategoryCodeValue !== 'undefined' && this.selectedbusinessCategoryCodeValue.length > 0) {
      businesscategoryLocal.businessCategoryCode = this.selectedbusinessCategoryCodeValue[0].businessCategoryCode
    }

    if (typeof businesscategoryLocal.businessCategoryName === 'undefined' && typeof businesscategoryLocal.businessCategoryCode === 'undefined') {
      Swal({
        title: 'Invalid!!',
        text: 'Atleast enter any one field.',
        showCancelButton: false,
        confirmButtonText: 'Ok',
      });
      this.isListContainsData = false;
      this.businesscategoryList = [];

    }
    else {
      this.service.searchBusinessCategory(businesscategoryLocal)
        .subscribe(
          (data) => {
            this.businesscategoryList = data;
            if (typeof this.businesscategoryList !== 'undefined' && this.businesscategoryList.length > 0) {
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
    this.businesscategory = new BusinessCategory();
    this.ngSelectbusinessCategoryName.deselectItem(this.selectedValue, 0);
    this.ngSelectbusinessCategoryName.ngOnInit();

    this.ngSelectbusinessCategoryCode.deselectItem(this.selectedbusinessCategoryCodeValue, 0);
    this.ngSelectbusinessCategoryCode.ngOnInit();

  }

  }