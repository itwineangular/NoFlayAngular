import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ILogin } from './login';
import { AuthService } from "./auth.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  model: ILogin = { userid: "admin", password: "1234" };
  loginForm: FormGroup;
  returnUrl: string;

  constructor(private formBuilder: FormBuilder, private router: Router, public authService: AuthService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userid: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.returnUrl = '/coursecategory';
    this.authService.logout();
  }
  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  login() {
    if (this.loginForm.invalid) {
      Swal({
        title: 'Credentials !!',
        text: 'Please enter user credentials to login.',
        showCancelButton: false,
        confirmButtonText: 'Ok',
      });
      return;
    }
    else {
      if (this.f.userid.value == this.model.userid && this.f.password.value == this.model.password) {
        localStorage.setItem('isLoggedIn', "true");
        localStorage.setItem('token', this.f.userid.value);
        this.router.navigate([this.returnUrl]);
      }
      else {
        Swal({
          title: 'Invalid User !!',
          text: 'Please enter valid credentials.',
          showCancelButton: false,
          confirmButtonText: 'Ok',
        });
      }
    }
  }

}
