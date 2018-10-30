import { Component, OnInit } from '@angular/core';
import { CornJob } from './cornJobModel';
import { CornJobService } from './corn-job.service';
// import Swal from 'sweetalert2';

@Component({
  selector: 'app-corn-job-settings',
  templateUrl: './corn-job-settings.component.html',
  styleUrls: ['./corn-job-settings.component.css']
})
export class CornJobSettingsComponent implements OnInit {

  cornJob: CornJob = new CornJob();
  saveOrUpdate: boolean = false;
  alertMassege = "";

  constructor(private service: CornJobService) { }

  ngOnInit() {
    document.getElementById("btnSave").innerText  = "Save";
    this.getCornJob();
  }
  clickedAlert = function () {
    this.alertMassege = "";
  };

  SaveCornJob(cornJob) {
      this.service.SaveCornJob(cornJob).subscribe(
        (data) => {
          this.alertMassege =data.message;
        },
        (error) => {
          console.log(error);
        });
  }
  getCornJob() {
    this.service.getCornJob().subscribe(data => {
      
      if(data.length!=0)
      {
        let time = data[1].paramValue1.split(" ");
        console.log(time);
        this.cornJob.renewalEmailTime = time[2]+":"+time[1];
        this.cornJob.renewalEmailBefore = data[1].paramValue2;
        document.getElementById("btnSave").innerText  = "Update";
      }
    });
  }

}
