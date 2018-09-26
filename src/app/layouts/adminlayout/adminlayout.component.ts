import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import * as $ from 'jquery';
import { TranslateService } from '@ngx-translate/core';
import { AdminMasterPage } from "./admin-object";
import { AdminlayService } from "./adminlay.service";
import { NgIf } from '../../../../node_modules/@angular/common';



@Component({
  selector: 'app-adminlayout',
  templateUrl: './adminlayout.component.html',
  styleUrls: ['./adminlayout.component.css']
})
export class AdminlayoutComponent implements OnInit {

  accessControl: string;
  institutions: string;
  businessEntities: string;
  selectedFlag: string;
  courseCategory: string;
  courses: string;
  educationalInstitutions: string;
  student:string;

  businessCategory: string;
  businessEntity: string;
  attribute: string;
  membership: string;
  planName : string;
  plans : string;
  status : string;

  constructor(public router: Router,
    private translate: TranslateService,
    private adminlayService: AdminlayService) {
    translate.setDefaultLang('en');
    this.englishMenuItems();
  }
  menus: any;
  ngOnInit() {
    // this.getSidebarMenuItemsFromJson();

    $("#collapse [data-toggle=collapse]:last").click()
    this.gotopage("config");

    $(".horz-main-menu-a").click(function () {
      $(".horz-main-menu-a.iactive").removeClass("iactive");
      $(this).addClass("iactive");
    });


  }

  switchLanguage(language: string) {
    this.translate.use(language);
    if (language.includes('en')) {
      this.englishMenuItems();
    }
    else {
      this.frenchMenuitems();
    }

  }

  logout()
  {
    window.location.replace('');
  }

  // getSidebarMenuItemsFromJson() {

  //   this.translate.get(['adminMasterPage']).subscribe((translation: [string]) => {
  //     this.translationLet = translation;
  //   });
  //   this.translate.get(['adminMasterPage']).subscribe(
  //   )

  // }



  englishMenuItems() {
    this.accessControl = "Access Control",
      this.institutions = "Institutions",
      this.businessEntities = "Business Entities",
      this.courseCategory = "Course Category",
      this.courses = "Courses",
      this.educationalInstitutions = "Educational Institutions",
      this.businessCategory = "Business Category",
      this.businessEntity = "Business Entity",
      this.attribute = "Attribute",
      this.membership = "Membership",
      this.planName = "Plan Name",
      this.plans = "Plans",
      this.status = "Status",
      this.student = "Student",

      this.gotopage(this.selectedFlag)
  }
  frenchMenuitems() {
    this.accessControl = "Contrôle d'accès",
      this.institutions = "Institutions",
      this.businessEntities = "Entités commerciales",
      this.courseCategory = "Catégorie de cours",
      this.courses = "Cours",
      this.educationalInstitutions = "Les établissements d'enseignement",
      this.businessCategory = "Catégorie Business",
      this.businessEntity = "Entité commerciale",
      this.attribute = "Attribut",
      this.membership = "Adhésion",
      this.planName = "Nom du plan",
      this.plans = "Des plans",
      this.status = "Statut",
      this.gotopage(this.selectedFlag);
  }


  gotopage(layoutFlag) {
    this.selectedFlag = layoutFlag;
    switch (layoutFlag) {
      case 'dashboard':
        this.menus = {
          'menuitems':
            [

            ]
        };
        this.router.navigate(['/dashboard']);
        break;

      case 'config':
        this.menus = {
          'menuitems':
            [
              // { 'menuid': '1', 'mainmenu': 'Access Control', 'url': 'accesscontrol' },
              { 'menuid': '1', 'mainmenu': this.accessControl, 'url': 'accesscontrol' },
              {
                'menuid': '2', 'mainmenu': this.institutions,
                'submenu': [
                  { 'name': this.courseCategory, 'url': 'coursecategory' },
                  { 'name': this.courses, 'url': 'courses' },
                  { 'name': this.educationalInstitutions, 'url': 'institute' },
                  { 'name': this.student, 'url': 'studentadd' }

                ]
              },
              {
                'menuid': '3', 'mainmenu': this.businessEntities,
                'submenu': [
                  { 'name': this.businessCategory, 'url': 'businessCategory' },
                  { 'name': this.businessEntities, 'url': 'businessEntity' },
                  { 'name': this.attribute, 'url': 'attribute' },
                  { 'name': this.membership, 'url': 'membership' },
                  { 'name': this.planName,'url':'planName'},
                  { 'name': this.plans, 'url': 'plans' }
                ]
              },
              {
                'menuid': '4', 'mainmenu': this.status,
                'submenu': [
                  { 'name': this.status, 'url': 'status' }
                ]
              }
            ]
        };
        this.router.navigate(['/coursecategory']);
        break;

      case 'reports':
        this.menus = {
          'menuitems':
            [
              //{ 'menuid': '1', 'mainmenu': 'Generate Reports', 'url': 'reports' }
            ]
        };
        this.router.navigate(['/dashboard']);
        break;

    }

  }

}