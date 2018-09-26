import { Injectable } from '@angular/core';
import { Constants } from "../../../Constants";
import {Http, Headers} from '@angular/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  url = Constants.HOME_URL;

  constructor(private http : Http) { }
  
  saveCourse(course)
  {
    let obj = {
      "courseName": course.courseName,
      "courseCode": course.courseCode,
      "categoryName": course.categoryName,
      "duration": course.duration
      };
   console.log(obj);
    let headers = new Headers({ 
      'Content-Type': 'application/json'
      });
      headers.append('Access-Control-Allow-Origin','*');
      headers.append('Access-Control-Allow-Headers','Content-Type');
      headers.append('Access-Control-Allow-Methods','GET,POST,OPTIONS,DELETE,PUT');
    let options = { headers: headers };
    return this.http.post(this.url+'/courseprofile/create', obj, options);
  }

  updateCourse(course)
  {
    let obj = {
      "courseName": course.courseName,
      "courseCode": course.courseCode,
      "categoryName": course.categoryName,
      "duration": course.duration
      };

      // console.log(obj);
    let headers = new Headers({ 
      'Content-Type': 'application/json'
      });
      headers.append('Access-Control-Allow-Origin','*');
      headers.append('Access-Control-Allow-Headers','Content-Type');
      headers.append('Access-Control-Allow-Methods','GET,POST,OPTIONS,DELETE,PUT');
    let options = { headers: headers };
    return this.http.put(this.url+'/courseprofile/update/'+course.courseId, obj, options);
  }

  getCourse()
  {
    let headers = new Headers();
      headers.append('Access-Control-Allow-Origin','*');
      headers.append('Access-Control-Allow-Headers','Content-Type');
      headers.append('Access-Control-Allow-Methods','GET,POST,OPTIONS,DELETE,PUT');
    let options = { headers: headers };

     return this.http.get(this.url+'/courseprofile/list',options).pipe(map(res => res.json()));
  }

  deleteCourse(courseId)
  {
    let headers = new Headers({ 
        'Content-Type': 'application/json'
        });
      headers.append('Access-Control-Allow-Origin','*');
      headers.append('Access-Control-Allow-Headers','Content-Type');
      headers.append('Access-Control-Allow-Methods','GET,POST,OPTIONS,DELETE,PUT');
    let options = { headers: headers };
     return this.http.get(this.url+'/courseprofile/delete/'+courseId,options);
  }

  searchCourse(course) {
    let obj =
    {
      "courseName": course.courseName,
      "courseCode": course.courseCode,
      "categoryName": course.categoryName,
      "duration": course.duration
    };
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
    let options = { headers: headers };
    return this.http.post(this.url+'/courseprofile/searchList', obj, options).pipe(map(res => res.json()));
  }
}
