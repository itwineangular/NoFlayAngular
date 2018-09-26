import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-accesscontrol',
  templateUrl: './accesscontrol.component.html',
  styleUrls: ['./accesscontrol.component.css']
})
export class AccesscontrolComponent implements OnInit {

  constructor(public router : Router) { }

  ngOnInit() {
  }
  gotoadd(){
    this.router.navigate(['addaccesscontrol']);
  }
}
