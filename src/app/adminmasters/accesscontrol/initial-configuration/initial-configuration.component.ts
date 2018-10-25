import { Component, OnInit } from '@angular/core';
import { smtpObject } from "./smtpModel";

@Component({
  selector: 'app-initial-configuration',
  templateUrl: './initial-configuration.component.html',
  styleUrls: ['./initial-configuration.component.css']
})
export class InitialConfigurationComponent implements OnInit {

  smtp : smtpObject = new smtpObject();

  constructor() { }

  ngOnInit() {
    this.smtp.host = "smtp.gmail.com";
    this.smtp.port = "587";
    this.smtp.auth = "ssl";
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
