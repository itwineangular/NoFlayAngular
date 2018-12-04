import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BusinessEntity } from './business-entity';
import { BusinessEntityService } from './business-entity.service';

import { CommonServicesService } from "../../../common-services.service";
import { BusinessCategoryServicesService } from '../bisuness-category/business-category-services.service';
import { BusinessCategory } from "../bisuness-category/business-category";

import { AttributeService } from "../attribute/attribute.service";
import { Attribute } from "../attribute/attribute";
import {PrivilegeCategory} from "../privilegecategory/privilegecategory";
import  {PrivilegecategoryService} from "../privilegecategory/privilegecategory.service"

// import * as $ from 'jquery';

import Swal from 'sweetalert2';
import { ViewChild } from '@angular/core';
import { SelectDropDownComponent } from "ngx-select-dropdown";

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-business-entity',
  templateUrl: './business-entity.component.html',
  styleUrls: ['./business-entity.component.css']
})
export class BusinessEntityComponent implements OnInit {

  alertMassege = "";
  isListContainsData: boolean;
  isSearchClicked: boolean;
  caseInsensitive: boolean = true;
  countries = [];
  statesLocal = [];
  citiesLocal = [];
  states = [];
  cities = [];
  key: string;
  reverse: boolean = false;
  pagenumber : string ;
  p: number = 1;
  itemsPerPage2: number = 1;
  business: BusinessEntity = new BusinessEntity();
  saveOrUpdate: string;
  checkboxActivated:boolean = false;

  businessEntityList: BusinessEntity[];
  businessCategoryList: BusinessCategory[];
  businessEntityListLocal: BusinessEntity[]= [];

  attributeList: Attribute[];
  privilegeList: PrivilegeCategory[] = [];

  public editisPrivilegeId = false;
  selectedPrivilegeCategoryList: number[] = [];
  attributeListLocal: Attribute[] = [];
  selectedAttributeList: Attribute[] = [];
  serviceListLocal: Attribute[] = [];
  selectedCourseListGlobal: Attribute[] = [];

  @ViewChild('businessName') public ngSelectbusinessName: SelectDropDownComponent;
  @ViewChild('registrationNumber') public ngSelectregistrationNumber: SelectDropDownComponent;

  constructor(private service: BusinessEntityService,
    private commonService: CommonServicesService,
    private businessCategoryService: BusinessCategoryServicesService,
    private attributeService: AttributeService,
    private privilegecategoryService: PrivilegecategoryService
  ) { }

  ngOnInit() {
    this.getCountries();
    this.getStates();
    this.getCities();
    this.getBusinessEntity();
    this.getBusinessCategory();
    this.isListContainsData = false;
    this.isSearchClicked=false;

    this.getAttribute();
    this.pageChange(5);
    this.getPrivilegeCategory();

    $('.btnNext').click(function(){
      $('.nav-tabs > .active').next('li').find('a').trigger('click');
      });
      
      $('.btnPrevious').click(function(){
      $('.nav-tabs > .active').prev('li').find('a').trigger('click');
      });
  }

  activeChange(value){
    if(value == "first"){
        $('#test1').removeClass("active");
        $('#test2').addClass("active");
        $('#test3').removeClass("active");
        $('#test4').removeClass("active");
        $('#test1 > a').removeClass('disableTab');
        $('#test1 > a').addClass('enableTab');
    }else if(value == "second"){
        $('#test1').removeClass("active");
        $('#test2').removeClass("active");
        $('#test3').addClass("active");
        $('#test4').removeClass("active");
        $('#test2 > a').removeClass('disableTab');
        $('#test2 > a').addClass('enableTab');

    }else if(value == "third"){
        $('#test1').removeClass("active");
        $('#test2').removeClass("active");
        $('#test3').removeClass("active");
        $('#test4').addClass("active");
        $('#test3 > a').removeClass('disableTab');
        $('#test3 > a').addClass('enableTab');
    }
    
}
activeChangePrevious(value){
    if(value == "second"){
        $('#test1').addClass("active");
        $('#test2').removeClass("active");
        $('#test3').removeClass("active");
        $('#test4').removeClass("active");
    }else if(value == "third"){
        $('#test1').removeClass("active");
        $('#test2').addClass("active");
        $('#test3').removeClass("active");
        $('#test4').removeClass("active");

    }else if(value == "fourth"){
        $('#test1').removeClass("active");
        $('#test2').removeClass("active");
        $('#test3').addClass("active");
        $('#test4').removeClass("active");

    }

}

  addNew() {
    this.saveOrUpdate = "save";
    this.business= new BusinessEntity();
  }

