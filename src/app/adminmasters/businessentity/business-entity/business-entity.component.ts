import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BusinessEntity } from './business-entity';
import { BusinessEntityService } from './business-entity.service';

import { CommonServicesService } from "../../../common-services.service";
import { BusinessCategoryServicesService } from '../bisuness-category/business-category-services.service';
import { BusinessCategory } from "../bisuness-category/business-category";

import { AttributeService } from "../attribute/attribute.service";
import { Attribute } from "../attribute/attribute";
import * as $ from 'jquery';

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

  attributeList: Attribute[];

  constructor(private service: BusinessEntityService,
    private commonService: CommonServicesService,
    private businessCategoryService: BusinessCategoryServicesService,
    private attributeService: AttributeService
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
selectCheckbox(id){
  if($('#'+id).prop('checked')){    
    this.checkboxActivated = true;
  }else{
    this.checkboxActivated = false;
  }

}


  addNew() {
    this.saveOrUpdate = "save";
    this.business= new BusinessEntity();
  }

  saveBusinessEntity(data) {
    if (this.saveOrUpdate == "save") {
      this.service.saveBusinessEntity(data)
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
       
        this.service.updateBusinessEntity(this.business)
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
      this.businessEntityList = data;
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
    if (typeof businessParameters.value.name != "undefined"
      || typeof businessParameters.value.registrationCode != "undefined"){
        this.isSearchClicked=true;
        if(businessParameters.value.name === null
        || businessParameters.value.registrationCode === null)
        {

        }
        else {
    this.service.searchBusinessEntity(businessParameters.value)
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

}

  searchClear() {
    this.business = new BusinessEntity();
    // this.service.searchBusinessEntity(this.business)
    //   .subscribe(
    //     (data) => {
    //       this.businessEntityList = data;
    //     },
    //     (error) => {
    //       console.log(error);
    //       alert("Try again");
    //     }
    //   );
  }
}
