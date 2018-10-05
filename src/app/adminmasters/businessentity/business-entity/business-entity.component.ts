import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BusinessEntity } from './business-entity';
import { BusinessEntityService } from './business-entity.service';

import { CommonServicesService } from "../../../common-services.service";
import { BusinessCategoryServicesService } from '../bisuness-category/business-category-services.service';
import { BusinessCategory } from "../bisuness-category/business-category";

import { AttributeService } from "../attribute/attribute.service";
import { Attribute } from "../attribute/attribute";

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
    // this.getBusinessCategory();
    this.isListContainsData = false;
    this.isSearchClicked=false;

    this.getAttribute();
    this.pageChange(5);
  }


  addNew() {
    this.business.name = "",
      this.business.registrationCode = "",
      this.business.businessCategoryCode = "",
      this.business.shortname = "",
      this.business.contactPerson = "",
      this.business.designation = "",
      this.business.address1 = "",
      this.business.address2 = "",
      this.business.country = "",
      this.business.state = "",
      this.business.city = "",
      this.business.pincode = "",
      this.business.mobile = "",
      this.business.phone = "",
      this.business.fax = "",
      this.business.accountHolderName = "",
      this.business.accountNumber = "",
      this.business.ifscCode = "",
      this.business.accountType = "",
      this.business.bankName = "",
      this.business.bankBranch = ""
  }

  saveBusinessEntity(data) {
    //  console.log(data);
    this.service.saveBusinessEntity(data)
      .subscribe(
        (data) => {
          this.alertMassege = "New item add on list successfully!!";
          // if(form!=null)
          // form.reset();
          // this.courseCategory=null;
          this.getBusinessEntity();
        },
        (error) => {
          console.log(error);
          alert("Try again");
        }
      );
  }

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

  updateBusinessEntity() {
    console.log(this.business);
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

  getBusinessCategory() {
    this.businessCategoryService.getBusinessCategory().subscribe(data => {
      this.businessCategoryList = data;
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
