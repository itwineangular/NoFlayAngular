import { Component, OnInit } from '@angular/core';
import { MembershipObject } from './membership-object';
import { MembershipServicesService } from './membership-services.service';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.css']
})
export class MembershipComponent implements OnInit {

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
  membership: MembershipObject = new MembershipObject();
  membershipList: MembershipObject[];
  constructor(private membershipService: MembershipServicesService) { }

  ngOnInit() {
    // this.getMembership();
    this.isListContainsData = false;
    this.isSearchClicked = false;

    this.pageChange(5);
  }

  addNew() {
    this.saveOrUpdate = "save";
    this.membership = new MembershipObject();
    $('#addModal').modal({
      backdrop: 'static',
      keyboard: false
  });
  }

  selectUser(membershipData) {
    this.saveOrUpdate = "update";
    this.membership = membershipData;
  }

  saveMembership(membershipData) {

    if (this.saveOrUpdate == "save") {
      this.membershipService.saveMembership(membershipData)
        .subscribe(
          (data) => {
            this.alertMassege = "New item add on list successfully!!";
            this.getMembership();
          },
          (error) => {
            console.log(error);
            alert("Try again");
          }
        );

    }
    else if (this.saveOrUpdate == "update") {
      this.membershipService.updateMembership(this.membership)
        .subscribe(
          (data) => {
            this.alertMassege = "Item updated on list successfully!!";
            this.getMembership();
          },
          (error) => {
            console.log(error);
            alert("Try again");
          }
        );

    }

  }

  getMembership() {
    this.membershipService.getMembership().subscribe(data => {
      this.membershipList = data;
    });
  }

  deleteMembership(membershipId) {
    this.membershipService.deleteMembership(membershipId).
      subscribe(data => {
        this.alertMassege = "Deleted successfully!!";
        this.getMembership();
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


  searchMembership(membership) {
    if (typeof membership.value.memberName != "undefined") {
      this.isSearchClicked=true;
      if(membership.value.memberName === null)
      {

      }
      else{
     this.membershipService.searchMembership(membership.value)
         .subscribe(
       (data) => {
        this.membershipList = data;
        if (typeof this.membershipList !== 'undefined' && this.membershipList.length > 0) {
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
     this.membership = new MembershipObject( );
    //  this.membershipService.searchMembership(this.membership)
    //    .subscribe(
    //      (data) => {
    //        this.membershipList = data;
    //      },
    //      (error) => {
    //        console.log( error);
    //        alert("Try again");
    //      }
    //    );
   }
}
