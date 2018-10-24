import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { SelectDropDownComponent } from "ngx-select-dropdown";

import * as $ from 'jquery'; 
window["$"] =$; 
window["jQuery"] = $;
import "froala-editor/js/froala_editor.pkgd.min.js";
import { EmailTemplateServicesService } from './email-template-services.service';

@Component({
  selector: 'app-email-template',
  templateUrl: './email-template.component.html',
  styleUrls: ['./email-template.component.css']
})
export class EmailTemplateComponent implements OnInit {

  studentPayment;
  studentCredentials;
  passwordReset;
  hospitalCredentials;
  studentRenewal;

  editorContent;

  constructor(private service : EmailTemplateServicesService) { }

  ngOnInit() {
    this.studentPayment = document.getElementById('studentPayment');
    this.studentCredentials = document.getElementById('studentCredentials');
    this.passwordReset = document.getElementById('passwordReset');
    this.hospitalCredentials = document.getElementById('hospitalCredentials');
    this.studentRenewal = document.getElementById('studentRenewal');
    //this.studentCredentials.style.display = 'none';
    this.hideAllEmailTemplates();

    // this.editorContent = "hello";
  }

  @ViewChild('emailTemplateName') public ngSelectEmailTemplateName: SelectDropDownComponent;

  selectedOptions = [
    {
      "id": 1,
      "name": "Student Payment"
    },
    {
      "id": 2,
      "name": "Student Credentials"
    },
    {
      "id": 3,
      "name": "Password Reset"
    },
    {
      "id": 4,
      "name": "Business Entity Credentials"
    },
    {
      "id": 5,
      "name": "Student Renewal"
    }];

  selectedValue: any;
  config = {
    displayKey: "name",
    search: true,
    limitTo: this.selectedOptions.length
  };
  changeValue($event: any) {
    this.hideAllEmailTemplates();

    if (this.selectedValue.length > 0) {
      if (this.selectedValue[0].id == 1) {
        this.studentPayment.style.display = 'block';
       // (<any>$('div#'+'froalaEditorStudentPayment')).froalaEditor('html.set', '<p>My custom paragraph.</p>');
      }
      else if (this.selectedValue[0].id == 2) {
        this.studentCredentials.style.display = 'block';
      }
      else if (this.selectedValue[0].id == 3) {
        this.passwordReset.style.display = 'block';
      }
      else if (this.selectedValue[0].id == 4) {
        this.hospitalCredentials.style.display = 'block';
      }
      else if (this.selectedValue[0].id == 5) {
        this.studentRenewal.style.display = 'block';
      }
    }

  }

  hideAllEmailTemplates() {
    this.studentPayment.style.display = 'none';
    this.studentCredentials.style.display = 'none';
    this.passwordReset.style.display = 'none';
    this.hospitalCredentials.style.display = 'none';
    this.studentRenewal.style.display = 'none';
  }

  sendEmailTemplateCodeToServer(emailTemplateType)
  {
    var code = "<html><body>"+(<any>$('div#'+emailTemplateType)).froalaEditor('html.get')+"</body</html>";
    this.service.saveEmailTemplate(code).subscribe(
      (data) => {
       console.log(data);
      },
      (error) => {
        console.log(error);
      });
    
  }

}
