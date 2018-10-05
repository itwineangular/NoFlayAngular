import { Component, OnInit } from '@angular/core';
import { Status } from './status';
import {StatusService} from './status.service'

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  status: Status= new Status();
  statusList : Status[];

  constructor(private statusService :StatusService ) { }

  ngOnInit() {
    this.getStatus();
  }
  getStatus() {
    this.statusService.getStatus()
      .subscribe(
        (data) => {
          this.statusList = data;
        }
      );

  }

}