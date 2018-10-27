import { Component, OnInit } from '@angular/core';
import { smtpObject } from "./smtpModel";
import { SmtpDetailsService } from "./smtp-details.service";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-smtp-details',
  templateUrl: './smtp-details.component.html',
  styleUrls: ['./smtp-details.component.css']
})
export class SmtpDetailsComponent implements OnInit {

  smtp: smtpObject = new smtpObject();
  alertMassege = "";

  constructor(private service: SmtpDetailsService) { }

  ngOnInit() {
    this.getIntialConfiguration();
  }
  clickedAlert = function () {
    this.alertMassege = "";
  };

  saveIntialConfiguration(form: NgForm) {
    this.service.saveIntialConfiguration(this.smtp)
      .subscribe(
        (data) => {
          this.alertMassege = "New Details added Successfully!!";
          this.getIntialConfiguration();
        },
        (error) => {
          console.log(error);
          alert("Try again");
        }
      );
  }

  getIntialConfiguration() {
    this.service.getIntialConfiguration().subscribe(data => {
      this.smtp = data[0];
    });
  }

}
