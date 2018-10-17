import { Component, OnInit } from '@angular/core';
import { BusinessCategoryServicesService } from './business-category-services.service';
import { BusinessCategory } from "./business-category";

declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-bisuness-category',
  templateUrl: './bisuness-category.component.html',
  styleUrls: ['./bisuness-category.component.css']
})
export class BisunessCategoryComponent implements OnInit {

  alertMassege = "";
  isListContainsData: boolean;
  isSearchClicked: boolean;
  caseInsensitive: boolean = true;

  saveOrUpdate: string;
  key: string ;
  reverse: boolean = false;
  pagenumber : string ;
  p: number = 1;
  itemsPerPage2: number = 1;

  businesscategory: BusinessCategory = new BusinessCategory();
  businesscategoryList: BusinessCategory[];

  constructor(private service: BusinessCategoryServicesService) { }

  ngOnInit() {
    // this.getBusinessCategory();
    this.isListContainsData = false;
    this.isSearchClicked= false;


    this.pageChange(5);
  }
  selectUser(item) {
    this.saveOrUpdate = "update";
    this.businesscategory = item;
  }

  addNew() {
    this.saveOrUpdate = "save";
    this.businesscategory = new BusinessCategory();
    $('#addModal').modal({
      backdrop: 'static',
      keyboard: false
  });
  }

  saveBusinessCategory(businessValue) {
    if (this.saveOrUpdate == "save") {
      console.log("save");
      this.service.saveBusinessCategory(businessValue)
        .subscribe(
          (data) => {
            this.alertMassege = "New item add on list successfully!!";
            this.getBusinessCategory();
          },
          (error) => {
            console.log(error);
            alert("Try again");
          }
        );

    }
    else if (this.saveOrUpdate == "update") {
      console.log("update");
      this.service.updateBusinessCategory(this.businesscategory)
        .subscribe(
          (data) => {
            this.alertMassege = "Item updated on list successfully!!";
            this.getBusinessCategory();
          },
          (error) => {
            console.log(error);
            alert("Try again");
          }
        );
    }
  }
  getBusinessCategory() {
    this.service.getBusinessCategory()
      .subscribe(
        (data) => {
          this.businesscategoryList = data;
        }
      );

  }

  clickedAlert = function () {
    this.alertMassege = "";
  };

  deleteBusinessCategory(businessCategoryId) {
    this.service.deleteBusinessCategory(businessCategoryId).subscribe(data => {
      this.alertMassege = "Deleted successfully!!";
      this.getBusinessCategory();
    });
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


  searchBusinessCategory(businesscategoryParameters)  {
    if (typeof businesscategoryParameters.value.businessCategoryName != "undefined"
      || typeof businesscategoryParameters.value.businessCategoryCode != "undefined")  {
        this.isSearchClicked=true;
        if(businesscategoryParameters.value.businessCategoryName === null
        || businesscategoryParameters.value.businessCategoryCode=== null)
        {

        }
        else{

    this.service.searchBusinessCategory(businesscategoryParameters.value)
        .subscribe(
      (data) => {
        this.businesscategoryList = data;
        if (typeof this.businesscategoryList !== 'undefined' && this.businesscategoryList.length > 0) {
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
      this.businesscategory = new BusinessCategory();
    //   this.service.searchBusinessCategory(this.businesscategory)
    //     .subscribe(
    //       (data) => {
    //         this.businesscategoryList = data;
    //       },
    //       (error) => {
    //         console.log(error);
    //         alert("Try again");
    //       }
    //     );
    // }
}

  
  

  }