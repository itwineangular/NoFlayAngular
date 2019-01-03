import { Component, OnInit } from '@angular/core';
import { Userroles } from './userroles';
import { UserService } from './user.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { ViewChild } from '@angular/core';
import { SelectDropDownComponent } from "ngx-select-dropdown";
import { identifierModuleUrl } from '@angular/compiler';

declare var jquery: any;
declare var $: any;


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  alertMassege = "";
  saveOrUpdate: any;
  pagenumber: string;
  p: number = 1;
  itemsPerPage2: number = 1;
  key: string;
  reverse: boolean = false;
  isSearchClicked: boolean;
  isListContainsData: boolean;

  userList: Userroles[];

  user: Userroles = new Userroles();

  searchUser: Userroles = new Userroles();

  @ViewChild('roleName') public ngSelectRoleName: SelectDropDownComponent;
  constructor(private service: UserService) { }

  ngOnInit() {
    this.getUser();
    this.pageChange(5);
    this.isSearchClicked=false;
    this.isListContainsData = false;
    this.searchUser.username = null;
  }

  addNew() {
    this.saveOrUpdate = "save";
    this.user = new Userroles();
     }

  userRoleOptions = [
    {
      "role": "Admin"
    },
    {
      "role": "Super Admin"
    }
  ]

  selectedUserRoleValue: any = null;
  userRoleSerachConfig = {
    displayKey: "role",
    search: true,
    limitTo: this.userRoleOptions.length
  };
  changeUserRoleValue($event: any) {
    console.log(this.selectedUserRoleValue);
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

  deleteUser(id) {
    console.log(id)
    this.service.deleteUser(id).subscribe(data => {
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
 if((userParameters.username == null && this.selectedUserRoleValue== null) ||
 (userParameters.username == "" && this.selectedUserRoleValue== null) ||
  (userParameters.username =="" && this.selectedUserRoleValue.length==0))
 {

    Swal({
        title: 'Invalid!!',
        text: 'Atleast enter any one field.',
        showCancelButton: false,
        confirmButtonText: 'Ok',
      });
      this.isListContainsData = false;
      this.userList = []
 }
 else
 {
     var userRolesLocal: Userroles = new Userroles();
      this.isSearchClicked = true;
                if(userParameters.username != null)
      {
        if (userParameters.username !="") {
          userRolesLocal.username = userParameters.username;
        }

      }

      if(this.selectedUserRoleValue != null)
      {
        if (this.selectedUserRoleValue.length > 0) {
          userRolesLocal.roles = this.selectedUserRoleValue[0].role;
        }

      }

     
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
    this.searchUser = new Userroles();
    this.ngSelectRoleName.deselectItem(this.selectedUserRoleValue,0);
    this.ngSelectRoleName.ngOnInit();

  }

}
