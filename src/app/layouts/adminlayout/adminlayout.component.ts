import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import * as $ from 'jquery';
import { TranslateService } from '@ngx-translate/core';
import { AdminMasterPage } from "./admin-object";
import { AdminlayService } from "./adminlay.service";
import { NgIf } from '../../../../node_modules/@angular/common';
import { AuthService } from '../../homepage/auth.service';



@Component({
  selector: 'app-adminlayout',
  templateUrl: './adminlayout.component.html',
  styleUrls: ['./adminlayout.component.css']
})
export class AdminlayoutComponent implements OnInit {

  accessControl: string;
  emailTemplate: string;

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

  membershipManagement : string;
  membershipCard : string;

  id: string;

  constructor(public router: Router,
    private translate: TranslateService,
    private adminlayService: AdminlayService,
    public authService: AuthService) {
    translate.setDefaultLang('en');
    this.englishMenuItems();
  }
  menus: any;
  ngOnInit() {
    this.id = localStorage.getItem('token');
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
    console.log("Logout");
    this.authService.logout();
    this.router.navigate(['/adminlogin']);
    // this.authService.logout();
    // this.router.navigate(['/adminlogin']);
    // window.location.replace('');
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
    this.emailTemplate = "Email Templates",
      this.institutions = "Institutions",
      this.businessEntities = "Business Entities",
      this.courseCategory = "Course Categories",
      this.courses = "Courses",
      this.educationalInstitutions = "Educational Institutions",
      this.businessCategory = "Business Categories",
      this.businessEntity = "Business Entity",
      this.attribute = "Attributes",
      this.membership = "Subscription Type",
      this.planName = "Plan Names",
      this.plans = "Plans",
      this.status = "Status",
      this.student = "Students",

      this.membershipManagement = "Membership Management",
      this.membershipCard = "Membership Card",

      this.gotopage(this.selectedFlag)
  }
  frenchMenuitems() {
    this.accessControl = "Contrôle d'accès",
    this.emailTemplate = "Modèles de courrier électronique",
      this.institutions = "Institutions",
      this.businessEntities = "Entités commerciales",
      this.courseCategory = "Catégories de cours",
      this.courses = "Cours",
      this.educationalInstitutions = "Les établissements d'enseignement",
      this.businessCategory = "Catégories d'entreprises",
      this.businessEntity = "Entité commerciale",
      this.attribute = "Les attributs",
      this.membership = "Type d'abonnement",
      this.planName = "Noms de plan",
      this.plans = "Des plans",
      this.status = "Statut",
      this.student = "Élèves",

      this.membershipManagement = "Gestion des membres",
      this.membershipCard = "Carte de membre",

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
              { 'menuid': '1', 'mainmenu': this.accessControl,'submenu': [
                { 'name': this.emailTemplate, 'url': 'emailTemplate' }

              ] },
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
                  // { 'name': this.membership, 'url': 'membership' },
                  // { 'name': this.planName,'url':'planName'},
                  // { 'name': this.plans, 'url': 'plans' }
                ]
              },
              {
                'menuid': '4', 'mainmenu': this.membershipManagement,
                'submenu': [
                  { 'name': this.membership, 'url': 'membership' },
                  { 'name': this.planName,'url':'planName'},
                  { 'name': this.plans, 'url': 'plans' },
                  { 'name': this.membershipCard, 'url': 'membershipCard' }
                ]
              },
              {
                'menuid': '5', 'mainmenu': this.status,
                'submenu': [
                  { 'name': this.status, 'url': 'status' }
                ]
              }
            ]
        };
        this.router.navigate(['/emailTemplate']);
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