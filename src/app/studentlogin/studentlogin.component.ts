import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider } from 'angular-6-social-login';
declare var $: any;

import { CourseService } from '../adminmasters/institutions/courses/courses.service';
import { CourseCategoryService } from "../adminmasters/institutions/course-category/course-category.service";
// import { CourseCategory } from "../course-category/course-category.module";

import { SelectDropDownComponent } from "ngx-select-dropdown";
import { ViewChild } from '@angular/core';

import { StudentRegistration, PlanNameObject, Institution, CourseCategory, CourseProfile } from './studentregistration.module';
import { StudentregistrationService } from "./studentregistration.service";
// declare var $lang: any;

@Component({
  selector: 'app-studentlogin',
  templateUrl: './studentlogin.component.html',
  styleUrls: ['./studentlogin.component.css']
})
export class StudentloginComponent implements OnInit {
  partytype: any;
  loginOrRegister: string;
  selectedLanguage: string;

  @ViewChild('instituteName') public ngSelectinstituteName: SelectDropDownComponent;
  @ViewChild('course') public ngSelectcourse: SelectDropDownComponent;
  @ViewChild('courseCategory') public ngSelectcourseCategory: SelectDropDownComponent;
  @ViewChild('planName') public ngSelectplanName: SelectDropDownComponent;


  alertMassege = "";
  saveOrUpdate: string;
  planList: StudentRegistration[];
  studentList: StudentRegistration[];
  studentListLocal: StudentRegistration[];
  student: StudentRegistration = new StudentRegistration();
  plan: PlanNameObject = new PlanNameObject();
  planNameList: PlanNameObject[] = [];
  selectedInstitute: string;

  institution: Institution = new Institution();


  institutionList: Institution[] = [];

  selectedPlanNameObject: string;

  courseCategoryList: CourseCategory[] = [];
  selectedCategory: string;

  courseList: CourseProfile[] = [];
  selectedCourse: string;

  selectedInstituteNameValue: any;
  InstituteNameConfig = {
    displayKey: "instName", //if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: this.institutionList.length
    // limitTo: 10
  };
  changeValueInstitute($event: any) {
    console.log(this.selectedInstituteNameValue)
    if (this.selectedInstituteNameValue.length > 0) {
      if (this.selectedInstituteNameValue[0].courseCategoryVos.length > 0) {
        this.courseCategoryList = [];
        this.courseList = [];
        this.courseCategoryList = this.selectedInstituteNameValue[0].courseCategoryVos;
      }
    }
    else {
      this.courseCategoryList = [];
      this.courseList = [];
    }
    this.ngSelectcourseCategory.deselectItem(this.ngSelectcourseCategory, 0);
    this.ngSelectcourseCategory.ngOnInit();
    this.ngSelectcourse.deselectItem(this.ngSelectcourse, 0);
    this.ngSelectcourse.ngOnInit();

  }

  selectedCourseValue: any;
  CourseConfig = {
    displayKey: "courseName", //if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: this.courseList.length
    // limitTo: 10
  };
  changeValueCourse($event: any) {
    console.log(this.selectedCourseValue)


  }

  selectedCourseCategoryValue: any;
  CourseCategoryConfig = {
    displayKey: "categoryName", //if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: this.courseCategoryList.length
    // limitTo: 10
  };
  changeValueCourseCategory($event: any) {
    console.log(this.selectedCourseCategoryValue)
    this.courseList = []
    if (this.selectedCourseCategoryValue.length > 0) {
      this.courseList = this.selectedCourseCategoryValue[0].courseProfileVos;
    }
    this.ngSelectcourse.deselectItem(this.selectedCourseValue, 0);
    this.ngSelectcourse.ngOnInit();

  }

  selectedPlanValue: any;
  PlanConfig = {
    displayKey: "planName", //if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: this.planNameList.length
    // limitTo: 10
  };
  changeValuePlan($event: any) {
    console.log(this.selectedPlanValue);
   
  }


  constructor(private socialAuthService: AuthService,
    private translate: TranslateService,
    private studentService: StudentregistrationService,
    private courseCategoryService: CourseCategoryService,
    private courseservice: CourseService,
    private router: Router,
  ) {
      translate.setDefaultLang('en');

    //   $(document).ready(function(){
    //     $(this).scrollTop(0);
    // });

     }

  ngOnInit() {
    this.getInstitution();
    this.getCourse();
    this.getCourseCategory();
    this.getPlanName();
    this.getStudent();



    $(document).ready(function(){
      $(this).scrollTop(0);
  });

    this.loginOrRegister = "LOGIN";
    this.selectedLanguage = "ENGLISH";

    // Add smooth scrolling to all links in navbar + footer link
    $(".navbar a, footer a[href='#myPage']").on('click', function (event) {
      // Make sure this.hash has a value before overriding default behavior
      if (this.hash !== "") {
        // Prevent default anchor click behavior
        event.preventDefault();

        // Store hash
        var hash = this.hash;

        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 900, function () {

          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        });
      } // End if

      $(window).scroll(function () {
        $(".slideanim").each(function () {
          var pos = $(this).offset().top;

          var winTop = $(window).scrollTop();
          if (pos < winTop + 600) {
            $(this).addClass("slide");
          }
        });
      });
    });


