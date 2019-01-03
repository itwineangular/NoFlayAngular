import { Injectable } from '@angular/core';
import { Constants } from "../../../Constants";
import {Http, Headers} from '@angular/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  url = Constants.HOME_URL;
  tokens = sessionStorage.getItem("token_type");


  constructor(private http : Http) { }
  // CourseCategoryVo: any;
  saveCourse(course)
  {
    console.log(course);
    let obj=  {
      "courseName":course.courseName,
      "courseCode":course.courseCode,
      "duration": course.duration,
      "courseCategoryList": [{
                      "categoryId":course.categoryName
                  }]   
      }
      
   console.log(obj);
    let headers = new Headers({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokens
      });
     
    let options = { headers: headers };
    return this.http.post(this.url+'/courseprofile/create', obj, options);
  }

  updateCourse(course)
  {
    console.log(course);
    let obj=  {
      "courseName":course.courseName,
      "courseCode":course.courseCode,
      "duration": course.duration,
      "courseCategoryList": [{
                      "categoryId":course.categoryName
                  }]   
      }
      
      console.log(obj);
    let headers = new Headers({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokens
      });
     
    let options = { headers: headers };
    // return this.http.put(this.url+'/courseprofile/update/'+course.courseId, obj, options);
    return this.http.put(this.url+'/courseprofile/update/'+course.courseId, obj, options);
  }

  getCourse()
  {
    let headers = new Headers({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokens
      });
    let options = { headers: headers };

     return this.http.get(this.url+'/courseprofile/list',options).pipe(map(res => res.json()));
  }

  deleteCourse(courseId)
  {
    let headers = new Headers({ 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.tokens
        });
      
    let options = { headers: headers };
     return this.http.get(this.url+'/courseprofile/delete/'+courseId,options);
  }

  searchCourse(course) {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.tokens
    });
   
    let options = { headers: headers };
    
    return this.http.get(this.url+'/courseprofile/searchCourse?courseName='+course.courseName+'&courseCode='+course.courseCode+'&categoryId='+course.categoryName+'&duration='+course.duration+'',options).pipe(map(res => res.json()));

  }
}
