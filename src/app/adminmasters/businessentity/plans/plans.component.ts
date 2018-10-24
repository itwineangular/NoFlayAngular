import { Component, OnInit } from '@angular/core';
import { PlansObject, MembershipObject, PlanNameObject } from "./plans-object";
import { PlanService } from './plans.service';
import { BusinessCategory } from "../bisuness-category/business-category";
import { DatepickerOptions, NgDatepickerModule, NgDatepickerComponent } from 'ng2-datepicker';
import * as frLocale from 'date-fns/locale/fr';
import * as enLocale from 'date-fns/locale/en';
import {IMyDpOptions} from 'mydatepicker';

import Swal from 'sweetalert2';
import { ViewChild } from '@angular/core';
import { SelectDropDownComponent } from "ngx-select-dropdown";
// import { IMyDpOptions } from 'mydatepicker';
// import {MatDatepickerModule} from '@angular/material/datepicker';

// import { BusinessCategoryServicesService } from '../bisuness-category/business-category-services.service';

declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {
  startDate = new Date(1990, 0, 1);
  alertMassege = "";
  isListContainsData: boolean;
  isSearchClicked: boolean;
  caseInsensitive: boolean = true;

  plan: PlansObject = new PlansObject();
  planList: PlansObject[];
  planListLocal: PlansObject[] = [];
  membershipList: MembershipObject[];
  planNameList: PlanNameObject[];
  key: string;
  reverse: boolean = false;
  pagenumber : string ;
  p: number = 1;
  itemsPerPage2: number = 1;

  addOrEdit: string;

  d = new Date();

  options: DatepickerOptions = {
    locale: enLocale,
    minDate: new Date(this.d.setDate(this.d.getDate() - 1))
    // minDate:new Date(Date.now())

  };
  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'yyyy-mm-dd',
    disableUntil: {year: this.d.getFullYear(), month: this.d.getMonth()+1, day: this.d.getDate()}
};

public myDatePickerOptions2: IMyDpOptions = {
  // other options...
  dateFormat: 'yyyy-mm-dd',
};

  enableaddpopup: boolean;

  // public myDatePickerOptions: IMyDpOptions = {
  //   dateFormat: 'dd-mm-yyyy',
  //   editableDateField: false
  // };

  @ViewChild('planName') public ngSelectplanName: SelectDropDownComponent;
  @ViewChild('planMembership') public ngSelectplanMembership: SelectDropDownComponent;
  constructor(private service: PlanService) { }

  ngOnInit() {
    this.getPlan();
    this.isListContainsData = false;
    this.isSearchClicked = false;

    this.getMembership();
    this.getPlanName();
    //this.getBusinessCategory();
    this.enableaddpopup = false;
    this.pageChange(5);

  }

  selectedValue : any;
  config = {
    displayKey: "planName", //if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: this.planListLocal.length
    // limitTo: 10
  };
  changeValue($event: any) {
    console.log(this.selectedValue)
    
    this.ngSelectplanMembership.value=this.selectedValue;
    this.ngSelectplanMembership.ngOnInit();
  }
  // changeValue($event: any) {
  //   this.isListContainsData = true;
  //   this.planList = this.selectedValue;
  // }

  selectedplanMembershipValue : any;
  planMembershipconfig = {
    displayKey: "planMembership", //if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: this.planListLocal.length
    // limitTo: 10
  };
  // planMembershipchangeValue($event: any) {
  //   this.isListContainsData = true;
  //   this.planList = this.selectedplanMembershipValue;
  // }

  addNew() {
    this.plan = new PlansObject();
    this.enableaddpopup = true;
    this.addOrEdit = "add";
    $('#addModal').modal({
      backdrop: 'static',
      keyboard: false
  });
  }

  savePlans(planValue) {

    if (this.addOrEdit == "add") {
      this.service.saveplans(planValue)
        .subscribe(
          (data) => {
           this.alertMassege = "New item add on list successfully!!";
           this.plan = new PlansObject();
            this.getPlan();
          },
          (error) => {
            console.log(error);
            alert("Try again");
          }
        );

    }
    else if (this.addOrEdit == "edit") {
      this.service.updatePlan(this.plan)
        .subscribe(
          (data) => {
            this.alertMassege = "Item updated on list successfully!!";

            this.getPlan();
          },
          (error) => {
            console.log(error);
            alert("Try again");
          }
        );

    }



  }

  deletePlan(planId) {
    // console.log(attributeId);
    this.service.deletePlan(planId).subscribe(data => {
      this.alertMassege = "Deleted successfully!!";
      this.getPlan();
    });
  }


  clickedAlert = function () {
    this.alertMassege = "";
  };


  selectUser(item, date) {
    var d = new Date(date).setHours(0, 0, 0, 0);;

    // var newdate = d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear();
    var datenow = new Date().setHours(0, 0, 0, 0);;
    //var currentdate = datenow.getDate() + '/' + (datenow.getMonth()+1) + '/' + datenow.getFullYear();
    console.log("end date");
    console.log(d);
    console.log("current date");
    console.log(datenow);
    if (d < datenow) {
      this.enableaddpopup = false;
      Swal({
        title: 'Plan Expired!!',
        text: 'This plan is already expired .',
        showCancelButton: false,
        confirmButtonText: 'Ok',
      });
    } else {
      this.enableaddpopup = true;
      this.plan = item;
      this.addOrEdit = "edit";
    }


  }
  getPlan() {
    this.service.getPlan()
      .subscribe(
        (data) => {
          // this.planList = data;
          this.planListLocal = data;
          // console.log(this.planList[0].endDateTime);
          // let datyk = new Date(this.planList[0].endDateTime);
          // console.log(datyk);
        }
      );

  }

  updatePlan() {
    // console.log(this.businesscategory);
    this.service.updatePlan(this.plan)
      .subscribe(
        (data) => {
          this.alertMassege = "Item updated on list successfully!!";

          this.getPlan();
        },
        (error) => {
          console.log(error);
          alert("Try again");
        }
      );
  }


  getMembership() {
    this.service.getMembership().subscribe(data => {
      this.membershipList = data;
    });
  }

  getPlanName() {

    this.service.getPlanName().subscribe(data => {
      this.planNameList = data;
      console.log(this.planNameList);
    });
  }

  searchPlan(planParameters) {
    var planLocal: PlansObject = new PlansObject();
     this.isSearchClicked=true;
     if (typeof this.selectedValue !== 'undefined'  && this.selectedValue.length>0) 
     {
       planLocal.planName = this.selectedValue[0].planName;
     }
     if (typeof this.selectedplanMembershipValue !== 'undefined' && this.selectedplanMembershipValue.length>0) 
     {
       planLocal.planMembership = this.selectedplanMembershipValue[0].planMembership
     }
 
     if (typeof planLocal.planName === 'undefined'  && typeof planLocal.planMembership === 'undefined') 
     {
       Swal({
         title: 'Invalid!!',
         text: 'Atleast enter any one field.',
         showCancelButton: false,
         confirmButtonText: 'Ok',
       });
       this.isListContainsData = false;
       this.planList=[];
      
     }
     else
     {
       this.service.searchPlan(planLocal)
       .subscribe(
         (data) => {
           this.planList = data;
           if (typeof this.planList !== 'undefined' && this.planList.length > 0) {
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
     this.plan = new PlansObject();
     this.ngSelectplanName.deselectItem(this.selectedValue,0);
     this.ngSelectplanName.ngOnInit();
 
     this.ngSelectplanMembership.deselectItem(this.selectedplanMembershipValue,0);
     this.ngSelectplanMembership.ngOnInit();
     
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

}