  selectedValue : any;
  config = {
    displayKey: "name", //if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: this.businessEntityListLocal.length
    // limitTo: 10
  };
  changeValue($event: any) {
    console.log(this.selectedValue)
    
    this.ngSelectregistrationNumber.value=this.selectedValue;
    this.ngSelectregistrationNumber.ngOnInit();
  }
  // changeValue($event: any) {
  //   this.isListContainsData = true;
  //   this.businessEntityList = this.selectedValue;
  // }

  selectedregistrationNumberValue : any;
  registrationNumberconfig = {
    displayKey: "registrationCode", //if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: this.businessEntityListLocal.length
    // limitTo: 10
  };
  // registrationNumberChangeValue($event: any) {
  //   console.log(this.selectedregistrationNumberValue);
  //   this.isListContainsData = true;
  //   this.businessEntityList = this.selectedregistrationNumberValue;
  // }

  saveBusinessEntity(data) {
    if (this.saveOrUpdate == "save") {
      this.service.saveBusinessEntity(data, this.selectedPrivilegeCategoryList, this.selectedAttributeList)
      .subscribe(
        (data) => {
          this.alertMassege = "New item add on list successfully!!";         
          this.getBusinessEntity();
        },
        (error) => {
          console.log(error);
          alert("Try again");
        }
      );

    }
    else if (this.saveOrUpdate == "update") {
       
        this.service.updateBusinessEntity(this.business, this.selectedPrivilegeCategoryList, this.selectedAttributeList)
      .subscribe(
        (data) => {
          this.alertMassege = "Item updated on list successfully!!";
          this.getBusinessEntity();
        },
        (error) => {
          console.log(error);
          alert("Try again");
        }
      );

    }
}
  // saveBusinessEntity(data) {
  //   //  console.log(data);
  //   this.service.saveBusinessEntity(data)
  //     .subscribe(
  //       (data) => {
  //         this.alertMassege = "New item add on list successfully!!";
  //         // if(form!=null)
  //         // form.reset();
  //         // this.courseCategory=null;
  //         this.getBusinessEntity();
  //       },
  //       (error) => {
  //         console.log(error);
  //         alert("Try again");
  //       }
  //     );
  // }

  // countries = [
  //   new country(1, 'USA' ),
  //   new country(2, 'India' ),
  //   new country(3, 'Australia' ),
  //   new country(4, 'Brazil')
  // ];

  // statesLocal = [
  //   new state(1,"Karnataka",2),
  //   new state(2,"Goa",2),
  //   new state(3,"California",1),
  //   new state(4,"Queensland",3),
  //   new state(5,"Bahia",4)
  // ];

  // citiesLocal = [
  //   new city(1,"Bangalore",1),
  //   new city(2,"Mysore",1),
  //   new city(3,"Panaji",2),
  //   new city(4,"San Francisco",3),
  //   new city(5,"Gold Coast",4),
  //   new city(5,"Porto",5)
  // ];

  // states = [];
  // cities=[];
  // onSelect(countryid) {
  //   this.states= this.statesLocal.filter((item)=> item.countryId == countryid);
  //   this.cities=[];
  // }

  // onStateSelect(stateid) {
  //   this.cities= this.citiesLocal.filter((item)=> item.stateId == stateid);
  // }



