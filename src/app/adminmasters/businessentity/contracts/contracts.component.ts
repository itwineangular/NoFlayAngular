import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { SelectDropDownComponent } from "ngx-select-dropdown";
import { BusinessCategoryServicesService } from '../bisuness-category/business-category-services.service';
import { BusinessCategory } from '../bisuness-category/business-category';
import { BusinessEntity } from '../business-entity/business-entity';
import { BusinessEntityService } from '../business-entity/business-entity.service';
import { ContractService } from "./contract.service";
import Swal from 'sweetalert2';
import { CommonServicesService } from 'src/app/common-services.service';
import { PlanService } from '../plans/plans.service';
import { Plan } from '../../browseplans/planObject';
import { Attribute } from '../attribute/attribute';
import { ContractObject } from "./contractObject";
import { PlanEntity, DiscountEntityExtended, AttributesEntityExtended, PlanEntityExtended, ContractTemplate,DiscountEntity } from "../contract-template/contarctTemplate";
import { IMyDpOptions } from 'mydatepicker';
import { ContractTemplateService } from '../contract-template/contract-template.service';
import { NgForm } from '@angular/forms';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.css']
})
export class ContractsComponent implements OnInit {

  businessCategory: BusinessCategory[] = [];
  businessEntity: BusinessEntity[] = [];
  businessEntitiesOfParent: BusinessEntity[] = [];
  businessEntityListOfSearched: BusinessEntity[];
  value:string;

  attributeList: Attribute[] = [];
  pagenumber: string;
  p: number = 1;
  itemsPerPage2: number = 1;
  key: string;
  reverse: boolean = false;

  alertMassage = "";
  isSaveClicked: boolean;
  caseInsensitive: boolean = true;
  saveOrUpdate: string;
  isSearchedClicked: boolean;
  

  countries = [];
  states = [];
  cities = [];

  date = new Date();
  isSearchClicked: boolean;
  isListContainsData: boolean;
  isContractTemplateSelected: boolean;

 // contractObjectList:ContractObject[];
  contractObject: ContractObject = new ContractObject();
  //contractTemplate: ContractTemplate[]=[];
  contractTemplateList: ContractTemplate[] = [];
  contractTemplateListLocal:ContractObject[]=[];
  courseCategory:ContractObject=new ContractObject();
  
 // contractObject : ContractObject = new ContractObject();
 contractTemplateListForTable: ContractTemplate[] = [];

  discountEntityExtended: DiscountEntityExtended[] = [];
  planMembershipList: PlanEntity[] = [];
  plans: Plan[] = [];


  @ViewChild('businessCategoryName') public ngSelectbusinessCategoryName: SelectDropDownComponent;
  @ViewChild('businessEntityName') public ngSelectbusinessEntityName: SelectDropDownComponent;
  @ViewChild('contractForm') mytemplateForm: NgForm;

  constructor(private businessCategoryServicesService: BusinessCategoryServicesService,
    private businessEntityService: BusinessEntityService,
    private commonService: CommonServicesService,
    private planService: PlanService,
    private contractService: ContractService,
    private contractTemplateService: ContractTemplateService
  ) { }


