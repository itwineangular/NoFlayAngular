import { Component, OnInit } from '@angular/core';
import { MembershipObject } from './membership-object';
import { MembershipServicesService } from './membership-services.service';

@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.css']
})
export class MembershipComponent implements OnInit {

  alertMassege = "";
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
    this.getMembership();
    this.pageChange(5);
  }

  addNew() {
    this.saveOrUpdate = "save";
    this.membership = new MembershipObject();
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
    // console.log(membership.value);
     this.membershipService.searchMembership(membership.value)
         .subscribe(
       (data) => {
         this.membershipList = data;
         console.log(this.membershipList);
       },
       (error) => {
         console.log(error);
         alert("Try again");
       }
     );
   }
 
   searchClear() {
     this.membership = new MembershipObject( );
     this.membershipService.searchMembership(this.membership)
       .subscribe(
         (data) => {
           this.membershipList = data;
         },
         (error) => {
           console.log( error);
           alert("Try again");
         }
       );
   }
}