  getBusinessEntity() {
    this.service.getBusinessEntity().subscribe(data => {
      // this.businessEntityList = data;
      this.businessEntityListLocal = data;
    });
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

  onSelect(countryid) {
    this.states = this.statesLocal.filter((item) => item.countryCode == countryid);
    this.cities = [];
  }

  onStateSelect(stateid) {
    this.cities = this.citiesLocal.filter((item) => item.stateCode == stateid);
  }


  selectUser(item) {
    this.saveOrUpdate = "update";
    this.business = item;
    this.onSelect(this.business.country);
    this.onStateSelect(this.business.state);


    console.log(item);
    this.selectedPrivilegeCategoryList = [];
    if (item.privilegeVos.length > 0)
    {
      item.privilegeVos.forEach(element => {
        this.selectedPrivilegeCategoryList.push(element.privilegeId);
        var data = this.privilegeList.filter(x => x.privilegeId == element.privilegeId);
        data[0].isSelected = true;
        var list = this.privilegeList.filter(x => x.privilegeId != element.privilegeId);
        list.push(data[0]);
        this.privilegeList = list;
      });
    }

    this.privilegeList = Array.from(new Set(this.privilegeList));

    item.privilegeVos.forEach(element => {
      this.attributeList.forEach(element2 => {
        element2.privilegeVos.forEach(element3 => {
          if(element3.privilegeId == element.privilegeId){
            this.attributeListLocal.push(element2);
          }
        });
      });
    });

    this.attributeListLocal = Array.from(new Set(this.attributeListLocal));
    this.selectedAttributeList = []
    item.privilegeVos.forEach(element => {
      element.attributeVos.forEach(element => {
        var listOfAttribute = this.attributeListLocal.filter(x=>x.attributeId != element.attributeId);
        var selectListOfAttribute = this.attributeListLocal.filter(x=>x.attributeId == element.attributeId);
        if(selectListOfAttribute.length>0)
        {
          selectListOfAttribute[0].isSelected = true;
          listOfAttribute.push(selectListOfAttribute[0]);
          this.selectedAttributeList.push(selectListOfAttribute[0]);
        }
        this.attributeListLocal = listOfAttribute;
      });
    });

    this.attributeListLocal = Array.from(new Set(this.attributeListLocal));
    this.selectedAttributeList = Array.from(new Set(this.selectedAttributeList));

  }

  clickedAlert = function () {
    this.alertMassege = "";
  };


  deleteBusinessEntity(businessId) {
    // console.log(businessId);
    this.service.deleteBusinessEntity(businessId).
      subscribe(data => {
        this.alertMassege = "Deleted successfully!!";
        this.getBusinessEntity();
      });
  }

  // updateBusinessEntity() {
  //   console.log(this.business);
  //   this.service.updateBusinessEntity(this.business)
  //     .subscribe(
  //       (data) => {
  //         this.alertMassege = "Item updated on list successfully!!";

  //         this.getBusinessEntity();
  //       },
  //       (error) => {
  //         console.log(error);
  //         alert("Try again");
  //       }
  //     );
  // }

  getBusinessCategory() {
    this.businessCategoryService.getBusinessCategory().subscribe(data => {
      this.businessCategoryList = data;
      console.log(this.businessCategoryList);
    });
  }

  getAttribute() {
    this.attributeService.getAttribute()
      .subscribe(
        (data) => {
          this.attributeList = data;
          // console.log(this.attributeList);
        }
      );

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


  searchBusinessEntity(businessParameters) {
    var businessLocal: BusinessEntity = new BusinessEntity();
     // var businessLocal: businessEntity = new BusinessEntity();
     this.isSearchClicked=true;
     // courseCategoryLocal.status = businessParameters.status;
     if (typeof this.selectedValue !== 'undefined'  && this.selectedValue.length>0) 
     {
       businessLocal.name = this.selectedValue[0].name;
     }
     if (typeof this.selectedregistrationNumberValue !== 'undefined' && this.selectedregistrationNumberValue.length>0) 
     {
       businessLocal.registrationCode = this.selectedregistrationNumberValue[0].registrationCode
     }
 
     if (typeof businessLocal.name === 'undefined'  && typeof businessLocal.registrationCode === 'undefined') 
     {
       Swal({
         title: 'Invalid!!',
         text: 'Atleast enter any one field.',
         showCancelButton: false,
         confirmButtonText: 'Ok',
       });
       this.isListContainsData = false;
       this.businessEntityList=[];
      
     }
     else
     {
       this.service.searchBusinessEntity(businessLocal)
       .subscribe(
         (data) => {
           this.businessEntityList = data;
           if (typeof this.businessEntityList !== 'undefined' && this.businessEntityList.length > 0) {
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
    this.business = new BusinessEntity();
    this.ngSelectbusinessName.deselectItem(this.selectedValue,0);
    this.ngSelectbusinessName.ngOnInit();

    this.ngSelectregistrationNumber.deselectItem(this.selectedregistrationNumberValue,0);
    this.ngSelectregistrationNumber.ngOnInit();
    
  }

  getPrivilegeCategory() {
    this.privilegecategoryService.getPrivilegeCategory().subscribe(data => {
      this.privilegeList = data;

    });
  }

  privilegeCategoryCheckboxSelect(id) {
    console.log(id);
    if (this.selectedPrivilegeCategoryList.findIndex(x => x === id) >= 0) {
      this.selectedPrivilegeCategoryList.splice(this.selectedPrivilegeCategoryList.indexOf(id), 1);
    }
    else {
      this.selectedPrivilegeCategoryList.push(id);
    }
    this.attributeListLocal = []
    this.attributeList.forEach(element => {
      element.privilegeVos.forEach(innerElement => {
        if (this.selectedPrivilegeCategoryList.findIndex(x => x === innerElement.privilegeId) >= 0) {
          this.attributeListLocal.push(element);
        }
      });
    });
    this.attributeListLocal = Array.from(new Set(this.attributeListLocal));
  }

  servicesCheckboxSelect(service) {  
    if($('#'+service.attributeId).prop('checked')){    
      this.checkboxActivated = true;
    }else{
      this.checkboxActivated = false;
    }

    if (this.selectedAttributeList.findIndex(x => x.attributeId === service.attributeId) >= 0) {
      var list = this.selectedAttributeList.filter(x => x.attributeId != service.attributeId);
      this.selectedAttributeList = list;
      console.log(this.selectedAttributeList)
    }
    else {
      this.selectedAttributeList.push(service);
      console.log(this.selectedAttributeList)
    }

  }
}
