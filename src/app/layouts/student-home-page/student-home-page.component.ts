import { Component, OnInit } from '@angular/core';
import { EmailTemplateServicesService } from 'src/app/adminmasters/accesscontrol/email-template/email-template-services.service';
import { StudentHomePageService } from './student-home-page.service';
import { StudentDetailsService } from 'src/app/shared/student-details.service';
import { StudentProfileService } from 'src/app/student-profile/student-profile.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-student-home-page',
  templateUrl: './student-home-page.component.html',
  styleUrls: ['./student-home-page.component.css']
})
export class StudentHomePageComponent implements OnInit {

  passwordResetEmailTemplate : any;
  studentId : number;

  contentManagementImages: any[] = [];
  timeLeft: number = 60;
  interval;
  imageNumberInList: number = 0;

  contentImage1: any;
  contentImage2: any;
  contentImage3: any;
  contentImage4: any;

  constructor(private emailTemplateservice: EmailTemplateServicesService,
    public router: Router,
   
    private studentHomePageService : StudentHomePageService,
    private studentDetailsService : StudentDetailsService,
    private studentProfileService : StudentProfileService) { }

  ngOnInit() {
    this.getImages();
    this.getEmailTemplate("PasswordReset");
    var studentEmail = this.studentDetailsService.getStudentEmail();
    console.log(studentEmail);
    this.getStudentDetails(studentEmail);
    
    this.startTimer();
  }

  getEmailTemplate(templateName) {
    this.emailTemplateservice.getEmailTemplate(templateName).subscribe(data => {
   this.passwordResetEmailTemplate = data;
      console.log(data);
    });
  }

  getStudentDetails(studentEmail : string) : void
  {
    this.studentProfileService.getStudent(studentEmail).subscribe(
      (data)=>{
        console.log("datasdgsdg");
        this.studentId = data.stdId;
        this.studentDetailsService.saveStudentDetails(data);
      }
    );

  }

  passwordReset() {
    this.studentHomePageService.sendStudentPasswordResetRequestMail(this.studentId,this.passwordResetEmailTemplate)
    .subscribe(
      (data) => {
        console.log(data);
        alert("mail sent");
      },
      (error) => {
        console.log(error);
      }
    );  
  }

  logout()
  {
    console.log("Logout");
    
    this.router.navigate(['/studentlogin']);
    // this.authService.logout();
    // this.router.navigate(['/adminlogin']);
    // window.location.replace('');
  }

  getImages() {
    // console.log("getim");
    this.studentHomePageService.getImages()
      .subscribe(
        (data) => {
          // console.log("tgj");
          console.log(data);

          this.contentManagementImages = data
          console.log(this.contentManagementImages);
          if (this.contentManagementImages.length > 0) {
            this.addImagesToUrl(this.imageNumberInList);
          }
        }
      );

  }

  startTimer() {
    //console.log("timer");
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 60;
        this.addImagesToUrl(this.imageNumberInList);
        //console.log("here");
      }
    }, 100)
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  addImagesToUrl(number): void {
    var statrNumber = number;
    var numberForNextIteration = -1;

    this.contentImage1 = "";
    this.contentImage2 = "";
    this.contentImage3 = "";
    this.contentImage4 = "";

    for (var i = statrNumber; i < statrNumber + 4; i++) {
      switch (i) {
        case statrNumber:
          if (this.contentManagementImages.length > i) {
            this.contentImage1 = this.contentManagementImages[i].fileName;
          }
          else {
            if (numberForNextIteration == -1) {
              numberForNextIteration = 0;
            }
            this.contentImage1 = this.contentManagementImages[numberForNextIteration].fileName;
            numberForNextIteration++;
          }
          break;
        case statrNumber + 1:
          if (this.contentManagementImages.length > i) {
            this.contentImage2 = this.contentManagementImages[i].fileName;
          }
          else {
            if (numberForNextIteration == -1) {
              numberForNextIteration = 0;
            }
            this.contentImage2 = this.contentManagementImages[numberForNextIteration].fileName;
            numberForNextIteration++;
          }
          break;
        case statrNumber + 2:
          if (this.contentManagementImages.length > i) {
            this.contentImage3 = this.contentManagementImages[i].fileName;
          }
          else {
            if (numberForNextIteration == -1) {
              numberForNextIteration = 0;
            }
            this.contentImage3 = this.contentManagementImages[numberForNextIteration].fileName;
            numberForNextIteration++;
          }
          break;
        case statrNumber + 3:
          if (this.contentManagementImages.length > i) {
            this.contentImage4 = this.contentManagementImages[i].fileName;
          }
          else {
            if (numberForNextIteration == -1) {
              numberForNextIteration = 0;
            }
            this.contentImage4 = this.contentManagementImages[numberForNextIteration].fileName;
            numberForNextIteration++;
          }
          break;
      }
    }

    if(numberForNextIteration != -1)
    {
      this.imageNumberInList = numberForNextIteration;
    }
    else
    {
      this.imageNumberInList = number + 4;
    }
    
  }
}
