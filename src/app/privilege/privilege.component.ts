import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ViewChild } from '@angular/core';
import { SelectDropDownComponent } from "ngx-select-dropdown";
import { BusinessCategory } from '../adminmasters/businessentity/bisuness-category/business-category';
import { BusinessCategoryServicesService } from '../adminmasters/businessentity/bisuness-category/business-category-services.service';
import { BusinessEntity } from '../adminmasters/businessentity/business-entity/business-entity';
import { BusinessEntityService } from '../adminmasters/businessentity/business-entity/business-entity.service';
import { PrivilegeCategory } from '../adminmasters/businessentity/privilegecategory/privilegecategory';
import { PrivilegecategoryService } from '../adminmasters/businessentity/privilegecategory/privilegecategory.service';
import { Attribute } from '../adminmasters/businessentity/attribute/attribute';
import { AttributeService } from '../adminmasters/businessentity/attribute/attribute.service';
import { StudentProfileService } from '../student-profile/student-profile.service';
import { StudentPayment } from '../student-profile/studentPaymentObject';
import { Plan } from '../adminmasters/browseplans/planObject';
import { PlanService } from '../adminmasters/businessentity/plans/plans.service';
import { StudentDetailsService } from '../shared/student-details.service';
import { PlanEntity, DiscountEntityExtended, AttributesEntityExtended, PlanEntityExtended, ContractTemplate, DiscountEntity } from '../adminmasters/businessentity/contract-template/contarctTemplate';
import { ContractService } from '../adminmasters/businessentity/contracts/contract.service';
import { ContractObject } from "../adminmasters/businessentity/contracts/contractObject";
import Swal from 'sweetalert2';
import { PrivilegeService } from 'src/app/privilege/privilege.service';


@Component({
  selector: 'app-privilege',
  templateUrl: './privilege.component.html',
  styleUrls: ['./privilege.component.css']
})
export class PrivilegeComponent implements OnInit {

  businessCategory: BusinessCategory[] = [];
  businessEntity: BusinessEntity[] = [];
  businessEntitiesOfParent: BusinessEntity[] = [];
  privilegeCategoryListLocal: PrivilegeCategory[] = [];
  privilegeOfParent: PrivilegeCategory[] = [];
  attributeList: Attribute[] = [];
  attributeListLocal: Attribute[] = [];
  privilegeList: PrivilegeCategory[] = [];
  studentPaymentList: StudentPayment[] = [];
  plans: Plan[] = [];
  stdId: number;
  contractObject: ContractObject = new ContractObject();
  isSearchedClicked: boolean;
  isListContainsData: boolean;
  contractTemplateListForTable: ContractObject[] = [];
  isContractTemplateSelected: boolean;
  contractList: ContractObject[] = [];

  discountEntityGlobal: DiscountEntity[] = [];



  @ViewChild('businessCategoryName') public ngSelectbusinessCategoryName: SelectDropDownComponent;
  @ViewChild('businessEntityName') public ngSelectbusinessEntityName: SelectDropDownComponent;
  @ViewChild('privilegeName') public ngSelectprivilegeName: SelectDropDownComponent;

  constructor(private translate: TranslateService,
    private businessCategoryServicesService: BusinessCategoryServicesService,
    private businessEntityService: BusinessEntityService,
    private studentProfileService: StudentProfileService,
    private privilegecategoryservice: PrivilegecategoryService,
    private attributeService: AttributeService,
    private planService: PlanService,
    private privilegeService:PrivilegeService,
    private contractService: ContractService,
    private studentDetailsService: StudentDetailsService) {
    translate.setDefaultLang('en');
  }


  ngOnInit() {
    this.getBusinessCategory();
    this.getBusinessEntity();
    this.getPrivilegeCategory();
    this.getAttribute();
    this.stdId = this.studentDetailsService.getStudentId();
    this.getPaymentDetails(this.stdId);
    this.getDiscount();
  }

  selectedbusinessCategoryCodeValue: any;
  businessCategoryCodeconfig = {
    displayKey: "businessCategoryName",
    search: true,
    limitTo: this.businessCategory.length
  };
  selectedPrivilegeCategoryList: number[] = [];
  selectedAttributeList: Attribute[] = [];

  private businessCategoryNameChange(): void {
    this.attributeListLocal = [];
    this.selectedPrivilegeCategoryList = [];
    this.businessEntitiesOfParent = [];
    this.privilegeList = [];
    if (this.selectedbusinessCategoryCodeValue.length > 0) {
      this.businessEntity.forEach(element => {
        if (element.businessCategoryCode == this.selectedbusinessCategoryCodeValue[0].businessCategoryName) {
          this.businessEntitiesOfParent.push(element);
        }
      });
    }
  }

  selectedbusinessEntityCodeValue: any;
  businessEntityCodeconfig = {
    displayKey: "name",
    search: true,
    limitTo: this.businessEntity.length
  };

