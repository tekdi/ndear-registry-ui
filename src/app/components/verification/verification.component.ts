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
  header1: string = 'plain';
  constructor(public router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    
    
    // console.log("route", this.route)
    this.route.params.subscribe(params => {
      console.log("route", params)
      this.for = params['for'];
      if(this.for == 'board'){
        console.log("board", JSON.parse(localStorage.getItem('board')))
        this.user_id = JSON.parse(localStorage.getItem('board')).mobileEmail;
      }
      if(this.for == 'admin'){
        this.user_id = JSON.parse(localStorage.getItem('institute-detail')).adminEmail;
      }
      if(this.for == 'teacher'){
        this.user_id = JSON.parse(localStorage.getItem('teachers'))[0].email;
      }
      if(this.for == 'diksha'){
        this.user_id = JSON.parse(localStorage.getItem('consent'))[0].mobileEmail;
      }else{
        var user = localStorage.getItem('user');
        this.user_id = JSON.parse(user).mobileEmail;
      }
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
      // localStorage.setItem('is_logedin', "true")
      console.log(this.for)
      if(this.for == 'student'){
        this.router.navigate(['login']);
      // let id = localStorage.getItem('studentId');
       // this.router.navigate(['student-profile', {'id':id}]);
      }
      if(this.for == 'teacher'){
        this.router.navigate(['login']);
        //let id = localStorage.getItem('teacherId');
       // this.router.navigate(['teacher-profile', {'id':id}]);
      }
      else if(this.for === 'institute'){
        this.router.navigate(['login']);
       // this.router.navigate(['institute-profile']);
      }
      else if(this.for === 'instituteS2'){
        this.router.navigate(['institute-profile-setup'])
      }
      else if(this.for == 'admin'){
        localStorage.setItem('admin', "true")
        let id = localStorage.getItem('institute-entity');//.WhoIsAdmin.emailOrMobile;
        // this.router.navigate(['admin-institute-setup'])
        //this.router.navigate(['institute-profile', {'id' : id}])
      }
      else if(this.for == 'board'){
        this.router.navigate(['board-institutes'])
      }

      if(this.for == 'diksha'){
        this.router.navigate(['consent-auth']);
      }
      
    }else{
      this.error = true
    }
  }

}
