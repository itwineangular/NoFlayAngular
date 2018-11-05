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
  saveOrUpdate: boolean = false;
  alertMassege = "";
  
 

  constructor(private service: SmtpDetailsService) { }
 
  ngOnInit() {
    document.getElementById("btnSave").innerText = "Save";
    this.getIntialConfiguration();
    this.getIntialConfiguration2();
    
    this.smtp.host = "5421";
    this.smtp.port="25";
    this.smtp.auth="true";
    this.smtp.connectionTimeout="60";
    this.smtp.Enable="true";
    this.smtp.writeTimeout="30";
  }
  clickedAlert = function () {
    this.alertMassege = "";
  };


  saveIntialConfiguration(smtp) {
    this.service.saveIntialConfiguration(smtp)
      .subscribe(
        (data) => {
          this.alertMassege = data.message;

        },
        (error) => {
          console.log(error);
          alert("Try again");
        }
      );
  }



  getIntialConfiguration() {
    this.service.getIntialConfiguration().subscribe(data => {
      if (data.length !== 0) {
        this.smtp.username = data[0].paramValue1;
        this.smtp.password = data[0].paramValue2;
        document.getElementById("btnSave").innerText = "Update";
      }
    });
  }

  getIntialConfiguration2() {
    this.service.getIntialConfiguration2().subscribe(data => {
      if (data.length !== 0) {
        console.log(data);
      }
    });
  }

}
