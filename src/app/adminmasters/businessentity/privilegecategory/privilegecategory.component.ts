import { Component, OnInit } from '@angular/core';
// import { AttributeService } from '../attribute/attribute.service';
import { Attribute } from "../attribute/attribute";
import { PrivilegecategoryService } from "../privilegecategory/privilegecategory.service";
import {PrivilegeCategory} from "./privilegecategory";
import { ViewChild } from '@angular/core'
import { SelectDropDownComponent } from "ngx-select-dropdown";




declare var jquery: any;
declare var $: any;


@Component({
  selector: 'app-privilegecategory',
  templateUrl: './privilegecategory.component.html',
  styleUrls: ['./privilegecategory.component.css']
})
export class PrivilegecategoryComponent implements OnInit {

  alertMassege = "";
  isListContainsData: boolean;
  isSearchClicked: boolean;
  saveOrUpdate: string;
  caseInsensitive: boolean = true;
  key: string;
  reverse: boolean = false;
  pagenumber : string ;
  p: number = 1;
  itemsPerPage2: number = 1;
  privilegeCategory: PrivilegeCategory = new PrivilegeCategory();
  attributeList: Attribute[];
  attributeListLocal: Attribute[];
  privilegeCategoryList: PrivilegeCategory[];
  privilegeCategoryListLocal: PrivilegeCategory[];
 // attribute: Attribute = new Attribute();
  selectedAttribute = [];

  @ViewChild('chosenuser') public ngSelect: SelectDropDownComponent;



  constructor(private privilegecategoryservice: PrivilegecategoryService) { }

  ngOnInit() {
    this.getPrivilegeCategory();
    this.isListContainsData = false;
    this.isSearchClicked = false;
    this.pageChange(5);
  }

  privilegeCategoryForm;
  selectedValue : any = [];
  config = {
    displayKey: "privilegeName", //if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: 10
  };
  

  addNew() {
    this.saveOrUpdate = "save";
    this.privilegeCategory = new PrivilegeCategory();
    $('#addModal').modal({
      backdrop: 'static',
      keyboard: false
    });
  }

  selectUser(privilegecategory) {
    this.saveOrUpdate = "update";
    this.privilegeCategory = privilegecategory;
  }
  

  savePrivilege(data)
  {
    console.log(this.saveOrUpdate);
    if (this.saveOrUpdate == "save") {
      this.privilegecategoryservice.savePrivilegecategory(data)
        .subscribe(
          (data) => {
            console.log(data);
           // alert("added  successfully");
            this.alertMassege = "New item add on list successfully!!";
           this.getPrivilegeCategory();
          },
          (error) => {
            console.log(error);
            alert("Service already exists");
          }
        );

    }
    else if (this.saveOrUpdate == "update") {
      
      this.privilegecategoryservice.updatePrivilegecategory(this.privilegeCategory)
        .subscribe(
          (data) => {
            this.alertMassege = "Item updated on list successfully!!";
            this.getPrivilegeCategory();
            // console.log(this.privilegeCategoryListLocal);
            // this.privilegeCategory = this.privilegeCategoryListLocal[this.privilegeCategoryListLocal.length-1];
            // console.log(this.privilegeCategory);
          },
          (error) => {
            console.log(error);
            alert("Try again");
          }
        );

    }
  }

    getPrivilegeCategory() {
    this.privilegecategoryservice.getPrivilegeCategory()
      .subscribe(
        (data) => {
          this.privilegeCategoryListLocal = data;
        }
      );

  }

  deletePrivilegeCategory(PrivilegeId) {
    this.privilegecategoryservice.deletePrivilegeCategory(PrivilegeId).
      subscribe(data => {
        this.alertMassege = "Deleted successfully!!";
        this.getPrivilegeCategory();
      });
  }

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


  searchPrivilegeCategory()
  {
    console.log(this.selectedValue);
    this.isListContainsData = true;
    this.privilegeCategoryList = this.selectedValue;
  }


   searchClear() {
     this.privilegeCategory = new PrivilegeCategory( );
     this.ngSelect.deselectItem(this.selectedValue,0);
     this.ngSelect.ngOnInit();
   }

}
