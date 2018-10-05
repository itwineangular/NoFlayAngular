import { Component, OnInit } from '@angular/core';
import { AttributeService } from './attribute.service';
import { Attribute } from "../attribute/attribute";
import { BusinessCategory } from "../bisuness-category/business-category";
import { BusinessCategoryServicesService } from '../bisuness-category/business-category-services.service';


@Component({
  selector: 'app-attribute',
  templateUrl: './attribute.component.html',
  styleUrls: ['./attribute.component.css']
})
export class AttributeComponent implements OnInit {
  alertMassege = "";
  isListContainsData: boolean;
  isSearchClicked: boolean;
  caseInsensitive: boolean = true;

  saveOrUpdate: string;
  pagenumber: string;
  p: number = 1;
  itemsPerPage2: number = 1;
  // key: string = 'attributeId';
  key: string;
  reverse: boolean = false;

  attribute: Attribute = new Attribute();
  attributeList: Attribute[];
  businessCategoryList: BusinessCategory[];

  constructor(private service: AttributeService,
    private BusinessCategoryServicesService: BusinessCategoryServicesService) { }

  ngOnInit() {
    // this.getAttribute();
    this.isListContainsData = false;
    this.isSearchClicked = false;

    this.getBusinessCategory();
    this.pageChange(5);
  }
  addNew() {
    this.saveOrUpdate = "save";
    this.attribute = new Attribute();
  }

  saveAttribute(attributeValue) {
    if (this.saveOrUpdate == "save") {
      console.log("save");
      this.service.saveattribute(attributeValue)
        .subscribe(
          (data) => {
            this.alertMassege = "New item add on list successfully!!";
            this.getAttribute();
          },
          (error) => {
            console.log(error);
            alert("Try again");
          }
        );

    }
    else if (this.saveOrUpdate == "update") {
      console.log("update");
      this.service.updateAttribute(this.attribute)
        .subscribe(
          (data) => {
            this.alertMassege = "Item updated on list successfully!!";

            this.getAttribute();
          },
          (error) => {
            console.log(error);
            alert("Try again");
          }
        );

    }


  }

  deleteAttribute(attributeId) {
    this.service.deleteAttribute(attributeId).subscribe(data => {
      this.alertMassege = "Deleted successfully!!";
      this.getAttribute();
    });
  }


  clickedAlert = function () {
    this.alertMassege = "";
  };


  selectUser(item) {
    this.saveOrUpdate = "update";
    this.attribute = item;
  }
  getAttribute() {
    this.service.getAttribute()
      .subscribe(
        (data) => {
          this.attributeList = data;
        }
      );

  }


  getBusinessCategory() {
    this.BusinessCategoryServicesService.getBusinessCategory().subscribe(data => {
      this.businessCategoryList = data;
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
  searchAttribute(attributeParameters) {
    
    if (typeof attributeParameters.value.attributeName != "undefined"
      || typeof attributeParameters.value.attributeCode != "undefined"
      || typeof attributeParameters.value.businessCatCode != "undefined") {
      this.isSearchClicked = true;
      if (attributeParameters.value.attributeName === null
        || attributeParameters.value.attributeCode === null
        || attributeParameters.value.businessCatCode === null) {

      }
      else {

        this.service.searchAttribute(attributeParameters.value)
          .subscribe(
            (data) => {
              this.attributeList = data;
              if (typeof this.attributeList !== 'undefined' && this.attributeList.length > 0) {
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
    this.attribute = new Attribute();
    // this.service.searchAttribute(this.attribute)
    //   .subscribe(
    //     (data) => {
    //       this.attributeList = data;
    //     },
    //     (error) => {
    //       console.log(error);
    //       alert("Try again");
    //     }
    //   );
  }
}
