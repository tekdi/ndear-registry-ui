import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  constructor(public router: Router) { }

  ngOnInit(): void {
    var user = localStorage.getItem('user');
    this.user_id = JSON.parse(user).mobileEmail
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
      this.router.navigate(['student-profile']);
    }else{
      this.error = true
    }
  }

}
