import { Component, OnInit } from '@angular/core';
import { PlanName } from "./plan-name";
import { PlanNameServicesService } from "./plan-name-services.service";

import Swal from 'sweetalert2';
import { ViewChild } from '@angular/core'
import { SelectDropDownComponent } from "ngx-select-dropdown";

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-plan-name',
  templateUrl: './plan-name.component.html',
  styleUrls: ['./plan-name.component.css']
})
export class PlanNameComponent implements OnInit {

  alertMassege = "";
  isListContainsData: boolean;
  isSearchClicked: boolean;
  caseInsensitive: boolean = true;
  saveOrUpdate: string;
  planName: PlanName = new PlanName();
  planNameList: PlanName[];
  key: string;
  reverse: boolean = false;
  pagenumber: string;
  p: number = 1;
  itemsPerPage2: number = 1;

  planNameListLocal: PlanName[];

  @ViewChild('chosenuser') public ngSelect: SelectDropDownComponent;

  constructor(private planNameService: PlanNameServicesService) { }

  ngOnInit() {
    this.getplanName();
    this.isListContainsData = false;
    this.isSearchClicked = false;
    this.pageChange(5);
  }

  planNameForm;
  selectedValue: any = [];
  config = {
    displayKey: "planName", //if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: 10
  };

  addNew() {
    this.saveOrUpdate = "save";
    this.planName = new PlanName();
    $('#addModal').modal({
      backdrop: 'static',
      keyboard: false
    });
  }

  selectUser(planNameData) {
    this.saveOrUpdate = "update";
    this.planName = planNameData;
  }

  savePlanName(planNameData) {

    if (this.saveOrUpdate == "save") {
      this.planNameService.savePlanName(planNameData)
        .subscribe(
          (data) => {
            this.alertMassege = "New item add on list successfully!!";
            this.getplanName();
          },
          (error) => {
            console.log(error);
            alert("Try again");
          }
        );

    }
    else if (this.saveOrUpdate == "update") {
      this.planNameService.updatePlanName(this.planName)
        .subscribe(
          (data) => {
            this.alertMassege = "Item updated on list successfully!!";
            this.getplanName();
          },
          (error) => {
            console.log(error);
            alert("Try again");
          }
        );

    }

  }


  getplanName() {
    this.planNameService.getplanName().subscribe(data => {
      // this.planNameList = data;
      this.planNameListLocal = data;
    });
  }

  deletePlanName(plannameId) {
    this.planNameService.deletePlanName(plannameId).
      subscribe(data => {
        this.alertMassege = "Deleted successfully!!";
        this.getplanName();
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

  searchPlanName(planName) {
    this.isListContainsData = true;
    this.planNameList = this.selectedValue;
  }

  searchClear() {
    this.planName = new PlanName();
    this.ngSelect.deselectItem(this.selectedValue, 0);
    this.ngSelect.ngOnInit();
  }

}
