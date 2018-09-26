import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { StudentloginComponent } from './studentlogin/studentlogin.component';
import { InstituteloginComponent } from './institutelogin/institutelogin.component';
import { BusinessloginComponent } from './businesslogin/businesslogin.component';
import { RegbusinessComponent } from "./businesslogin/regbusiness/regbusiness.component";
import { ReginstituteComponent } from "./institutelogin/reginstitute/reginstitute.component";
import { RegstudentComponent } from "./studentlogin/regstudent/regstudent.component";
import { LayoutsComponent } from './layouts/layouts.component';
import { AdminlayoutComponent } from './layouts/adminlayout/adminlayout.component';
import { DashboardComponent } from './adminmasters/dashboard/dashboard.component';
import { AccesscontrolComponent } from './adminmasters/accesscontrol/accesscontrol.component';

import { CourseCategoryComponent } from './adminmasters/institutions/course-category/course-category.component';
import { CoursesComponent } from './adminmasters/institutions/courses/courses.component';
import { EducationalInstituteComponent } from './adminmasters/institutions/educational-institute/educational-institute.component';
import { AddaccesscontrolComponent } from './adminmasters/accesscontrol/addaccesscontrol/addaccesscontrol.component';
import { BisunessCategoryComponent } from './adminmasters/businessentity/bisuness-category/bisuness-category.component';
import { AttributeComponent } from './adminmasters/businessentity/attribute/attribute.component';
import { BusinessEntityComponent } from './adminmasters/businessentity/business-entity/business-entity.component';
import { MembershipComponent } from './adminmasters/businessentity/membership/membership.component';
import { PlansComponent } from './adminmasters/businessentity/plans/plans.component';
import { PlanNameComponent } from './adminmasters/businessentity/plan-name/plan-name.component';
import { StatusComponent } from './adminmasters/status/status/status.component';
import { StudentComponent } from './adminmasters/institutions/student/student.component';

const appRoutes: Routes = [
  {
    path: '', children: [
      { path: '', component: HomepageComponent },
      { path: 'studentlogin', component: StudentloginComponent },
      { path: 'institutelogin', component: InstituteloginComponent },
      { path: 'businesslogin', component: BusinessloginComponent },
      { path: 'registerstudent', component: RegstudentComponent },
      { path: 'registerinstitute', component: ReginstituteComponent },
      { path: 'registerbusiness', component: RegbusinessComponent }
    ]
  },
  /* ADMIN PART START*/
  {
    path: '' ,children: [
      { path: '',component:AdminlayoutComponent,outlet:'Adminlayout'},
      { path: 'dashboard', component: DashboardComponent },
      { path: 'accesscontrol', component: AccesscontrolComponent },
      { path: 'addaccesscontrol', component: AddaccesscontrolComponent },
      { path: 'coursecategory', component: CourseCategoryComponent },
      { path: 'courses', component: CoursesComponent },
      { path: 'institute', component: EducationalInstituteComponent },
      { path: 'businessCategory', component: BisunessCategoryComponent },
      { path: 'attribute', component: AttributeComponent },
      { path: 'businessEntity', component: BusinessEntityComponent },
      { path: 'membership', component: MembershipComponent },
      { path: 'planName', component: PlanNameComponent },
      { path: 'plans', component: PlansComponent },
      { path: 'status', component: StatusComponent },
      { path: 'studentadd', component: StudentComponent },
    ]
  }
  /* ADMIN PART END*/
  

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: []
})
export class AppRoutingModule { 
 
}