  private businessEntityNameChange(): void {
    this.attributeListLocal = [];
    this.selectedPrivilegeCategoryList = [];
    this.privilegeList = [];
    if (this.selectedbusinessEntityCodeValue.length > 0) {

      if (this.selectedbusinessEntityCodeValue[0].privilegeVos.length > 0) {
        // console.log(this.selectedbusinessEntityCodeValue[0].privilegeVos);
        // this.privilegeList = [];

        this.privilegeList = this.selectedbusinessEntityCodeValue[0].privilegeVos;


      }
    }
  }
  selectedprivilegeCodeValue: any;
  privilegeCodeconfig = {
    displayKey: "privilegeName",
    search: true,
    limitTo: this.privilegeList.length
  };
  privilegeNameChange() {

    if (this.selectedprivilegeCodeValue.length > 0) {
      if (this.selectedprivilegeCodeValue[0].attributeVos.length > 0) {
        console.log(this.selectedprivilegeCodeValue[0].attributeVos);
        this.attributeList = [];
        this.attributeList = this.selectedprivilegeCodeValue[0].attributeVos;
      }
    }

  }

  selectedserviceCodeValue: any;
  serviceCodeconfig = {
    displayKey: "attributeName",
    search: true,
    limitTo: this.attributeListLocal.length
  };


  private getBusinessCategory(): void {
    this.privilegeService.getBusinessCategory()
      .subscribe(
        (data) => {
          this.businessCategory = data;
          console.log(this.businessCategory);
        }
      );
  }

  private getBusinessEntity(): void {
    this.privilegeService.getBusinessEntity()
      .subscribe(
        data => {
          this.businessEntity = data;
          console.log("businessEntity");
          console.log(this.businessEntity);
        }
      );
  }

  getPrivilegeCategory() {
    this.privilegeService.getPrivilegeCategory()
      .subscribe(
        (data) => {
          this.privilegeCategoryListLocal = data;

        }
      );
  }

  getAttribute() {
    this.privilegeService.getAttribute()
      .subscribe(
        (data) => {
          // console.log(data);
          this.attributeList = data;
        }
      );

  }
  privilegeCategoryCheckboxSelect(item) {
    console.log(item.attributeVos);
    if (this.selectedPrivilegeCategoryList.findIndex(x => x === item.privilegeId) >= 0) {
      this.selectedPrivilegeCategoryList.splice(this.selectedPrivilegeCategoryList.indexOf(item.privilegeId), 1);
      var someList: Attribute[] = [];
      this.attributeListLocal.forEach(element => {
        if (item.attributeVos.findIndex(x => x.attributeId === element.attributeId) >= 0) {
          //to do
        }
        else {
          someList.push(element);
        }
      });
      this.attributeListLocal = someList;
    }
    else {
      this.selectedPrivilegeCategoryList.push(item.privilegeId);
      item.attributeVos.forEach(element => {
        this.attributeListLocal.push(element);
      });
    }

    // this.attributeListLocal = item.attributeVos;


    // this.attributeList.forEach(element => {
    //   element.privilegeVos.forEach(innerElement => {
    //     if (this.selectedPrivilegeCategoryList.findIndex(x => x === innerElement.privilegeId) >= 0) {
    //       this.attributeListLocal.push(element);
    //     }
    //   });
    // });
    this.attributeListLocal = Array.from(new Set(this.attributeListLocal));
  }

  servicesCheckboxSelect(service) {
    console.log("fdsf");
    console.log(service)

    if (this.selectedAttributeList.findIndex(x => x.attributeId === service.attributeId) >= 0) {
      var list = this.selectedAttributeList.filter(x => x.attributeId != service.attributeId);
      this.selectedAttributeList = list;

    }
    else {
      this.selectedAttributeList.push(service);
      console.log(this.selectedAttributeList)
    }

  }

  getPaymentDetails(stdId: number): void {
    this.studentProfileService.getPaymentDetails(stdId).subscribe(
      (data) => {
        this.studentPaymentList = data;
        console.log("student payment list")
        console.log(this.studentPaymentList);
      }
    );

  }

  

  getDiscount() {
    this.contractService.getContract().subscribe((data) => {
      this.contractList = data;
    });
  }

  private searchPrivilegeCategory(): void {

    console.log("here");
    console.log(this.studentPaymentList);
    console.log(this.contractList);
    console.log(this.selectedAttributeList);
    console.log("here");

    this.discountEntityGlobal = [];

    this.contractList.forEach(element => {
      element.discountEntities.forEach(element2 => {
        if (this.selectedAttributeList.findIndex(x => x.attributeName == element2.attributesEntity.attributeName) >= 0)
        {
          if(element2.planEntity.planName == this.studentPaymentList[0].planName && element2.planEntity.planMembership == this.studentPaymentList[0].membershipType)
          {
            this.discountEntityGlobal.push(element2);
          }
          
        }
        
      });
    });

    console.log(this.discountEntityGlobal);
    this.selectedAttributeList=[];
  }
}