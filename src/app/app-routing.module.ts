import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './homepage/auth.guard';
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
import { MembershipCardComponent } from './adminmasters/businessentity/membership-card/membership-card.component'

const appRoutes: Routes = [
  {
    path: '', children: [
      { path:  '', redirectTo:  '/adminlogin', pathMatch:  'full' },
      { path: 'adminlogin', component: HomepageComponent },
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
      { path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard] },
      { path: 'accesscontrol', component: AccesscontrolComponent ,canActivate: [AuthGuard]},
      { path: 'addaccesscontrol', component: AddaccesscontrolComponent ,canActivate: [AuthGuard]},
      { path: 'coursecategory', component: CourseCategoryComponent,canActivate: [AuthGuard] },
      { path: 'courses', component: CoursesComponent,canActivate: [AuthGuard] },
      { path: 'institute', component: EducationalInstituteComponent,canActivate: [AuthGuard] },
      { path: 'businessCategory', component: BisunessCategoryComponent ,canActivate: [AuthGuard]},
      { path: 'attribute', component: AttributeComponent ,canActivate: [AuthGuard]},
      { path: 'businessEntity', component: BusinessEntityComponent,canActivate: [AuthGuard] },
      { path: 'membership', component: MembershipComponent,canActivate: [AuthGuard] },
      { path: 'planName', component: PlanNameComponent ,canActivate: [AuthGuard]},
      { path: 'plans', component: PlansComponent ,canActivate: [AuthGuard]},
      { path: 'status', component: StatusComponent,canActivate: [AuthGuard] },
      { path: 'studentadd', component: StudentComponent ,canActivate: [AuthGuard]},
      { path: 'membershipCard', component: MembershipCardComponent ,canActivate: [AuthGuard]},
    ]
  }
  /* ADMIN PART END*/
  

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthGuard],
  declarations: []
})
export class AppRoutingModule { 
 
}
