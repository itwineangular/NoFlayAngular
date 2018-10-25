import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { SelectDropDownComponent } from "ngx-select-dropdown";
import Swal from 'sweetalert2';

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

  constructor(private service : EmailTemplateServicesService) { }

  ngOnInit() {
    this.studentPayment = document.getElementById('studentPayment');
    this.studentCredentials = document.getElementById('studentCredentials');
    this.passwordReset = document.getElementById('passwordReset');
    this.hospitalCredentials = document.getElementById('hospitalCredentials');
    this.studentRenewal = document.getElementById('studentRenewal');
    this.hideAllEmailTemplates();
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
        this.getEmailTemplate("froalaEditorStudentPayment","StudentPayment");
      }
      else if (this.selectedValue[0].id == 2) {
        this.studentCredentials.style.display = 'block';
        this.getEmailTemplate("froalaEditorStudentCredentials","StudentCredentials");
      }
      else if (this.selectedValue[0].id == 3) {
        this.passwordReset.style.display = 'block';
        this.getEmailTemplate("froalaEditorPasswordReset","PasswordReset");
      }
      else if (this.selectedValue[0].id == 4) {
        this.hospitalCredentials.style.display = 'block';
        this.getEmailTemplate("froalaEditorHospitalCredentials","BusinessCredentials");
      }
      else if (this.selectedValue[0].id == 5) {
        this.studentRenewal.style.display = 'block';
        this.getEmailTemplate("froalaEditorStudentRenewal","StudentRenewal");
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

  sendEmailTemplateCodeToServer(templateName , emailTemplateType)
  {
    var code = "<html><body>"+(<any>$('div#'+emailTemplateType)).froalaEditor('html.get')+"</body</html>";
    this.service.saveEmailTemplate(templateName,code).subscribe(
      (data) => {
       console.log(data);
       Swal({
        title: 'Success',
        text: data.message,
        showCancelButton: false,
        confirmButtonText: 'Ok',
      });
      },
      (error) => {
        console.log(error);
      });
  }

  getEmailTemplate(editorId,templateName) {
    this.service.getEmailTemplate(templateName).subscribe(data => {
     (<any>$('div#'+editorId)).froalaEditor('html.set', data.emailContent); 
    });
  }

}
