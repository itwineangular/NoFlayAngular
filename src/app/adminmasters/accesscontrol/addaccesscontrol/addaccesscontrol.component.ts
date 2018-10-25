import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { SelectDropDownComponent } from "ngx-select-dropdown";

@Component({
  selector: 'app-addaccesscontrol',
  templateUrl: './addaccesscontrol.component.html',
  styleUrls: ['./addaccesscontrol.component.css']
})
export class AddaccesscontrolComponent implements OnInit {

  name : string;
  models = ["Email Template","Initial Configuration","Access Control","Course Categories","Courses", "Educational Institutions", "Students" ,
  "Business Categories", "Business Entities", "Attributes", "Subscription Type","Plan Names", "Plans", "Membership Card"] ; 
  
  modelsTable :any;

  constructor() { }

  ngOnInit() {
    this.modelsTable  = document.getElementById('modelsTable');
    this.modelsTable.style.display = 'none';
  }

  options = [
    {
      "name": "Super Admin"
    },
    {
      "name": "Admin"
    }];

  selectedValue: any;
  config = {
    displayKey: "name",
    search: true,
    limitTo: 3
  };
  changeValue($event: any) {
    if(this.selectedValue.length>0)
    this.modelsTable.style.display = 'block';
    else
    this.modelsTable.style.display = 'none';

  }
}
