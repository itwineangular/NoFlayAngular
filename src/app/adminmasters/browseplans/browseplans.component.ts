import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlansObject } from "../businessentity/plans/plans-object";
import { Plan } from "./planObject";
import { PlanService } from '../businessentity/plans/plans.service';
import * as _ from 'underscore';
import { StudentService } from '../institutions/student/student.service';
import { PaymentService } from '../payment/payment.service';
import { Student } from '../institutions/student/student';

@Component({
  selector: 'app-browseplans',
  templateUrl: './browseplans.component.html',
  styleUrls: ['./browseplans.component.css']
})
export class BrowseplansComponent implements OnInit {

  studentId: any;
  planList: PlansObject[] = [];
  plans: Plan[] = [];
  membershipname: string;
  planprice: string;
  data: any;

  selectedPlan: Plan = new Plan();
  student: Student = new Student;


  constructor(private route: ActivatedRoute,
    private service: PlanService,
    private router: Router,
    private paymentService: PaymentService,
    private studentService: StudentService) { }

  ngOnInit() {
    this.studentId = +this.route.snapshot.paramMap.get('id');
    this.getPlan();
    this.getStudentDetails(this.studentId);
  }

  getPlan() {
    this.service.getPlan()
      .subscribe(
        (data) => {
          this.planList = data;
          // var data;
          //   data = _.uniq(data, function (p) { return p.planName; });
          var dataLocal = Array.from(new Set(data.map(x => x.planName)));
          var filteredData: any[] = [];
          dataLocal.forEach(element => {
            var dummy = data.filter(x => x.planName == element);
            if (dummy.length > 0) {
              filteredData.push(dummy[0]);
            }
          });
          filteredData.forEach(element => {
            var object: Plan = new Plan();
            var localData = this.planList.filter(x => x.planName == element.planName);
            object = element;
            object.planMembershipsArray = localData;
            this.plans.push(object);
          });
        }
      );
  }

  getStudentDetails(id) {
    this.paymentService.getStudent(id)
      .subscribe(
        (data) => {
          this.student = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  //for picking the selected value from radio button
  onRadioButtonClick(data) {
    this.selectedPlan = data;
  }

  payment() {
    this.student.planId = "" + this.selectedPlan.planId;
    this.studentService.updateStudent(this.student)
      .subscribe(
        (data) => {
         // this.getStudent();
         this.router.navigate(['payment/' + this.student.stdId]);
        },
        (error) => {
          console.log(error);
          alert("Try again");
        }
      );
  }

  // getStudent() {
  //   this.studentService.getStudent()
  //     .subscribe(
  //       (data) => {
  //         this.router.navigate(['payment/' + data[data.length - 1].stdId]);
  //       }
  //     );
  // }

  //navigating the page to payment
  previousPage() {
    this.router.navigate(['payment/' + this.student.stdId]);
  }


}
