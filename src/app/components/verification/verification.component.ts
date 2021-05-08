import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {
  otp: number;
  user_id: "paras@gmail.com";
  enabled: boolean = true;
  error: boolean = false;
  for: any;
  constructor(public router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    var user = localStorage.getItem('user');
    this.user_id = JSON.parse(user).mobileEmail;
    // console.log("route", this.route)
    this.route.params.subscribe(params => {
      console.log("route", params)
      this.for = params['for'];
    });
  }
  onOtpChange(otp) {
    this.otp = otp;
    if(this.otp.toString().length == 4){
      this.enabled = false
    }
  }

  onSubmit(){
    if(this.otp == 1234){
      this.error = false
      localStorage.setItem('is_logedin', "true")
      console.log(this.for)
      if(this.for == 'student'){
        this.router.navigate(['student-profile']);
      }
      else if(this.for == 'institute'){
        this.router.navigate(['institute-profile']);
      }
      else if(this.for == 'instituteS2'){
        this.router.navigate(['institute-profile-setup'])
      }
      
    }else{
      this.error = true
    }
  }

}
