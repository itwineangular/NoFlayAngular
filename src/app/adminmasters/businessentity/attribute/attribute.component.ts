import { Component, OnInit } from '@angular/core';
import { AttributeService } from './attribute.service';
import { Attribute } from "../attribute/attribute";
import { BusinessCategory } from "../bisuness-category/business-category";
import { BusinessCategoryServicesService } from '../bisuness-category/business-category-services.service';

import Swal from 'sweetalert2';
import { ViewChild } from '@angular/core';
import { SelectDropDownComponent } from "ngx-select-dropdown";

declare var jquery: any;
declare var $: any;


@Component({
  selector: 'app-attribute',
  templateUrl: './attribute.component.html',
  styleUrls: ['./attribute.component.css']
})
export class AttributeComponent implements OnInit {
  alertMassege = "";
  isListContainsData: boolean;
  isSearchClicked: boolean;
  caseInsensitive: boolean = true;

  saveOrUpdate: string;
  pagenumber: string;
  p: number = 1;
  itemsPerPage2: number = 1;
  // key: string = 'attributeId';
  key: string;
  reverse: boolean = false;

  attribute: Attribute = new Attribute();
  attributeList: Attribute[];
  businessCategoryList: BusinessCategory[];
  attributeListLocal: Attribute[]= [];

  @ViewChild('attributeName') public ngSelectattributeName: SelectDropDownComponent;
  @ViewChild('attributeCode') public ngSelectattributeCode: SelectDropDownComponent;
  @ViewChild('businessCategoryName') public ngSelectbusinessCategoryName: SelectDropDownComponent;

  constructor(private service: AttributeService,
    private BusinessCategoryServicesService: BusinessCategoryServicesService) { }

  ngOnInit() {
    this.getAttribute();
    this.isListContainsData = false;
    this.isSearchClicked = false;

    this.getBusinessCategory();
    this.pageChange(5);
  }

  selectedValue : any;
  config = {
    displayKey: "attributeName", //if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: this.attributeListLocal.length
    // limitTo: 10
  };
  changeValue($event: any) {
    console.log(this.selectedValue)
    
    this.ngSelectattributeCode.value=this.selectedValue;
    this.ngSelectattributeCode.ngOnInit();

    this.ngSelectbusinessCategoryName.value=this.selectedValue;
    this.ngSelectbusinessCategoryName.ngOnInit();
  }
  // changeValue($event: any) {
  //   this.isListContainsData = true;
  //   this.attributeList = this.selectedValue;
  // }

  selectedattributeCodeValue : any;
  attributeCodeconfig = {
    displayKey: "attributeCode", //if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: this.attributeListLocal.length
    // limitTo: 10
  };
  // attributeCodeChangeValue($event: any) {
  //   console.log(this.selectedattributeCodeValue);
  //   this.isListContainsData = true;
  //   this.attributeList = this.selectedattributeCodeValue;
  // }

  selectedbusinessCategoryNameValue : any;
  businessCategoryNameconfig = {
    displayKey: "businessCatName", //if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: this.attributeListLocal.length
    // limitTo: 10
  };
  // businessCategoryNameChangeValue($event: any) {
  //   console.log(this.selectedbusinessCategoryNameValue);
  //   this.isListContainsData = true;
  //   this.attributeList = this.selectedbusinessCategoryNameValue;
  // }

  addNew() {
    this.saveOrUpdate = "save";
    this.attribute = new Attribute();
    $('#addModal').modal({
      backdrop: 'static',
      keyboard: false
  });
  }

  saveAttribute(attributeValue) {
    if (this.saveOrUpdate == "save") {
      console.log("save");
      this.service.saveattribute(attributeValue)
        .subscribe(
          (data) => {
            this.alertMassege = "New item add on list successfully!!";
            this.getAttribute();
          },
          (error) => {
            console.log(error);
            alert("Try again");
          }
        );

    }
    else if (this.saveOrUpdate == "update") {
      console.log("update");
      this.service.updateAttribute(this.attribute)
        .subscribe(
          (data) => {
            this.alertMassege = "Item updated on list successfully!!";

            this.getAttribute();
          },
          (error) => {
            console.log(error);
            alert("Try again");
          }
        );

    }


  }

  deleteAttribute(attributeId) {
    this.service.deleteAttribute(attributeId).subscribe(data => {
      this.alertMassege = "Deleted successfully!!";
      this.getAttribute();
    });
  }


  clickedAlert = function () {
    this.alertMassege = "";
  };


  selectUser(item) {
    this.saveOrUpdate = "update";
    this.attribute = item;
  }
  getAttribute() {
    this.service.getAttribute()
      .subscribe(
        (data) => {
          // this.attributeList = data;
          this.attributeListLocal = data;
        }
      );

  }


  getBusinessCategory() {
    this.BusinessCategoryServicesService.getBusinessCategory().subscribe(data => {
      this.businessCategoryList = data;
    });
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
  searchAttribute(attributeParameters) {
    var attributeLocal: Attribute = new Attribute();
    this.isSearchClicked=true;
    // attributeLocal.status = attributeParameters.status;
    if (typeof this.selectedValue !== 'undefined'  && this.selectedValue.length>0) 
    {
      attributeLocal.attributeName = this.selectedValue[0].attributeName;
    }
    if (typeof this.selectedattributeCodeValue !== 'undefined' && this.selectedattributeCodeValue.length>0) 
    {
      attributeLocal.attributeCode = this.selectedattributeCodeValue[0].attributeCode
    }
    if (typeof this.selectedbusinessCategoryNameValue !== 'undefined' && this.selectedbusinessCategoryNameValue.length>0) 
    {
      attributeLocal.businessCatName = this.selectedbusinessCategoryNameValue[0].businessCatName
    }
    console.log(attributeLocal);
    
    if (typeof attributeLocal.attributeName === 'undefined'  && typeof attributeLocal.attributeCode === 'undefined' && typeof attributeLocal.businessCatName === 'undefined') 
    {
      Swal({
        title: 'Invalid!!',
        text: 'Atleast enter any one field.',
        showCancelButton: false,
        confirmButtonText: 'Ok',
      });
      this.isListContainsData = false;
      this.attributeList=[];
     
    }
    else
    {
      this.service.searchAttribute(attributeLocal)
      .subscribe(
        (data) => {
          this.attributeList = data;
          if (typeof this.attributeList !== 'undefined' && this.attributeList.length > 0) {
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
    this.attribute = new Attribute();
    this.ngSelectattributeName.deselectItem(this.selectedValue,0);
    this.ngSelectattributeName.ngOnInit();

    this.ngSelectattributeCode.deselectItem(this.selectedattributeCodeValue,0);
    this.ngSelectattributeCode.ngOnInit();

    this.ngSelectbusinessCategoryName.deselectItem(this.selectedbusinessCategoryNameValue,0);
    this.ngSelectbusinessCategoryName.ngOnInit();
    
  }
}
