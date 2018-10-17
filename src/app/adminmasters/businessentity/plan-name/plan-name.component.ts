import { Component, OnInit } from '@angular/core';
import { PlanName } from "./plan-name";
import { PlanNameServicesService } from "./plan-name-services.service";

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
  pagenumber : string ;
  p: number = 1;
  itemsPerPage2: number = 1;

  constructor(private planNameService: PlanNameServicesService) { }

  ngOnInit() {
    // this.getplanName();
    this.isListContainsData = false;
    this.isSearchClicked=false;
    this.pageChange(5);
  }

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
      this.planNameList = data;
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

  searchPlanName(planNameParameters) {
    if (typeof planNameParameters.value.planName != "undefined") {
      this.isSearchClicked=true;
      if(planNameParameters.value.planName === null)
      {
      }
      else{
     this.planNameService.searchPlanName(planNameParameters.value)
         .subscribe(
       (data) => {
        this.planNameList = data;
        if (typeof this.planNameList !== 'undefined' && this.planNameList.length > 0) {
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
    this.planName = new PlanName();
    // this.service.searchCourseCategory(this.courseCategory)
    //   .subscribe(
    //     (data) => {
    //       this.courseCategoryList = data;
    //     },
    //     (error) => {
    //       console.log(error);
    //       alert("Try again");
    //     }
    //   );
  }

}
