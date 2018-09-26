import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider } from 'angular-6-social-login';
declare var $: any;
// declare var $lang: any;

@Component({
  selector: 'app-studentlogin',
  templateUrl: './studentlogin.component.html',
  styleUrls: ['./studentlogin.component.css']
})
export class StudentloginComponent implements OnInit {
  partytype: any;
  loginOrRegister: string;
  selectedLanguage: string;

  constructor(private socialAuthService: AuthService,
    private translate: TranslateService) {
      translate.setDefaultLang('en');

    //   $(document).ready(function(){
    //     $(this).scrollTop(0);
    // });

     }

  ngOnInit() {

    $(document).ready(function(){
      $(this).scrollTop(0);
  });

    this.loginOrRegister = "LOGIN";
    this.selectedLanguage = "ENGLISH";

    // Add smooth scrolling to all links in navbar + footer link
    $(".navbar a, footer a[href='#myPage']").on('click', function (event) {
      // Make sure this.hash has a value before overriding default behavior
      if (this.hash !== "") {
        // Prevent default anchor click behavior
        event.preventDefault();

        // Store hash
        var hash = this.hash;

        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 900, function () {

          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        });
      } // End if

      $(window).scroll(function () {
        $(".slideanim").each(function () {
          var pos = $(this).offset().top;

          var winTop = $(window).scrollTop();
          if (pos < winTop + 600) {
            $(this).addClass("slide");
          }
        });
      });
    });


    // ki
    // $(document).ready(function(){
    //   ///hover container lang menu
    //   $("#lang-menu").hover(
    //     function(){
    //         $(this).addClass("cls-border-lang");
    //         $(this).children().eq(0).addClass("cls-borderbottom-lang");
    //         $("#lang-menu ul").stop().slideToggle(100);
    //     },
    //     function(){
    //          $(this).removeClass("cls-border-lang");
    //         $(this).children().eq(0).removeClass("cls-borderbottom-lang");
    //         $("#lang-menu ul").stop().slideToggle(100);  
    //     }
    //   );
    //   /// click languages
    //   $("#lang-menu ul li a").on("click", function(){
    //       //select lang and apply changes
    //       $lang = $(this).text();
    //       alert("$lang");
    //       $("#lang-menu li a").text($lang);
          
    //   });
    
    // });

    // ki

  }

  changeLanguage()
  {
    if(this.selectedLanguage=="ENGLISH")
    {
      this.selectedLanguage = "FRENCH";
      this.translate.use('fr'); 

      if(this.loginOrRegister == "REGISTER")
      {
        this.loginOrRegister="REGISTRE";
      }
      else if(this.loginOrRegister == "LOGIN")
      {
        this.loginOrRegister="S'IDENTIFIER";
      }
      
    }
    else if(this.selectedLanguage=="FRENCH")
    {
      this.selectedLanguage = "ENGLISH";
      this.translate.use('en'); 

      if(this.loginOrRegister == "REGISTRE")
      {
        this.loginOrRegister="REGISTER";
      }
      else if(this.loginOrRegister == "S'IDENTIFIER")
      {
        this.loginOrRegister="LOGIN";
      }
    }
    
  }

  regester() {

    if(this.selectedLanguage=="ENGLISH")
    {
      this.loginOrRegister = "REGISTER";
    }
    else if(this.selectedLanguage=="FRENCH")
    {
      this.loginOrRegister="REGISTER";
    }

    // this.loginOrRegister = "REGISTER";
  }

  login() {
    if(this.selectedLanguage=="ENGLISH")
    {
      this.loginOrRegister = "LOGIN";
    }
    else if(this.selectedLanguage=="FRENCH")
    {
      this.loginOrRegister="S'IDENTIFIER";
    }
    // this.loginOrRegister = "LOGIN";
  }

  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform == "facebook") {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialPlatform == "google") {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform + " sign in data : ", userData);
        // Now sign-in with userData
        // ...

      }
    );
  }





}
