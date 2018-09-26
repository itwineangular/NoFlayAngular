import { Component, OnInit } from '@angular/core';
import { PlanName } from "./plan-name";
import { PlanNameServicesService } from "./plan-name-services.service";

@Component({
  selector: 'app-plan-name',
  templateUrl: './plan-name.component.html',
  styleUrls: ['./plan-name.component.css']
})
export class PlanNameComponent implements OnInit {

  alertMassege = "";
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
    this.getplanName();
    this.pageChange(5);
  }

  addNew() {
    this.saveOrUpdate = "save";
    this.planName = new PlanName();
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
    // console.log(planNameParameters.value);
     this.planNameService.searchPlanName(planNameParameters.value)
         .subscribe(
       (data) => {
         this.planNameList = data;
         console.log(this.planNameList);
       },
       (error) => {
         console.log(error);
         alert("Try again");
       }
     );
   }
 
   searchClear() {
     this.planName = new PlanName( );
     this.planNameService.searchPlanName(this.planName)
       .subscribe(
         (data) => {
           this.planNameList = data;
         },
         (error) => {
           console.log( error);
           alert("Try again");
         }
       );
   }
}
