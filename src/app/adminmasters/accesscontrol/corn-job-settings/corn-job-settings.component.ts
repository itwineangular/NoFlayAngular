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
    if (this.saveOrUpdate) {
      this.service.UpdateCornJob(cornJob).subscribe(
        (data) => {
          this.alertMassege =data.message;
        },
        (error) => {
          console.log(error);
        });
    }
    else {
      console.log(cornJob);
      console.log("cornJob");
      this.service.SaveCornJob(cornJob).subscribe(
        (data) => {
          this.alertMassege =data.message;
        },
        (error) => {
          console.log(error);
        });
    }
  }
  getCornJob() {
    this.service.getCornJob().subscribe(data => {
      
      if(data.length!=0)
      {
        console.log(data);
       this.cornJob = data[0];
       this.saveOrUpdate = true;
        document.getElementById("btnSave").innerText  = "Update";
      }
    });
  }

}
