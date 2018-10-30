import { Component, OnInit } from '@angular/core';
import {Userroles} from './userroles';
import {UserService} from './user.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { ViewChild } from '@angular/core';
import { SelectDropDownComponent } from "ngx-select-dropdown";

declare var jquery: any;
declare var $: any;


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  alertMassege = "";
  saveOrUpdate:any; 
  pagenumber: string;
  p: number = 1;
  itemsPerPage2: number = 1;
  key: string;
  reverse: boolean = false;
  isSearchClicked: boolean;
  isListContainsData: boolean;

  userList: Userroles[];

  user:Userroles =new Userroles();
  constructor(private service:UserService) { }

  ngOnInit() {
    this.getUser();
    this.pageChange(5);
  }

  addNew() {
    this.saveOrUpdate = "save";
    this.user = new Userroles();
  //   $('#addModal').modal({
  //     backdrop: 'static',
  //     keyboard: false
  // });
  }

  clickedAlert = function () {
    this.alertMassege = "";
  };

  selectedUser(user) {
    this.saveOrUpdate = "update";
    this.user = user;
  }

  saveUser(form: NgForm) {
   
    if (this.saveOrUpdate == "save") {
      console.log("save");
      this.service.saveUser(form.value)
        .subscribe(
          (data) => {
            this.alertMassege = "New item add on list successfully!!";
            this.getUser();
          },
          (error) => {
            console.log(error);
            alert("Try again");
          }
        );

    }
    else if (this.saveOrUpdate == "update") {
      console.log("update");
      this.service.updateUser(this.user)
        .subscribe(
          (data) => {
            this.alertMassege = "Item updated on list successfully!!";
                     },
          (error) => {
            console.log(error);
            alert("Try again");
          }
        );
    }
  }

  deleteUser(userId) {
    this.service.deleteUser(userId).subscribe(data => {
      this.alertMassege = "Deleted successfully!!";
      this.getUser();
         });
  }


  getUser() {
    this.service.getUser()
      .subscribe(
        (data) => {
          this.userList = data;
          console.log(this.userList);
        }
      );

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

  searchUserRoles(userParameters) {
    var userRolesLocal: Userroles = new Userroles();
    this.isSearchClicked=true;
    userRolesLocal.username = userParameters.username;
    userRolesLocal.roles = userParameters.roles;
    // if (typeof this.selectedValue !== 'undefined'  && this.selectedValue.length>0) 
    // {
    //   userRolesLocal.categoryName = this.selectedValue[0].categoryName;
    // }
    // if (typeof this.selectedCategoryCodeValue !== 'undefined' && this.selectedCategoryCodeValue.length>0) 
    // {
    //   userRolesLocal.categoryCode = this.selectedCategoryCodeValue[0].categoryCode
    // }

    if (typeof userRolesLocal.username === 'undefined'  && typeof userRolesLocal.roles === 'undefined') 
    {
      Swal({
        title: 'Invalid!!',
        text: 'Atleast enter any one field.',
        showCancelButton: false,
        confirmButtonText: 'Ok',
      });
      this.isListContainsData = false;
      this.userList=[];
     
    }
    else
    {
      this.service.searchUser(userRolesLocal)
      .subscribe(
        (data) => {
          this.userList = data;
          if (typeof this.userList !== 'undefined' && this.userList.length > 0) {
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
    this.user = new Userroles();
  //   this.ngSelectCategoryName.deselectItem(this.selectedValue,0);
  //   this.ngSelectCategoryName.ngOnInit();

  //   this.ngSelectCategoryCode.deselectItem(this.selectedCategoryCodeValue,0);
  //   this.ngSelectCategoryCode.ngOnInit();
  }

}
