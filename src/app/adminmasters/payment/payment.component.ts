import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../institutions/student/student';
import { PaymentService } from './payment.service';
import { PlansObject } from "../businessentity/plans/plans-object";
import { PlanService } from '../businessentity/plans/plans.service';
import Swal from 'sweetalert2';
import { PaymentCardDetailsService } from "../../shared/payment-card-details.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  amount: string;
  browsePlan: string;
  cardType : string;

  // student: any;
  alertMassege = "";
  iban_no: any;
  
  expiredate: any;
  cvv_no:any;
  payment_Mode:any;
  refrence_Number:any;
   d : Date = new Date();
  payment_Date :any = this.d;

  student: Student = new Student;
  planList: PlansObject[] = [];
  selectedPlan: PlansObject = new PlansObject();
 // carddetails: PaymentDetails = new PaymentDetails();


  constructor(private route: ActivatedRoute,
    private service: PaymentService,
    private planService: PlanService,
  private paymentCardDetailsService : PaymentCardDetailsService,
private router : Router) { }

  ngOnInit() {

    const id = +this.route.snapshot.paramMap.get('id');
    this.getStudentDetails(id);
    // this.amount = localStorage.getItem("amount");
    // this.browsePlan = localStorage.getItem("plan");
    this.getPaymentCardDetails();
  }

  getPaymentCardDetails() : void
  {
    var data;
    this.paymentCardDetailsService.getCardDetails()
    .subscribe(cardDetail =>data = cardDetail);
    this.iban_no = data.cardNumber;
    this.expiredate = data.expiryDate;
    this.cvv_no = data.cvvNumber;
    this.payment_Mode = data.paymentMode;
    this.refrence_Number = data.paymentReference;
    // this.payment_Date = data.paymentDate;
  }

  //navigating the page to browseplans
  changePlan()
  {
    this.paymentCardDetailsService.addCardDetails(this.iban_no,this.expiredate,this.cvv_no);
    this.router.navigate(['browseplans/' + this.student.stdId]);
  }

  browsePlans() {
    // this.saveOrUpdate = "save";
    // this.membership = new MembershipObject();
    // this.browsePlans = new 
  }

  // validation for card
  mychange(val) {
    const self = this;
    let chIbn = val.split('-').join('');
    if (chIbn.length > 0) {
      chIbn = chIbn.match(new RegExp('.{1,4}', 'g')).join('-');
    }
    console.log(chIbn);
    this.iban_no = chIbn;
  }

   // validation for date
   mychangeexpiredate(val) {
    const self = this;
    let chIbn = val.split('/').join('');
    if (chIbn.length > 0) {
      chIbn = chIbn.match(new RegExp('.{1,2}', 'g')).join('/');
    }
    console.log(chIbn);
    this.expiredate = chIbn;
  }

    // validation for cvv number
    mychangecvv(val)
    {
      this.cvv_no = val;
     console.log(this.cvv_no);
    }

    getStudentDetails(id) {
      console.log(id);
      this.service.getStudent(id)
        .subscribe(
          (data) => {
            this.student = data;
            this.getPlan(+ this.student.plan);
          },
          (error) => {
            console.log(error);
          }
        );
    }

    getPlan(id: number) {
      this.planService.getPlan().subscribe(data => {
        this.planList = data;
        var PlansData = this.planList.filter(x => x.planId == id);
        if (PlansData.length > 0) {
          this.selectedPlan = PlansData[0];
        }
      });
    }

    payment(id)
    {
      var randomNum =Math.floor(Math.random() * 99999) + 1 ;
      console.log(this.payment_Date); 
      this.service.payment(id,this.iban_no,randomNum,this.payment_Date,this.cardType)
        .subscribe(
          (data) => {
            console.log("date"+this.payment_Date);
            Swal({
              title: 'Success!!',
              text: data.message,
              showCancelButton: false,
              confirmButtonText: 'Ok',
             
            });
            this.reset();
        
          },
          (error) => {
            console.log(error);
          }
        );
  
    }

    debitCardClick()
  {
    this.cardType = "DebitCard";

  }

  creditCardClick()
  {
    this.cardType = "CreditCard ";
  }

  netBanking()
  {
    this.cardType = "Net Banking";
  }

  reset()
  {
    
  }

}
