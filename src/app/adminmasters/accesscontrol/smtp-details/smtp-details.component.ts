import { Component, OnInit } from '@angular/core';
import { smtpObject } from "./smtpModel";

@Component({
  selector: 'app-smtp-details',
  templateUrl: './smtp-details.component.html',
  styleUrls: ['./smtp-details.component.css']
})
export class SmtpDetailsComponent implements OnInit {

  smtp : smtpObject = new smtpObject();
  constructor() { }

  ngOnInit() {
    this.smtp.host = "smtp.gmail.com";
    this.smtp.port = "587";
    this.smtp.auth = true;
    this.smtp.username = "mcmservice536@gmail.com";
    this.smtp.password = "mcm1234#";
    this.smtp.defaultFromEmail = "mcmservice536@gmail.com";
    this.smtp.connectionTimeout = "5000";
    this.smtp.timeout = "5000";
    this.smtp.writeTimeout = "5000";
    this.smtp.Enable = true;
    this.smtp.Required =true;
  }

}
