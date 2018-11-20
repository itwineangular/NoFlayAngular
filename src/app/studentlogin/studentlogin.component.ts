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

import { DatepickerOptions, NgDatepickerModule, NgDatepickerComponent } from 'ng2-datepicker';
import * as enLocale from 'date-fns/locale/en';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { CommonServicesService } from "../common-services.service";
import { FileQueueObject, FileuploaderService } from "./../adminmasters/institutions/educational-institute/fileuploader.service";

@Component({
  selector: 'app-studentlogin',
  templateUrl: './studentlogin.component.html',
  styleUrls: ['./studentlogin.component.css']
})
export class StudentloginComponent implements OnInit {
  
  academicYear: string;
  academicYearsList: string[] = [];
  d = new Date();

  options: DatepickerOptions = {
    locale: enLocale,
    minDate: new Date(this.d.setDate(this.d.getDate() - 1))
  };
  partytype: any;
  loginOrRegister: string;
  selectedLanguage: string;

  url: any;
  countries = [];
  statesLocal = [];
  citiesLocal = [];
  states = [];
  cities = [];
  @ViewChild('instituteName') public ngSelectinstituteName: SelectDropDownComponent;
  @ViewChild('course') public ngSelectcourse: SelectDropDownComponent;
  @ViewChild('courseCategory') public ngSelectcourseCategory: SelectDropDownComponent;
  @ViewChild('planName') public ngSelectplanName: SelectDropDownComponent;

  @ViewChild('studentRegForm') mytemplateForm : NgForm;

  statusList: StudentRegistration[];
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

  
  // selectedInstituteNameValue: any;
  // InstituteNameConfig = {
  //   displayKey: "instName", //if objects array passed which key to be displayed defaults to description
  //   search: true,
  //   limitTo: this.institutionList.length
  //   // limitTo: 10
  // };
  // changeValueInstitute($event: any) {
  //   console.log(this.selectedInstituteNameValue)
  //   if (this.selectedInstituteNameValue.length > 0) {
  //     if (this.selectedInstituteNameValue[0].courseCategoryVos.length > 0) {
  //       this.courseCategoryList = [];
  //       this.courseList = [];
  //       this.courseCategoryList = this.selectedInstituteNameValue[0].courseCategoryVos;
  //     }
  //   }
  //   else {
  //     this.courseCategoryList = [];
  //     this.courseList = [];
  //   }
  //   this.ngSelectcourseCategory.deselectItem(this.ngSelectcourseCategory, 0);
  //   this.ngSelectcourseCategory.ngOnInit();
  //   this.ngSelectcourse.deselectItem(this.ngSelectcourse, 0);
  //   this.ngSelectcourse.ngOnInit();

  // }




  // selectedCourseValue: any;
  // CourseConfig = {
  //   displayKey: "courseName", //if objects array passed which key to be displayed defaults to description
  //   search: true,
  //   limitTo: this.courseList.length
  //   // limitTo: 10
  // };
  // changeValueCourse($event: any) {
  //   console.log(this.selectedCourseValue)


  // }

  // selectedCourseCategoryValue: any;
  // CourseCategoryConfig = {
  //   displayKey: "categoryName", //if objects array passed which key to be displayed defaults to description
  //   search: true,
  //   limitTo: this.courseCategoryList.length
  //   // limitTo: 10
  // };
  // changeValueCourseCategory($event: any) {
  //   console.log(this.selectedCourseCategoryValue)
  //   this.courseList = []
  //   if (this.selectedCourseCategoryValue.length > 0) {
  //     this.courseList = this.selectedCourseCategoryValue[0].courseProfileVos;
  //   }
  //   this.ngSelectcourse.deselectItem(this.selectedCourseValue, 0);
  //   this.ngSelectcourse.ngOnInit();

  // }

  // selectedPlanValue: any;
  // PlanConfig = {
  //   displayKey: "planName", //if objects array passed which key to be displayed defaults to description
  //   search: true,
  //   limitTo: this.planNameList.length
  //   // limitTo: 10
  // };
  // changeValuePlan($event: any) {
  //   console.log(this.selectedPlanValue);
   
  // }


  constructor(private socialAuthService: AuthService,
    private translate: TranslateService,
    private studentService: StudentregistrationService,
    private courseCategoryService: CourseCategoryService,
    private courseservice: CourseService,
    private router: Router,
    private commonService: CommonServicesService,
    private uploader: FileuploaderService
  ) {
      translate.setDefaultLang('en');

    //   $(document).ready(function(){
    //     $(this).scrollTop(0);
    // });

     }

