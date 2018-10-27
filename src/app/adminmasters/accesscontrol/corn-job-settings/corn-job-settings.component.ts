import { Component, OnInit } from '@angular/core';
import { CornJob } from './cornJobModel';
import { CornJobService } from './corn-job.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-corn-job-settings',
  templateUrl: './corn-job-settings.component.html',
  styleUrls: ['./corn-job-settings.component.css']
})
export class CornJobSettingsComponent implements OnInit {

  cornJob: CornJob = new CornJob();

  constructor(private service: CornJobService) { }

  ngOnInit() {
    this.getCornJob();
  }

  SaveCornJob(cornJob) {
    console.log(cornJob);
    this.service.SaveCornJob(cornJob).subscribe(
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
  getCornJob() {
    this.service.getCornJob().subscribe(data => {
      console.log(data);
      this.cornJob = data;
    });
  }

}
