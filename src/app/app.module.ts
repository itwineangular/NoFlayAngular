import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { HttpModule } from '@angular/http';
import { Angular2TokenService } from 'angular2-token';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FilterPipe} from './filter.pipe';
import { FilterPipeCourseCategory } from "./adminmasters/institutions/course-category/filter.pipe";
import { FilterPipeCourses } from "./adminmasters/institutions/courses/courses-filter-pipe";
import { FilterPipeBusinessCategory } from "./adminmasters/businessentity/bisuness-category/business-caregory-filter";
// import {  FilterPipeAttribute} from "./adminmasters/businessentity/attribute/attribute-filter";
import {  FilterPipeAttribute} from "./adminmasters/businessentity/attribute/attribute-filter";
import { FilterPipeMembership } from "./adminmasters/businessentity/membership/membership-filter";
import {FilterPipePrivilegeCategory} from "./adminmasters/businessentity/privilegecategory/privilegecategory-filter";
import { FilterPipePlanName } from "./adminmasters/businessentity/plan-name/plan-name-filter";
import {FilterPipeStatus} from "./adminmasters/status/status/status-filter";
import { OrderModule } from 'ngx-order-pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import { MyDatePickerModule } from 'mydatepicker';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';

import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from "angular-6-social-login";


import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { StudentloginComponent } from './studentlogin/studentlogin.component';
import { BusinessloginComponent } from './businesslogin/businesslogin.component';
import { InstituteloginComponent } from './institutelogin/institutelogin.component';
import { AppRoutingModule } from './app-routing.module';
import { ReginstituteComponent } from './institutelogin/reginstitute/reginstitute.component';
import { RegbusinessComponent } from './businesslogin/regbusiness/regbusiness.component';
import { RegstudentComponent } from './studentlogin/regstudent/regstudent.component';
import { DashboardComponent } from './adminmasters/dashboard/dashboard.component';
import { AccesscontrolComponent } from './adminmasters/accesscontrol/accesscontrol.component';
import { InstitutionsComponent } from './adminmasters/institutions/institutions.component';
import { BusinessentityComponent } from './adminmasters/businessentity/businessentity.component';
import { LayoutsComponent } from './layouts/layouts.component';
import { AdminlayoutComponent } from './layouts/adminlayout/adminlayout.component';
import { CourseCategoryComponent } from './adminmasters/institutions/course-category/course-category.component';
import { CoursesComponent } from './adminmasters/institutions/courses/courses.component';
import { EducationalInstituteComponent } from './adminmasters/institutions/educational-institute/educational-institute.component';
import { AddaccesscontrolComponent } from './adminmasters/accesscontrol/addaccesscontrol/addaccesscontrol.component';
import { BisunessCategoryComponent } from './adminmasters/businessentity/bisuness-category/bisuness-category.component';
// import { AttributeComponent } from './adminmasters/businessentity/attribute/attribute.component';
import { AttributeComponent } from './adminmasters/businessentity/attribute/attribute.component';
import { BusinessEntityComponent } from './adminmasters/businessentity/business-entity/business-entity.component';
import { FileuploaderService } from './adminmasters/institutions/educational-institute/fileuploader.service';
import { MembershipComponent } from './adminmasters/businessentity/membership/membership.component';
import { PlansComponent } from './adminmasters/businessentity/plans/plans.component'

import { NgDatepickerModule } from 'ng2-datepicker';
import { PlanNameComponent } from './adminmasters/businessentity/plan-name/plan-name.component';
import { StatusComponent } from './adminmasters/status/status/status.component';
import { StudentComponent } from './adminmasters/institutions/student/student.component';
import { MembershipCardComponent } from './adminmasters/businessentity/membership-card/membership-card.component'

import { QRCodeModule } from 'angularx-qrcode';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { EmailTemplateComponent } from './adminmasters/accesscontrol/email-template/email-template.component';
import { InitialConfigurationComponent } from './adminmasters/accesscontrol/initial-configuration/initial-configuration.component';
import { CornJobSettingsComponent } from './adminmasters/accesscontrol/corn-job-settings/corn-job-settings.component';
import { SmtpDetailsComponent } from './adminmasters/accesscontrol/smtp-details/smtp-details.component';
import { UserComponent } from './adminmasters/accesscontrol/user/user.component';
import { PrivilegecategoryComponent } from './adminmasters/businessentity/privilegecategory/privilegecategory.component';
import { from } from '../../node_modules/rxjs';
import { PaymentDetailsComponent } from './adminmasters/businessentity/payment-details/payment-details.component';
import { PaymentComponent } from './adminmasters/payment/payment.component';
import { BrowseplansComponent } from './adminmasters/browseplans/browseplans.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { StudentHomePageComponent } from './layouts/student-home-page/student-home-page.component';
import { ContractsComponent } from './adminmasters/businessentity/contracts/contracts.component';
import { ContractTemplateComponent } from './adminmasters/businessentity/contract-template/contract-template.component';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    StudentloginComponent,
    BusinessloginComponent,
    InstituteloginComponent,
    ReginstituteComponent,
    RegbusinessComponent,
    RegstudentComponent,
    DashboardComponent,
    AccesscontrolComponent,
    InstitutionsComponent,
    BusinessentityComponent,
    LayoutsComponent,
    AdminlayoutComponent,
    CourseCategoryComponent,
    CoursesComponent,
    EducationalInstituteComponent,
    AddaccesscontrolComponent,
    BisunessCategoryComponent,
    AttributeComponent,
    BusinessEntityComponent,
    FilterPipe,
    FilterPipeCourseCategory,
    FilterPipeCourses,
    FilterPipeBusinessCategory,
    FilterPipeAttribute,
    FilterPipeMembership,
    FilterPipePlanName,
    MembershipComponent,
    PlansComponent,
    PlanNameComponent,
    StatusComponent,
    StudentComponent,
    MembershipCardComponent,
    EmailTemplateComponent,
    InitialConfigurationComponent,
    CornJobSettingsComponent,
    SmtpDetailsComponent,
    UserComponent,
    FilterPipePrivilegeCategory,
    PrivilegecategoryComponent,
    PaymentDetailsComponent,
    PaymentComponent,
    FilterPipeStatus,
    BrowseplansComponent,
    StudentProfileComponent,
    StudentHomePageComponent,
    ContractsComponent,
    ContractTemplateComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    SocialLoginModule,
    NgDatepickerModule,
    OrderModule,
    NgxPaginationModule,
    MyDatePickerModule ,
    QRCodeModule,
    SelectDropDownModule,
    ShowHidePasswordModule.forRoot(),
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot()
  ],
  providers: [Angular2TokenService, FileuploaderService,
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  // return new TranslateHttpLoader(http);
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider("1763130933756114")
        },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("808069355591-j9n9b8lgo6fgobl0c8ilk8qcf3hc28gj.apps.googleusercontent.com")
        },
      ],
  );
  return config;
}
