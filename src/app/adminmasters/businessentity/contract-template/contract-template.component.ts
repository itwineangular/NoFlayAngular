import { Component, OnInit } from '@angular/core';
import { PlanEntity, Plan, DiscountEntityExtended, AttributesEntityExtended, PlanEntityExtended, ContractTemplate } from "./contarctTemplate";
import { PlanService } from '../plans/plans.service';
import { Attribute } from '../attribute/attribute';
import { AttributeService } from '../attribute/attribute.service';
import { ContractTemplateService } from "./contract-template.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contract-template',
  templateUrl: './contract-template.component.html',
  styleUrls: ['./contract-template.component.css']
})
export class ContractTemplateComponent implements OnInit {

  planMembershipList: PlanEntity[] = [];
  plans: Plan[] = [];
  attributeList: Attribute[] = [];
  discountEntityExtended: DiscountEntityExtended[] = [];
  attributesEntityExtendedList: AttributesEntityExtended[] = [];

  isSearchClicked: boolean = false;
  selectedTemplate: string = "";
  alertMassege = "";
  isContractTemplateSave: boolean;

  templateId: number;
  selectedServicesForTemplate: any[] = [];
  contractTemplateList: ContractTemplate[] = [];

  constructor(private planService: PlanService,
    private attributeService: AttributeService,
    private contractTemplateService: ContractTemplateService) { }

  ngOnInit() {
    this.isContractTemplateSave = true;
    this.getContractTemplateFromServer();
    this.getPlan();
    this.getAttribute();
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

  private getAttribute(): void {
    this.attributeService.getAttribute()
      .subscribe(
        (data) => {
          this.attributeList = data;
        }
      );
  }

  searchContractTemplate(): void {
    this.selectedServicesForTemplate = [];
    if (this.selectedTemplate == "") {
      Swal({
        title: 'Invalid input!!',
        text: 'Please select Template name',
        showCancelButton: false,
        confirmButtonText: 'Ok',
      });
    }
    else {
      this.isSearchClicked = true;
      // this.addPlanAndAttributesTolist();

      if (this.contractTemplateList.length > 0) {
        var contractTemplateListLocal = this.contractTemplateList.filter(x => x.contractTemplateName == this.selectedTemplate);
        if (contractTemplateListLocal.length > 0) {
          this.isContractTemplateSave = false;
          this.templateId = contractTemplateListLocal[0].contractTemplateId;
          this.addDiscountDataToSelectedTemplate(contractTemplateListLocal[0]);
        }
        else {
          this.isContractTemplateSave = true;
          this.addPlanAndAttributesTolist();
        }
      }
      else {
        this.isContractTemplateSave = true;
        this.addPlanAndAttributesTolist();
      }

      //this.searchContractTemplateFromServer(this.selectedTemplate);
    }

  }

  onTemplateSelect(templateName): void {
    this.selectedTemplate = templateName;
  }

  addPlanAndAttributesTolist(): void {
    this.discountEntityExtended = [];
    this.attributeList.forEach(element => {
      var discountEntityExtended: DiscountEntityExtended = new DiscountEntityExtended();

      var attributesEntityExtended: AttributesEntityExtended = new AttributesEntityExtended();
      attributesEntityExtended.id = element.attributeId;
      attributesEntityExtended.name = element.attributeName;
      //attributesEntityExtended.isSelected = false;

      var planEntityExtendedList: PlanEntityExtended[] = [];

      this.planMembershipList.forEach(element2 => {
        var planEntityExtended: PlanEntityExtended = new PlanEntityExtended();
        planEntityExtended.id = element2.planId;
        planEntityExtended.name = element2.planMembership;
        // planEntityExtended.discount = 0;
        planEntityExtendedList.push(planEntityExtended);
      });
      attributesEntityExtended.planEntityExtended = planEntityExtendedList;
      discountEntityExtended.attributesEntityExtended = attributesEntityExtended;
      this.discountEntityExtended.push(discountEntityExtended);
    });
  }

  servicesCheckboxSelect(id): void {
    if (this.selectedServicesForTemplate.findIndex(x => x === id) >= 0) {
      var data = this.selectedServicesForTemplate.filter(x => x !== id);
      this.selectedServicesForTemplate = data;
    }
    else {
      this.selectedServicesForTemplate.push(id);
    }
  }

  clickedAlert = function () {
    this.alertMassege = "";
  };


  getContractTemplateFromServer(): void {
    this.contractTemplateService.getContractTemplate()
      .subscribe(
        (data) => {
          this.contractTemplateList = data;
        }
      );
  }

  saveContractTemplate(): void {
    if (this.selectedServicesForTemplate.length > 0) {
      this.contractTemplateService.saveContractTemplate(this.selectedTemplate, this.discountEntityExtended, this.selectedServicesForTemplate)
        .subscribe(
          (data) => {
            this.alertMassege = "Contract template added successfully!!";
          },
          (error) => {
            alert("Try again");
          }
        );
    }
    else {
      Swal({
        title: 'Invalid input!!',
        text: 'Please select services',
        showCancelButton: false,
        confirmButtonText: 'Ok',
      });
    }
  }

  updateContractTemplate(): void {
    if (this.selectedServicesForTemplate.length > 0) {
      this.contractTemplateService.updateContractTemplate(this.selectedTemplate, this.discountEntityExtended, this.selectedServicesForTemplate, this.templateId)
        .subscribe(
          (data) => {
            this.alertMassege = "Contract template updated successfully!!";
          },
          (error) => {
            alert("Try again");
          }
        );
    }
    else {
      Swal({
        title: 'Invalid input!!',
        text: 'Please select services',
        showCancelButton: false,
        confirmButtonText: 'Ok',
      });
    }

  }

  searchContractTemplateFromServer(templateName): void {
    this.contractTemplateService.searchContractTemplate(templateName)
      .subscribe(
        (data) => {
          this.contractTemplateList = data;
          // this.addDiscountDataToSelectedTemplate(this.contractTemplateList[0]);
        },
        (error) => {

        }
      );
  }

  addDiscountDataToSelectedTemplate(contractTemplate: ContractTemplate) {
    this.selectedServicesForTemplate = [];
    this.discountEntityExtended = [];
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

        var planLocal = contractTemplateLocal.filter(x => x.planEntity.planId == element2.planId);
        if (planLocal.length > 0) {
          this.selectedServicesForTemplate.push(planLocal[0].attributesEntity.attributeId);
          planEntityExtended.discount = planLocal[0].discount;
        }
        planEntityExtendedList.push(planEntityExtended);
      });
      if (this.selectedServicesForTemplate.findIndex(x => x === element.attributeId) >= 0) {
        attributesEntityExtended.isSelected = true;
      }
      attributesEntityExtended.planEntityExtended = planEntityExtendedList;
      discountEntityExtended.attributesEntityExtended = attributesEntityExtended;
      this.discountEntityExtended.push(discountEntityExtended);
    });

    this.selectedServicesForTemplate = this.selectedServicesForTemplate.filter((x, i, a) => a.indexOf(x) == i)
    console.log(this.selectedServicesForTemplate);
    console.log(this.discountEntityExtended);
  }



}