  ngOnInit() {
    this.getAcademicYears();
    var currentYear = this.d.getFullYear();
    var nextYear = currentYear + 1;
    this.academicYear = currentYear.toString() + " - " + nextYear.toString();

    this.getInstitution();
    this.getCourse();
    this.getCourseCategory();
    this.getPlanName();
    this.getStudent();
    this.getCountries();
    this.getStates();
    this.getCities();


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

  // saveStudent(student) {

  //   this.studentService.saveStudent( student, this.selectedInstituteNameValue, this.selectedCourseCategoryValue, this.selectedCourseValue, this.selectedPlanValue)
  //     .subscribe(
  //       (data) => {
  //         console.log("******" + data);
  //         this.alertMassege = "Registered successfully!!";
         
  //         this.getStudent();
        
  //         this.reset();

          

  //        },
  //       (error) => {
  //         console.log(error);
  //         alert("Try again");
  //       }
  //     );



  // }

  addToFileToServer(file: FileList) {
    //this.addToFileToQueue("");
    
    this.uploader.addToQueue(file);
   // this.uploader.uploadAll("1239", "file");
    // this.studentService.upload(file);

  }

//image upload for student
addToQueue(file: FileList) {

  if (file && file[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(file[0]); // read file as data url
      reader.onload = (event) => {
          let target: any = event.target;
          let content: string = target.result;
          this.url = content;
          // this.url = event.target.result;

      }
  }

  this.uploader.addToQueue(file);
}

  // saveStudent(student) {
  //   this.uploader.uploadAll(student,"studentImage");
  //   this.studentService.saveStudent(student)
  //     .subscribe(
  //       (data) => {
  //         var string = data['_body'],
  //           substring = "Already existing mail";
  //         if (string.includes(substring)) {
  //           Swal({
  //             title: 'Already existing mail !!!!',
  //             text: "Email already exists. Please choose a different email",
  //           confirmButtonText: 'OK!'
  //           });
  //         }
  //         else {
  //           this.mytemplateForm.reset();
  //           this.url = "";
  //           $("#fileControl").val('');
          
  //           Swal({
  //             title: 'successfull !!!!',
  //             text: "Your data is saved successfully, expect an mail.",
  //           confirmButtonText: 'OK!'
  //           })

  //           this.getStudent();
  //           this.reset();

  //         }

  //       },
  //       (error) => {
  //         console.log(error);
  //         alert("Try again");
  //       }
  //     );



  // }

  saveStudent(studentValue) {
    console.log("student ****");
        this.uploader.uploadAll(studentValue,"studentImage");
    
        
         {
       console.log("save student");
          this.studentService.saveStudent(studentValue)
            .subscribe(
              (data) => {
                
                this.mytemplateForm.reset();
                this.url = "";
                $("#fileControl").val('');
               // this.alertMassege = "Student Registered successfully!!";
                this.getStudent();
              
                Swal({
                  title: 'successfull !!!!',
                  text: "Your data is saved successfully, expect an mail.",
                confirmButtonText: 'OK!'
                })
               
              },
              (error) => {
                console.log(error);
               // alert("Try again");
                var string = error['_body'];
                
                console.log(string);
                var substring = "Already existing mail";
                if (string.includes(substring)) {
                  Swal({
                    title: 'Already existing mail !!!!',
                    text: "Email already exists. Please choose a different email",
                  confirmButtonText: 'OK!'
                  });
                  this.student.stdEmail="";
                }
                
                else {
                  alert("Try again");
      
                }
              }
            );
    
        }
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

    // this.ngSelectcourseCategory.deselectItem(this.selectedCourseCategoryValue,0);
    // this.ngSelectcourseCategory.ngOnInit();

    // this.ngSelectinstituteName.deselectItem(this.selectedInstituteNameValue,0);
    // this.ngSelectinstituteName.ngOnInit();

    // this.ngSelectcourse.deselectItem(this.selectedCourseValue,0);
    // this.ngSelectcourse.ngOnInit();

    // this.ngSelectplanName.deselectItem(this.selectedPlanValue,0);
    // this.ngSelectplanName.ngOnInit();

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

  getCountries() {
    this.commonService.getCountries().subscribe(data => {
      this.countries = data
    });
  }
  getStates() {
    this.commonService.getStates().subscribe(data => {
      this.statesLocal = data
    });
  }
  getCities() {
    this.commonService.getCities().subscribe(data => {
      this.citiesLocal = data
    });
  }

  onSelect(countryid) {
    this.states = this.statesLocal.filter((item) => item.countryCode == countryid);
    this.cities = [];
  }

  onStateSelect(stateid) {
    this.cities = this.citiesLocal.filter((item) => item.stateCode == stateid);
  }


//reg & login onclickchange function
  goToReg(value) {
    if (value == 'LOGIN') {
      this.loginOrRegister = "LOGIN";
      $('#reg').removeClass("in active");
      $('#sign').addClass("in active");
    } else if (value == 'REGISTRATION') {
      this.loginOrRegister = "REGISTER";
      $('#sign').removeClass("in active");
      $('#reg').addClass("in active");
    }
  }

  getAcademicYears() {
    var firstYear = this.d.getFullYear() - 3;
    var currentYear = this.d.getFullYear();
    for (let i = firstYear; i < currentYear; i++) {
      this.academicYearsList.push(i.toString() + " - " + (i + 1).toString());
    }


  }
  
  getStatus() {
    this.studentService.getStatus().subscribe(data => {
      console.log(data);
      this.statusList = data;

    });
  }

  onInstituteSelect(institutionId)
  {
    this.courseCategoryList = [];
    var institutionListLocal : Institution[] = [];
    institutionListLocal = this.institutionList.filter((item)=> item.institutionId == institutionId);
    
    console.log(this.institutionList);
  
    for(let item of institutionListLocal[0].courseCategoryVos)
    {
      console.log("gdhsfghdsgfh");
      console.log(this.courseCategoryList);
  
        this.courseCategoryList.push(item);
    }
    this.selectedInstitute = institutionListLocal[0].instName.toString();
  
  }
  
  
    onCourseCategorySelect(categoryId)
   {
     console.log(categoryId);
     console.log(this.courseCategoryList);
      this.courseList = [];
      var courseCategoryListLocal : CourseCategory[] = [];
      courseCategoryListLocal = this.courseCategoryList.filter((item)=> item.categoryId == categoryId); 
      for(let item of courseCategoryListLocal[0].courseProfileVos)
      {
          this.courseList.push(item);
      }
      this.selectedCategory = courseCategoryListLocal[0].categoryName.toString();
  
  
  }
  
    onCourseSelect(courseId) {
      this.selectedCourse = courseId.toString();
    }

}
