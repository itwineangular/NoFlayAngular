import { EducationalInstitute ,CourseCategory, CourseProfile } from "./educational-institute";
import { CommonServicesService } from "../../../common-services.service";
import { EducationalInstituteServicesService } from './educational-institute-services.service';
import { FileQueueObject, FileuploaderService } from './fileuploader.service';
import { Observable } from 'rxjs';
import { Component, ElementRef, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { CourseCategoryService } from '../course-category/course-category.service';
import { CourseService } from '../courses/courses.service';
import { Course } from '../courses/courses.module';
// import { CourseCategory } from "../course-category/course-category.module";

@Component({
    selector: 'app-educational-institute',
    templateUrl: './educational-institute.component.html',
    styleUrls: ['./educational-institute.component.css']
})

export class EducationalInstituteComponent implements OnInit {

    alertMassege = "";
    countries = [];
    statesLocal = [];
    citiesLocal = [];
    states = [];
    cities = [];

    courseCategoryList: CourseCategory[] = [];
    selectedCourseCategoryList: string[] = [];
    courseListLocalDummy: CourseCategory[] = [];
    courseListLocal: CourseProfile[] = [];
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

    // tslint:disable-next-line:no-output-on-prefix
    @Output() onCompleteItem = new EventEmitter();

    @ViewChild('fileInput') fileInput;
    queue: Observable<FileQueueObject[]>;

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
        // this.getCourses();
        this.getInstitutes();
        this.pageChange(5);
    }

    searchInstitute(instituteParameters) {
        this.service.searchEducationalInstitute(instituteParameters.value)
            .subscribe(
                (data) => {
                    this.instituteList = data;
                },
                (error) => {
                    console.log(error);
                    alert("Try again");
                }
            );
    }

    searchClear() {
        this.institute = new EducationalInstitute();
        this.service.searchEducationalInstitute(this.institute)
            .subscribe(
                (data) => {
                    this.instituteList = data;
                },
                (error) => {
                    console.log(error);
                    alert("Try again");
                }
            );
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
    getCourseCategory() {
        this.courseCategoryService.fetchCourseCategory().subscribe(data => {
            this.courseCategoryList = data;
            console.log(this.courseCategoryList);
        });
    }
    getCourses() {
        // this.courseservice.getCourse().subscribe(data => {
        //     this.courseList = data;
        //     console.log(this.courseList);
        // });
    }

    onSelect(countryid) {
        this.states = this.statesLocal.filter((item) => item.countryCode == countryid);
        this.cities = [];
    }

    onStateSelect(stateid) {
        this.cities = this.citiesLocal.filter((item) => item.stateCode == stateid);
    }

    courseCategoryCheckboxSelect(id) {
        
        this.editisCourseCategoryed = true;
        if (this.selectedCourseCategoryList.findIndex(x => x === id) >= 0)
        {
            this.courseListLocalDummy = this.courseCategoryList.filter((item) => item.categoryId == id);
            for (let entry of this.courseListLocalDummy)
            {
                for (let item of entry.courseProfile)
                {
                    this.courseListLocal.splice(this.courseListLocal.indexOf(item),1);
                    this.selectedCoursecourseList.splice(this.courseListLocal.indexOf(id),1);
                }
            }
            this.selectedCourseCategoryList.splice(this.selectedCourseCategoryList.indexOf(id),1);
        }
        else 
        {
            this.courseListLocalDummy = this.courseCategoryList.filter((item) => item.categoryId == id);
            for (let entry of this.courseListLocalDummy)
            {
                for (let item of entry.courseProfile)
                {
                    this.courseListLocal.push(item);
                }
            }
            this.selectedCourseCategoryList.push(id);
        }

    }

    courseCheckboxSelect(id)
    {
        if (this.selectedCoursecourseList.findIndex(x => x === id) >= 0)
        {
            this.selectedCoursecourseList.splice(this.selectedCoursecourseList.indexOf(id),1);
        }
        else
        {
            this.selectedCoursecourseList.push(id);
        }
        console.log(this.selectedCoursecourseList);

    }


    saveInstitute(institute) {
        if (this.saveOrUpdate == "save") {
            console.log("save");
            this.uploader.uploadAll(institute,"image");

            this.service.saveEducationalInstitute(institute, this.selectedCourseCategoryList,this.selectedCoursecourseList)
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
            // var selectedCourses = [];
            // var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')
            // for (var i = 0; i < checkboxes.length; i++) {
            //     selectedCourses.push(checkboxes[i].id);
            // }
            this.service.updateEducationalInstitute(this.institute, this.selectedCourseCategoryList)
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
            this.instituteList = data;
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

}