    // ki
    // $(document).ready(function(){
    //   ///hover container lang menu
    //   $("#lang-menu").hover(
    //     function(){
    //         $(this).addClass("cls-border-lang");
    //         $(this).children().eq(0).addClass("cls-borderbottom-lang");
    //         $("#lang-menu ul").stop().slideToggle(100);
    //     },
    //     function(){
    //          $(this).removeClass("cls-border-lang");
    //         $(this).children().eq(0).removeClass("cls-borderbottom-lang");
    //         $("#lang-menu ul").stop().slideToggle(100);  
    //     }
    //   );
    //   /// click languages
    //   $("#lang-menu ul li a").on("click", function(){
    //       //select lang and apply changes
    //       $lang = $(this).text();
    //       alert("$lang");
    //       $("#lang-menu li a").text($lang);
          
    //   });
    
    // });

    // ki

  }

  changeLanguage()
  {
    if(this.selectedLanguage=="ENGLISH")
    {
      this.selectedLanguage = "FRENCH";
      this.translate.use('fr'); 

      if(this.loginOrRegister == "REGISTER")
      {
        this.loginOrRegister="REGISTRE";
      }
      else if(this.loginOrRegister == "LOGIN")
      {
        this.loginOrRegister="S'IDENTIFIER";
      }
      
    }
    else if(this.selectedLanguage=="FRENCH")
    {
      this.selectedLanguage = "ENGLISH";
      this.translate.use('en'); 

      if(this.loginOrRegister == "REGISTRE")
      {
        this.loginOrRegister="REGISTER";
      }
      else if(this.loginOrRegister == "S'IDENTIFIER")
      {
        this.loginOrRegister="LOGIN";
      }
    }
    
  }

  regester() {

    if(this.selectedLanguage=="ENGLISH")
    {
      this.loginOrRegister = "REGISTER";
    }
    else if(this.selectedLanguage=="FRENCH")
    {
      this.loginOrRegister="REGISTER";
    }

    // this.loginOrRegister = "REGISTER";
  }

  login() {
    if(this.selectedLanguage=="ENGLISH")
    {
      this.loginOrRegister = "LOGIN";
    }
    else if(this.selectedLanguage=="FRENCH")
    {
      this.loginOrRegister="S'IDENTIFIER";
    }
    // this.loginOrRegister = "LOGIN";
  }

  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform == "facebook") {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialPlatform == "google") {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform + " sign in data : ", userData);
        // Now sign-in with userData
        // ...

      }
    );
  }

  clickedAlert = function () {
    this.alertMassege = "";
  };

  saveStudent(student) {

    this.studentService.saveStudent( student, this.selectedInstituteNameValue, this.selectedCourseCategoryValue, this.selectedCourseValue, this.selectedPlanValue)
      .subscribe(
        (data) => {
          console.log("******" + data);
          this.alertMassege = "Registered successfully!!";
          // if (form != null)
          //   form.reset();
          this.getStudent();
        
          this.reset();

          

         },
        (error) => {
          console.log(error);
          alert("Try again");
        }
      );



  }

  getStudent() {
    this.studentService.getStudent()
      .subscribe(
        (data) => {
          this.studentList = data;
          // this.studentListLocal = data;
          console.log(this.studentList);
        }
      );

  }

  reset()
  {
    this.student =  new StudentRegistration();

    this.ngSelectcourseCategory.deselectItem(this.selectedCourseCategoryValue,0);
    this.ngSelectcourseCategory.ngOnInit();

    this.ngSelectinstituteName.deselectItem(this.selectedInstituteNameValue,0);
    this.ngSelectinstituteName.ngOnInit();

    this.ngSelectcourse.deselectItem(this.selectedCourseValue,0);
    this.ngSelectcourse.ngOnInit();

    this.ngSelectplanName.deselectItem(this.selectedPlanValue,0);
    this.ngSelectplanName.ngOnInit();

  }

  getInstitution() {
    this.studentService.getInstitution()
      .subscribe(
        (data) => {
          this.institutionList = data;
          console.log(this.institutionList);
        }
      );

  }

  getCourse() {
    this.studentService.getCourse()
      .subscribe(
        (data) => {
          this.courseList = data;
          console.log(this.courseList);
        }
      );

  }

  getCourseCategory() {
    this.studentService.getCourseCategory()
      .subscribe(
        (data) => {
          this.courseCategoryList = data;
          console.log(this.courseCategoryList);
        }
      );

  }

  getPlanName() {
    this.studentService.getPlanName()
      .subscribe(
        (data) => {
          this.planNameList = data;
          console.log(this.planNameList);
        }
      );

  }
}
