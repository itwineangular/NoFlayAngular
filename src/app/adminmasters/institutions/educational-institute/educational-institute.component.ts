import { EducationalInstitute ,CourseCategory,courseProfileVos } from "./educational-institute";
import { CommonServicesService } from "../../../common-services.service";
import { EducationalInstituteServicesService } from './educational-institute-services.service';
import { FileQueueObject, FileuploaderService } from './fileuploader.service';
import { Observable } from 'rxjs';
import { Component, ElementRef, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { CourseCategoryService } from '../course-category/course-category.service';
import { CourseService } from '../courses/courses.service';
import { Course } from '../courses/courses.module';
import Swal from 'sweetalert2';
import { SelectDropDownComponent } from "ngx-select-dropdown";
import * as $ from 'jquery';

@Component({
    selector: 'app-educational-institute',
    templateUrl: './educational-institute.component.html',
    styleUrls: ['./educational-institute.component.css']
})

export class EducationalInstituteComponent implements OnInit {

    alertMassege = "";
    isListContainsData: boolean;
    isSearchClicked: boolean;
    caseInsensitive: boolean = true;

    countries = [];
    statesLocal = [];
    citiesLocal = [];
    states = [];
    cities = [];

   
    courseCategoryListForUpdate: CourseCategory[] = [];

    courseCategoryList: CourseCategory[] = [];
    selectedCourseCategoryList: string[] = [];
    courseListLocalDummy: CourseCategory[] = [];

    

    courseList : courseProfileVos[] = [];
    courseListLocal: courseProfileVos[] = [];
    selectedCourseListGlobal: courseProfileVos[] = [];
    

    selectedCoursecourseList: string[] = [];

    url: any;
    saveOrUpdate: string;
    key: string ;
    reverse: boolean = false;
    pagenumber : string ;
    p: number = 1;
    itemsPerPage2: number = 1;
    public editisCourseCategoryed = false;

    selectedcourseList: Course[];

    institute: EducationalInstitute = new EducationalInstitute();
    instituteList: EducationalInstitute[];
    instituteListLocal: EducationalInstitute[] = [];
    checkboxActivated:boolean = false;

    // tslint:disable-next-line:no-output-on-prefix
    @Output() onCompleteItem = new EventEmitter();

    @ViewChild('fileInput') fileInput;
    queue: Observable<FileQueueObject[]>;

    @ViewChild('instName') public ngSelectinstName: SelectDropDownComponent;
    @ViewChild('instShortName') public ngSelectinstShortName: SelectDropDownComponent;
    @ViewChild('instRegistrationCode') public ngSelectinstRegistrationCode: SelectDropDownComponent;
    @ViewChild('instBranch') public ngSelectinstBranch: SelectDropDownComponent;


    constructor(private commonService: CommonServicesService,
        private service: EducationalInstituteServicesService,
        private courseCategoryService: CourseCategoryService,
        private courseservice: CourseService,
        private uploader: FileuploaderService) { }

    ngOnInit() {
        this.getCountries();
        this.getStates();
        this.getCities();
        this.getCourseCategory();
        this.getCourses();
        this.getInstitutes();
        this.isListContainsData = false;
        this.isSearchClicked=false;


        this.pageChange(5);

        
        $('.btnNext').click(function(){
            $('.nav-tabs > .active').next('li').find('a').trigger('click');
            });
            
            $('.btnPrevious').click(function(){
            $('.nav-tabs > .active').prev('li').find('a').trigger('click');
            });
    }

    selectedInstituteValue: any;
    config = {
        displayKey: "instName", //if objects array passed which key to be displayed defaults to description
        search: true,
        limitTo: this.instituteListLocal.length
    };

    changeInstituteValue($event: any) {

    }

    selectedInstituteShortValue: any;
    InstShortNameconfig = {
        displayKey: "instShortName", 
        search: true,
        limitTo: this.instituteListLocal.length
      
    };

    changeInstituteShortValue($event: any) {

    }

    selectedInstituteRegValue: any;
    InstRegNameconfig = {
        displayKey: "instRegistrationCode", 
        search: true,
        limitTo: this.instituteListLocal.length
       
    };

    changeInstituteRegValue($event: any) {

    }

    selectedInstituteBranchValue: any;
    InstbranchNameconfig = {
        displayKey: "instBranch", 
        search: true,
        limitTo: this.instituteListLocal.length
                                };

    changeInstituteBranchValue($event: any) {

    }
    activeChange(value){
        if(value == "first"){
            $('#test1').removeClass("active");
            $('#test2').addClass("active");
            $('#test3').removeClass("active");
            $('#test4').removeClass("active");
            $('#test1 > a').removeClass('disableTab');
            $('#test1 > a').addClass('enableTab');
        }else if(value == "second"){
            $('#test1').removeClass("active");
            $('#test2').removeClass("active");
            $('#test3').addClass("active");
            $('#test4').removeClass("active");
            $('#test2 > a').removeClass('disableTab');
            $('#test2 > a').addClass('enableTab');

        }else if(value == "third"){
            $('#test1').removeClass("active");
            $('#test2').removeClass("active");
            $('#test3').removeClass("active");
            $('#test4').addClass("active");
            $('#test3 > a').removeClass('disableTab');
            $('#test3 > a').addClass('enableTab');
        }
        
    }
    activeChangePrevious(value){
        if(value == "second"){
            $('#test1').addClass("active");
            $('#test2').removeClass("active");
            $('#test3').removeClass("active");
            $('#test4').removeClass("active");
        }else if(value == "third"){
            $('#test1').removeClass("active");
            $('#test2').addClass("active");
            $('#test3').removeClass("active");
            $('#test4').removeClass("active");

        }else if(value == "fourth"){
            $('#test1').removeClass("active");
            $('#test2').removeClass("active");
            $('#test3').addClass("active");
            $('#test4').removeClass("active");

        }

    }

    searchEducationalInstitute(instituteParameters) {
        var educationLocal: EducationalInstitute= new EducationalInstitute();
              this.isSearchClicked=true;
        if (typeof this.selectedInstituteValue!== 'undefined'  && this.selectedInstituteValue.length>0) 
         {
           educationLocal.instName = this.selectedInstituteValue[0].instName;
         }

         if (typeof this.selectedInstituteShortValue!== 'undefined'  && this.selectedInstituteShortValue.length>0) 
         {
           educationLocal.instShortName = this.selectedInstituteShortValue[0].instShortName;
         }

         if (typeof this.selectedInstituteRegValue!== 'undefined'  && this.selectedInstituteRegValue.length>0) 
         {
           educationLocal.instRegistrationCode = this.selectedInstituteRegValue[0].instRegistrationCode;
         }

         if (typeof this.selectedInstituteBranchValue!== 'undefined'  && this.selectedInstituteBranchValue.length>0) 
         {
           educationLocal.instBranch = this.selectedInstituteBranchValue[0].instBranch;
         }
       
       
         if (typeof educationLocal.instName === 'undefined' 
         && typeof educationLocal.instShortName === 'undefined' 
         && typeof educationLocal.instRegistrationCode === 'undefined' 
         && typeof educationLocal.instBranch === 'undefined') 
         {
           Swal({
             title: 'Invalid!!',
             text: 'Atleast enter any one field.',
             showCancelButton: false,
             confirmButtonText: 'Ok',
           });
           this.isListContainsData = false;
           this.instituteListLocal=[];
          
         }
         else
         {
           this.service.searchEducationalInstitute(educationLocal)
           .subscribe(
             (data) => {
                 console.log(this.instituteList) 
               
               this.instituteList = data;
               if (typeof this.instituteList !== 'undefined' && this.instituteList.length > 0) {
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
    

  
    searchClear() {
        this.institute = new EducationalInstitute();
        this.ngSelectinstName.deselectItem(this.selectedInstituteValue, 0);
        this.ngSelectinstName.ngOnInit();

        this.ngSelectinstShortName.deselectItem(this.selectedInstituteShortValue, 0);
        this.ngSelectinstShortName.ngOnInit();

        this.ngSelectinstRegistrationCode.deselectItem(this.selectedInstituteRegValue, 0);
        this.ngSelectinstRegistrationCode.ngOnInit();

        this.ngSelectinstBranch.deselectItem(this.selectedInstituteBranchValue, 0);
        this.ngSelectinstBranch.ngOnInit();
        

       
    }

    addNew() {
        this.saveOrUpdate = "save";
        this.institute = new EducationalInstitute();
        
    }
    selectedUser(data) {
        this.saveOrUpdate = "update";       
        this.institute = data;
        this.onSelect(this.institute.instCountryname);
        this.onStateSelect(this.institute.instState);

        console.log(data);
        console.log(this.courseCategoryList);
        console.log(this.courseList);

        if(data.courseCategoryVos.length>0)
        {
            data.courseCategoryVos.forEach(element => {
                this.selectedCourseCategoryList.push(element.categoryId);
                var data= this.courseCategoryList.filter(x=>x.categoryId == element.categoryId);
                data[0].isSelected = true;
                var list = this.courseCategoryList.filter(x=>x.categoryId != element.categoryId);
                list.push(data[0]);
                this.courseCategoryList= list;

                element.courseProfileVos.forEach(courseProfile => {
                console.log(courseProfile);
                   var  course : courseProfileVos = new courseProfileVos();
                   course = courseProfile;
                   var xyz = this.courseList.filter(x=>x.courseId == courseProfile.courseId);
                   if(xyz.length>0)
                   {
                    course.courseCategoryVos = xyz[0].courseCategoryVos;
                   }
                   
                   course.isSelected = true;
                   this.courseListLocal.push(course);
                   this.selectedCourseListGlobal.push(course);
                });
            });
        }

        console.log(this.courseCategoryList);
        console.log(this.courseListLocal);

    }
    clickedAlert = function () {
        this.alertMassege = "";
      };
    

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
    getCourseCategory() {
        this.courseCategoryService.getCourseCategory().subscribe(data => {
            this.courseCategoryList = data;
            console.log(this.courseCategoryList);
        });
    }
    getCourses() {
        this.courseservice.getCourse().subscribe(data => {
            this.courseList = data;
            console.log(this.courseList);
        });
    }

    onSelect(countryid) {
        this.states = this.statesLocal.filter((item) => item.countryCode == countryid);
        this.cities = [];
    }

    onStateSelect(stateid) {
        this.cities = this.citiesLocal.filter((item) => item.stateCode == stateid);
    }

    courseCategoryCheckboxSelect(id) {

        if (this.selectedCourseCategoryList.findIndex(x => x === id) >= 0)
        {
          var courseListDummy: courseProfileVos[] = [];
           this.courseListLocal.forEach(element => {
                element.courseCategoryVos.forEach((element2=>{
                    if(element2.categoryId!==id)
                    {

                       courseListDummy.push(element);
                       return;
                    }
                }));
            });
            
            this.courseListLocal = courseListDummy;
            this.selectedCourseCategoryList.splice(this.selectedCourseCategoryList.indexOf(id),1);
        }
        else
        {
            this.courseList.forEach(element => {
                element.courseCategoryVos.forEach(element2 => {
                    if(element2.categoryId==id)
                    {
                        this.courseListLocal.push(element);
                        return;
                    } 
                });  
            });
            this.selectedCourseCategoryList.push(id);
        }

        console.log(this.selectedCourseCategoryList);

    }

    courseCheckboxSelect(course)
        {  
             
        if (this.selectedCourseListGlobal.findIndex(x => x.courseId === course.courseId) >= 0)
        {
            var data = this.selectedCourseListGlobal.filter(x=>x.courseId !== course.courseId);
            this.selectedCourseListGlobal = data;
        }
        else
        {
            this.selectedCourseListGlobal.push(course);
        }
        console.log(this.selectedCourseListGlobal);

        
       

    }


    saveInstitute(institute) {
               if (this.saveOrUpdate == "save") {
                     this.uploader.uploadAll(institute,"image");

            this.service.saveEducationalInstitute(institute, this.selectedCourseCategoryList,this.selectedCourseListGlobal)
                .subscribe(
                    (data) => {
                       this.alertMassege = "New item add on list successfully!!";
                        this.getInstitutes();
                    },
                    (error) => {
                        console.log(error);
                        alert("Try again");
                    }
                );
              


        }
        else if (this.saveOrUpdate == "update") {
           
            this.service.updateEducationalInstitute(this.institute, this.selectedCourseCategoryList,this.selectedCourseListGlobal)
                .subscribe(
                    (data) => {
                        this.alertMassege = "Item updated on list successfully!!";
                        this.getInstitutes();
                       
                    },
                    (error) => {
                        console.log(error);
                        alert("Try again");
                    }
                );

        }
    }

    deleteInstitute(id) {
        this.service.deleteEducationalInstitute(this.institute.institutionId).subscribe(data => {
            this.alertMassege = "Deleted successfully!!";
            this.getInstitutes();
        });
    }


    getInstitutes() {
        this.service.getEducationalInstitute().subscribe(data => {
            this.instituteListLocal = data;
        });
    }





    // file upload
    completeItem = (item: FileQueueObject, response: any) => {
        this.onCompleteItem.emit({ item, response });
    }

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
    // file upload

    pageChange(pagenumber){
  
        this.pagenumber=pagenumber;
      }
    
      customPageChange(number)
      {
        this.p=number;
        this.itemsPerPage2 = number;
        if(this.p==1)
        {
          this.itemsPerPage2 = 1;
        }
        else
        {
          this.itemsPerPage2 = +this.pagenumber;
        }
      }
    

    sort(key){
        this.key = key;
        this.reverse = !this.reverse;
    }

    selectCheckbox(id){
        if($('#'+id).prop('checked')){    
          this.checkboxActivated = true;
        }else{
          this.checkboxActivated = false;
        }
      
      }

}


