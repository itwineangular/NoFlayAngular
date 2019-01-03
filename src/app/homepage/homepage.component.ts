import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ILogin } from './login';
import { AuthService } from "./auth.service";
import { HomepageService } from './homepage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  // model: ILogin = { userid: "admin", password: "1234" };
  loginForm: FormGroup;
  returnUrl: string;

  isLoginError: boolean = false;
  login: ILogin = new ILogin();

  constructor(private formBuilder: FormBuilder, 
    private router: Router,
    public authService: AuthService,
    private homeService: HomepageService) { }

  ngOnInit() {


   

    // this.loginForm = this.formBuilder.group({
    //   userid: ['', Validators.required],
    //   password: ['', Validators.required]
    // });
    // this.returnUrl = '/coursecategory';
    // this.authService.logout();
  }
  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }


  Onlogin(username,password) {
   // this.router.navigate([this.returnUrl]);
    this.homeService.userAuthentication(username, password)
      .subscribe(
        (res:any) => {
          // localStorage.setItem('token_type', res.access_token);
          sessionStorage.setItem('token_type', res.access_token);
          // localStorage.setItem('isLogin',"true");
        // this.router.navigate([this.returnUrl]);
         this.router.navigate(['/emailTemplate']);
        // this.router.navigate(['coursecategory/' ]);
        // window.location.href = "http://localhost:4200/user";
        },
        (error) => {
          this.isLoginError = true;
          alert("Invalid Credentials");
          

        }
      );

  }

  // logOut()
  // {
  //   sessionStorage.removeItem('token_type');
  //   this.router.navigate(['/adminlogin']);
  // }
  

}

  // login() {
  //   if (this.loginForm.invalid) {
  //     Swal({
  //       title: 'Credentials !!',
  //       text: 'Please enter user credentials to login.',
  //       showCancelButton: false,
  //       confirmButtonText: 'Ok',
  //     });
  //     return;
  //   }
  //   else {
  //     if (this.f.userid.value == this.model.userid && this.f.password.value == this.model.password) {
  //       localStorage.setItem('isLoggedIn', "true");
  //       localStorage.setItem('token', this.f.userid.value);
  //       this.router.navigate([this.returnUrl]);
  //     }
  //     else {
  //       Swal({
  //         title: 'Invalid User !!',
  //         text: 'Please enter valid credentials.',
  //         showCancelButton: false,
  //         confirmButtonText: 'Ok',
  //       });
  //     }
  //   }
  // }



