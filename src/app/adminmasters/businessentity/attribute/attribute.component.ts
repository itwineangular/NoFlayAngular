import { Component, OnInit } from '@angular/core';
import { AttributeService } from './attribute.service';
import { Attribute } from "../attribute/attribute";
// import { BusinessCategory } from "../bisuness-category/business-category";
// import { BusinessCategoryServicesService } from '../bisuness-category/business-category-services.service';
import { PrivilegeCategory } from "../privilegecategory/privilegecategory";
import { PrivilegecategoryService } from '../privilegecategory/privilegecategory.service';
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
  key: string;
  reverse: boolean = false;

  selectedPrivilegesNames : string;

  attribute: Attribute = new Attribute();
  attributeList: Attribute[] = [];
  privilegeCategoryList: PrivilegeCategory[] = [];
  privilegeCategoryListForAdd: PrivilegeCategory[] = [];
  attributeListLocal: Attribute[] = [];

  @ViewChild('attributeName') public ngSelectattributeName: SelectDropDownComponent;
  @ViewChild('attributeCode') public ngSelectattributeCode: SelectDropDownComponent;
  @ViewChild('privilegeCategoryName') public ngSelectprivilegeCategoryName: SelectDropDownComponent;
  @ViewChild('addPrivilegeCategoryNames') public ngselectedaddPrivilegeCategoryNameValue: SelectDropDownComponent;

  constructor(private service: AttributeService,
    private PrivilegecategoryService: PrivilegecategoryService) { }

  ngOnInit() {
    this.getAttribute();
    this.isListContainsData = false;
    this.isSearchClicked = false;
    this.getPrivilegeCategory();
    this.pageChange(5);
  }

  selectedValue: any;
  config = {
    displayKey: "attributeName",
    search: true,
    limitTo: this.attributeListLocal.length
  };

  changeValue($event: any) {
    
    this.selectedattributeCodeValue = this.selectedValue;
    this.ngSelectattributeCode.value = this.selectedValue;
    this.ngSelectattributeCode.ngOnInit();

    if (this.selectedValue.length > 0) {
      this.selectedprivilegeCategoryNameValue = this.selectedValue[0].privileges
      this.ngSelectprivilegeCategoryName.value = this.selectedValue[0].privileges;
      this.ngSelectprivilegeCategoryName.ngOnInit();
    }
  }
  selectedattributeCodeValue: any;
  attributeCodeconfig = {
    displayKey: "attributeCode",
    search: true,
    limitTo: this.attributeListLocal.length
  };

  selectedprivilegeCategoryNameValue: any;
  privilegeCategoryNameconfig = {
    displayKey: "privilegeName",
    search: true,
    limitTo: this.attributeListLocal.length
   
  };

  changeValuePrivilege()
  {
    console.log(this.selectedprivilegeCategoryNameValue);
  }

  selectedaddPrivilegeCategoryNameValue: any;
  addPrivilegeCategoryName = {
    displayKey: "privilegeName",
    search: true,
    limitTo: this.privilegeCategoryListForAdd.length
  };

  changeaddPrivilegeCategoryNameValue() {
  }

  addNew() {
     this.ngselectedaddPrivilegeCategoryNameValue.deselectItem(this.selectedaddPrivilegeCategoryNameValue, 0);
    this.ngselectedaddPrivilegeCategoryNameValue.ngOnInit();
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
      this.service.saveattribute(attributeValue, this.selectedaddPrivilegeCategoryNameValue)
        .subscribe(
          (data) => {
            this.alertMassege = "New item add on list successfully!!";
            // this.getAttribute();
          },
          (error) => {
            console.log(error);
            alert("Try again");
          }
        );

    }
    else if (this.saveOrUpdate == "update") {
      console.log("update");
      this.service.updateAttribute(this.attribute,this.selectedaddPrivilegeCategoryNameValue)
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
    if (this.attribute.privileges.length > 0) {
  this.selectedaddPrivilegeCategoryNameValue = this.attribute.privileges;
   // this.ngselectedaddPrivilegeCategoryNameValue.selectedItems = this.attribute.privileges;
    }

  }
  getAttribute() {
    this.service.getAttribute()
      .subscribe(
        (data) => {
          // console.log(data);
          this.attributeList = data;
          this.attributeListLocal = data;
        }
      );

  }


  // getBusinessCategory() {
  //   this.BusinessCategoryServicesService.getBusinessCategory().subscribe(data => {
  //     this.businessCategoryList = data;
  //   });
  // }

  getPrivilegeCategory() {
    this.PrivilegecategoryService.getPrivilegeCategory().subscribe(data => {
      this.privilegeCategoryList = data;
      this.privilegeCategoryListForAdd = data;
      console.log("dsjkgh");
      console.log(this.privilegeCategoryListForAdd);
      // this.privilegeCategoryListLocal = data;
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
    this.isSearchClicked = true;
    attributeLocal.attributeName = "";
    attributeLocal.attributeCode = "";
    attributeLocal.privilegeId = "";

    // console.log(this.selectedValue);
    // console.log(this.selectedattributeCodeValue);
    // console.log(this.selectedprivilegeCategoryNameValue);
    // let attributeName = this.selectedValue[0].attributeName;
    // let attributeCode = this.selectedattributeCodeValue[0].attributeCode;
    // let privilegeId = this.selectedprivilegeCategoryNameValue[0].privilegeId;
    // this.service.searchAttribute(attributeName,attributeCode,privilegeId)
    //   .subscribe(
    //     (data) => {
    //       console.log(data);
    //       this.attributeList = data;
    //     },
    //     (error) => {
    //       console.log(error);
    //     });

    if (typeof this.selectedValue !== 'undefined' && this.selectedValue.length > 0) {
      attributeLocal.attributeName = this.selectedValue[0].attributeName;
    }
    if (typeof this.selectedattributeCodeValue !== 'undefined' && this.selectedattributeCodeValue.length > 0) {
      attributeLocal.attributeCode = this.selectedattributeCodeValue[0].attributeCode
    }
    if (typeof this.selectedprivilegeCategoryNameValue !== 'undefined' && this.selectedprivilegeCategoryNameValue.length > 0) {
      attributeLocal.privilegeId = this.selectedprivilegeCategoryNameValue[0].privilegeId
    }
   // console.log(attributeLocal);

    if (typeof attributeLocal.attributeName === 'undefined' && typeof attributeLocal.attributeCode === 'undefined' && typeof attributeLocal.privilegeId === 'undefined') {
      Swal({
        title: 'Invalid!!',
        text: 'Atleast enter any one field.',
        showCancelButton: false,
        confirmButtonText: 'Ok',
      });
      this.isListContainsData = false;
      this.attributeList = [];

    }
    else {
      // console.log(this.selectedValue);
      // console.log(this.selectedattributeCodeValue);
      // console.log(this.selectedprivilegeCategoryNameValue);
      // let attributeName = this.selectedValue[0].attributeName;
      // let attributeCode = this.selectedattributeCodeValue[0].attributeCode;
      // let privilegeId = this.selectedprivilegeCategoryNameValue[0].privilegeId;

      console.log(attributeLocal);
      this.service.searchAttribute(attributeLocal.attributeName, attributeLocal.attributeCode, attributeLocal.privilegeId)
        .subscribe(
          (data) => {
            this.attributeList = data;
            console.log("kdjghkh");
            console.log(this.attributeList);
            console.log("kdjghkh");
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
    this.ngSelectattributeName.deselectItem(this.selectedValue, 0);
    this.ngSelectattributeName.ngOnInit();

    this.ngSelectattributeCode.deselectItem(this.selectedattributeCodeValue, 0);
    this.ngSelectattributeCode.ngOnInit();

    this.ngSelectprivilegeCategoryName.deselectItem(this.selectedprivilegeCategoryNameValue, 0);
    this.ngSelectprivilegeCategoryName.ngOnInit();

  }
}
