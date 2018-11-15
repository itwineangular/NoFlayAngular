import { Component, OnInit } from '@angular/core';
import { Status } from './status';
import {StatusService} from './status.service'
import { ViewChild } from '@angular/core'
import { SelectDropDownComponent } from "ngx-select-dropdown";

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  alertMassege = "";
  isListContainsData: boolean;
  isSearchClicked: boolean;
  caseInsensitive: boolean = true;
  saveOrUpdate: string;
  key: string;
  reverse: boolean = false;
  pagenumber : string ;
  p: number = 1;
  itemsPerPage2: number = 1;
  status: Status = new Status();
  statusList: Status[]=[];
  statusListLocal: Status[] = [];
  // status: Status= new Status();
  // statusList : Status[];

  @ViewChild('chosenuser') public ngSelect: SelectDropDownComponent;

  constructor(private statusService :StatusService ) { }

  ngOnInit() {
    this.getStatus();
    this.isListContainsData = false;
    this.isSearchClicked = false;

    this.pageChange(5);
   
  }

  statusForm;
  selectedValue : any = [];
  config = {
    displayKey: "status", //if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: 10
  };

  addNew() {
    this.saveOrUpdate = "save";
    this.status = new Status();
    $('#addModal').modal({
      backdrop: 'static',
      keyboard: false
  });
  }

  selectUser(statusData) {
    this.saveOrUpdate = "update";
    this.status = statusData;
  }

  saveStatus(statusData) {

    if (this.saveOrUpdate == "save") {
      this.statusService.saveStatus(statusData)
        .subscribe(
          (data) => {
            this.alertMassege = "New item add on list successfully!!";
            this.getStatus();
          },
          (error) => {
            console.log(error);
            alert("Try again");
          }
        );

    }
    else if (this.saveOrUpdate == "update") {
      console.log("sajgd");
      console.log(this.status);
      this.statusService.updateStatus(this.status)
        .subscribe(
          (data) => {
            this.alertMassege = "Item updated on list successfully!!";
            this.getStatus();
          },
          (error) => {
            console.log(error);
            alert("Try again");
          }
        );

    }

  }

  getStatus() {
    this.statusService.getStatus()
      .subscribe(
        (data) => {
          this.statusList = data;
          this.statusListLocal = data;
          console.log( this.statusList);
        }
      );

  }

  deleteStatus(statusId) {
    this.statusService.deleteStatus(statusId).
      subscribe(data => {
        this.alertMassege = "Deleted successfully!!";
        this.getStatus();
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


  searchStatus(status)
  {
    this.isListContainsData = true;
    this.statusList = this.selectedValue;
  }


   searchClear() {
     this.status = new Status( );
     this.ngSelect.deselectItem(this.selectedValue,0);
     this.ngSelect.ngOnInit();
   }

}
