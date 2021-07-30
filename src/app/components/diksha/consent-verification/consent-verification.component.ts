import { Component, OnInit,  Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-consent-verification',
  templateUrl: './consent-verification.component.html',
  styleUrls: ['./consent-verification.component.css']
})
export class ConsentVerificationComponent implements OnInit {

  @Output() modalPage1 = new EventEmitter<any>();
  otp: number;
  user_id: "paras@gmail.com";
  enabled: boolean = true;
  error: boolean = false;
  for: any;
  header1: string = 'plain';
  constructor(public router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.user_id = JSON.parse(localStorage.getItem('consent-user'));
    
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
      // localStorage.setItem('is_logedin', "true")
      console.log(this.for)

      let item = {
        'page' : 'page3'
      }
      this.modalPage1.emit(item);

    }else{
      this.error = true
    }
  }

}
