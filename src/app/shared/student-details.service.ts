import { Injectable } from '@angular/core';
import { Student } from '../adminmasters/institutions/student/student';

@Injectable({
  providedIn: 'root'
})
export class StudentDetailsService {

  constructor() { }

  studentEmail : string;
  student : Student = new Student();


  saveStudentEmail(studentEmail : string): void
  {
    this.studentEmail = studentEmail;
  }

  getStudentEmail(): string
  {
    return this.studentEmail;
  }

  saveStudentDetails(student : Student) : void
  {
   this.student = student;
  }

  getStudentId(): number
  {
    return this.student.stdId ;
  }


}