  ngOnInit() {
    this.getBusinessCategory();
    this.getBusinessEntity();
    this.getCountries();
    this.getStates();
    this.getCities();
    this.getPlan();
    this.isSearchClicked = false;
    this.isListContainsData = false;
    this.isContractTemplateSelected = false;
    this.pageChange(5);
    this.getContractTemplateFromServer();
  }

  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd',
    disableUntil: { year: this.date.getFullYear(), month: this.date.getMonth() + 1, day: this.date.getDate() }
  };
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

  selectedbusinessCategoryCodeValue: any;
  businessCategoryCodeconfig = {
    displayKey: "businessCategoryName",
    search: true,
    limitTo: this.businessCategory.length
  };

  selectedbusinessEntityCodeValue: any;
  businessEntityCodeconfig = {
    displayKey: "name",
    search: true,
    limitTo: this.businessEntity.length
  };
  selectedPrivilegeCategoryList: number[] = [];

  private businessCategoryNameChange(): void {
    this.businessEntitiesOfParent = [];
    document.getElementById("beAddress").innerHTML = "";
    if (this.selectedbusinessCategoryCodeValue.length > 0) {
      this.businessEntity.forEach(element => {
        if (element.businessCategoryCode == this.selectedbusinessCategoryCodeValue[0].businessCategoryName) {
          this.businessEntitiesOfParent.push(element);
        }
      });
    }
  }
  selectedValue : any;
  config = {
    displayKey: "categoryName", //if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: this.contractTemplateListLocal.length
  };
  changeValue($event: any) {
    if(this.selectedValue.length>0)
    {
      this.courseCategory.actInd=this.selectedValue[0].status;
    }
    else
    {
      this.courseCategory = new ContractObject();
    }
    this.ngSelectbusinessCategoryName.value=this.selectedValue;
    this.ngSelectbusinessEntityName.ngOnInit();
  }
  private businessEntityNameChange(): void {
    console.log(this.selectedbusinessEntityCodeValue);
    this.attributeList = [];
    if (this.selectedbusinessEntityCodeValue.length > 0) {
      this.selectedbusinessEntityCodeValue[0].privilegeVos.forEach(element => {
        element.attributeVos.forEach(element2 => {
          this.attributeList.push(element2);
        });
      });

      var countryListLocal;
      if (this.countries.length > 0) {
        countryListLocal = this.countries.filter(x => x.id == this.selectedbusinessEntityCodeValue[0].country);
      }

      var stateListLocal;
      if (this.states.length > 0) {
        stateListLocal = this.states.filter(x => x.id == this.selectedbusinessEntityCodeValue[0].state);
      }

      var cityListLocal;
      if (this.cities.length > 0) {
        cityListLocal = this.cities.filter(x => x.id == this.selectedbusinessEntityCodeValue[0].city);
      }

      document.getElementById("beAddress").innerHTML = this.selectedbusinessEntityCodeValue[0].address1 + '<br/>' +
        this.selectedbusinessEntityCodeValue[0].address2 + '<br/>' +
        cityListLocal[0].name + '<br/>' +
        stateListLocal[0].name + '<br/>' +
        countryListLocal[0].name + '<br/>' +
        this.selectedbusinessEntityCodeValue[0].pincode + '<br/>';
    }
    else {
      document.getElementById("beAddress").innerHTML = "";
    }
  }

  private getBusinessCategory(): void {
    this.businessCategoryServicesService.getBusinessCategory()
      .subscribe(
        (data) => {
          this.businessCategory = data;
          console.log(this.businessCategory);
        }
      );
  }

  private getBusinessEntity(): void {
    this.businessEntityService.getBusinessEntity()
      .subscribe(
        data => {
          this.businessEntity = data;
          console.log("businessEntity");
          console.log(this.businessEntity);
        }
      );
  }

  private getCountries(): void {
    this.commonService.getCountries().subscribe(data => {
      this.countries = data;
    });
  }
  getStates() {
    this.commonService.getStates().subscribe(data => {
      this.states = data;
    });
  }
  getCities() {
    this.commonService.getCities().subscribe(data => {
      this.cities = data;
    });
  }

  private searchBusinessEntity(): void {
    var contractTemplateListLocal: ContractObject=new ContractObject();
    this.isSearchedClicked=true;
    contractTemplateListLocal.actInd;
    if (typeof this.selectedbusinessEntityCodeValue !== 'undefined'  && this.selectedbusinessEntityCodeValue.length>0) 
    {
      contractTemplateListLocal.businessId = this.selectedbusinessEntityCodeValue[0].businessId;
    }
    
    if (typeof contractTemplateListLocal.businessId === 'undefined'  ) 
    {
      Swal({
        title: 'Invalid!!',
        text: 'Atleast enter any one field.',
        showCancelButton: false,
        confirmButtonText: 'Ok',
      });
      this.isListContainsData = false;
      this.contractTemplateListForTable = [];
     
    }
    else
  {
    this.contractService.searchBusinessEntity(this.selectedbusinessEntityCodeValue[0].businessId)
    .subscribe(
      (data) => {
      
        console.log(data);
        console.log("sd")
        this.contractTemplateListForTable = data;
        if (typeof this.contractTemplateListForTable !== 'undefined' && this.contractTemplateListForTable.length > 0) {
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

  private clearSearchFields(): void {
    document.getElementById("beAddress").innerHTML = "";

    this.ngSelectbusinessCategoryName.deselectItem(this.selectedbusinessCategoryCodeValue, 0);
    this.ngSelectbusinessCategoryName.ngOnInit();

    this.ngSelectbusinessEntityName.deselectItem(this.selectedbusinessEntityCodeValue, 0);
    this.ngSelectbusinessEntityName.ngOnInit();
  }

  onTemplateSelect(templateName): void {
    this.contractObject.name = templateName;
    this.addContractTemplateForEntity(templateName);
  }

  addContractTemplateForEntity(templateName: string) {
    if (this.contractTemplateList.length > 0) {
      var contractTemplateListLocal = this.contractTemplateList.filter(x => x.contractTemplateName == templateName);
      if (contractTemplateListLocal.length > 0) {
        this.addDiscountDataToSelectedTemplate(contractTemplateListLocal[0]);
      }
    }
  }

  addDiscountDataToSelectedTemplate(contractTemplate: ContractTemplate) {
    this.discountEntityExtended = [];
    this.isContractTemplateSelected = true;
    this.attributeList.forEach(element => {
      var discountEntityExtended: DiscountEntityExtended = new DiscountEntityExtended();

      var attributesEntityExtended: AttributesEntityExtended = new AttributesEntityExtended();
      attributesEntityExtended.id = element.attributeId;
      attributesEntityExtended.name = element.attributeName;

      var planEntityExtendedList: PlanEntityExtended[] = [];
      var contractTemplateLocal = contractTemplate.discountEntities.filter(x => x.attributesEntity.attributeId == element.attributeId);
      this.planMembershipList.forEach(element2 => {
        var planEntityExtended: PlanEntityExtended = new PlanEntityExtended();
        planEntityExtended.id = element2.planId;
        planEntityExtended.name = element2.planMembership;

        if (contractTemplateLocal.length > 0) {
          var planLocal = contractTemplateLocal.filter(x => x.planEntity.planId == element2.planId);
          if (planLocal.length > 0) {
            planEntityExtended.discount = planLocal[0].discount;
          }
          else {
            planEntityExtended.discount = 0.0;
          }
          }
          else {
            planEntityExtended.discount = 0.0;
          }

          planEntityExtendedList.push(planEntityExtended);
        });
        attributesEntityExtended.planEntityExtended = planEntityExtendedList;
        discountEntityExtended.attributesEntityExtended = attributesEntityExtended;
        this.discountEntityExtended.push(discountEntityExtended);
      });
      
    }

  addNewContract(): void {
    this.saveOrUpdate = "save";
    this.isContractTemplateSelected = false
    this.contractObject = new ContractObject();
    this.discountEntityExtended = [];
    $('#addModal').modal({
      backdrop: 'static',
      keyboard: false
    });

  }

  clickedAlert(): void {
    this.alertMassage = "";
  }

  selectUser(contractObject: ContractObject): void {
    console.log(contractObject);
    this.saveOrUpdate="update";
    this.contractObject = contractObject;
    this.isContractTemplateSelected = true;


    // this.contractObject.startDate.setFullYear(contractObject.startDate.)


    // this.myForm.patchValue({myDate: {
    //   date: {
    //       year: date.getFullYear(),
    //       month: date.getMonth() + 1,
    //       day: date.getDate()}
    //   }});

   // this.discountEntityExtended = contractObject.discountEntities;


  //  console.log(contractObject.discountEntities);
   var contractTemplateLocal : ContractTemplate   = new ContractTemplate();
  //this.contractTemplateLocal.discountEntities = contractObject.discountEntities;
   contractTemplateLocal.discountEntities = contractObject.discountEntities;

  // contractObject.discountEntities.forEach(element => {
  //   var discountEntityLocal : DiscountEntity = new DiscountEntity();
  //   discountEntityLocal.id = element.id;
  //   discountEntityLocal.discount = element.discount;
  //   discountEntityLocal.planEntity = element.planEntity;
  //   discountEntityLocal.attributesEntity = element.attributesEntity;
  //   contractTemplateLocal.discountEntities.push(element);
  // });

   this.addDiscountDataToSelectedTemplate(contractTemplateLocal);

  }

  selectTemplateForDeletion(contractObject: ContractObject)
  {
    this.contractObject = contractObject;
    console.log(this.contractObject);
  }


  saveContract(form: NgForm): void {

    console.log("business id")
    console.log(this.selectedbusinessEntityCodeValue[0].businessId);
    console.log(this.contractObject);
    console.log(this.discountEntityExtended);
    if (this.saveOrUpdate == "save") {
      this.contractService.saveContract(this.selectedbusinessEntityCodeValue[0].businessId, this.contractObject, this.discountEntityExtended)
        .subscribe(
          (data) => {
            console.log(data);
            this.mytemplateForm.reset();
            this.alertMassage = "New Item added Successfully!!";
          },
          (error) => {
            console.log(error);
            alert("Try again");
          }
        );
    }
    else if(this.saveOrUpdate == "update")
    {
      this.contractService.updateContract(this.selectedbusinessEntityCodeValue[0].businessId, this.contractObject, this.discountEntityExtended)
        .subscribe(
          (data) => {
            console.log(data);
            this.alertMassage = "New Item updated Successfully!!";
          },
          (error) => {
            console.log(error);
            // alert("Try again");
          }
        );
    }
  }

  private getPlan(): void {
    this.planService.getPlan()
      .subscribe(
        (data) => {
          var dataLocal = Array.from(new Set(data.map(x => x.planName)));
          var filteredData: any[] = [];
          dataLocal.forEach(element => {
            var dummy = data.filter(x => x.planName == element);
            if (dummy.length > 0) {
              filteredData.push(dummy[0]);
            }
          });
          filteredData.forEach(element => {
            var object: Plan = new Plan();
            var localData = data.filter(x => x.planName == element.planName);
            object = element;
            object.planMembershipsArray = localData;
            this.plans.push(object);
          });

          this.plans.forEach(element => {
            element.planMembershipsArray.forEach(element2 => {
              this.planMembershipList.push(element2);
            });
          });
        }
      );
  }

  getContractTemplateFromServer(): void {
    this.contractTemplateService.getContractTemplate()
      .subscribe(
        (data) => {
          this.contractTemplateList = data;
          console.log(this.contractTemplateList);
        }
      );
  }
  deleteContractTemplate(id) {
    console.log(id);
    this.contractService.deleteContractTemplate(id).subscribe(
      (data) => {
        console.log(data);
        console.log("data");
        this.alertMassage = "Deleted successfully!!";
         
       console.log(this.contractTemplateListForTable);

        this.contractTemplateListForTable = this.contractTemplateListForTable.filter(x=>x.id !== id);
        // this.getContractTemplateFromServer();
        // var contractTemplateListLocal = this.contractObjectList.filter(x=>x.id!==id);
        // this.contractObjectList=contractTemplateListLocal;
      },
      (error) => {
         alert("You can't delete this data");
      });
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  setTwoNumberDecimal(event) {
    this.value = parseFloat(this.value).toFixed(2);
  }
   myCtrl($scope) {
    $scope.myDecimal = 0;
  }


}
