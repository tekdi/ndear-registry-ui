import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  @Input() headerFor: string;
  @Input() tab: string;
  loged_in: boolean = false;institute: any;
  education: any;
  experience: any;
  user: any;
;
  user_name;
  admin: boolean = false;
  admin_setup: boolean = false;
  attestation_count: number = 0
  consent_count: number = 0
  constructor() { }

  ngOnInit(): void {
    console.log(this.headerFor,this.tab);
    this.loged_in = JSON.parse(localStorage.getItem('is_logedin'))
    // console.log(Boolean(localStorage.getItem('is_logedin')))
    if(this.loged_in){
      this.admin = JSON.parse(localStorage.getItem('admin'))
      this.admin_setup = JSON.parse(localStorage.getItem('admin-setup'))
      if(JSON.parse(localStorage.getItem('user')) != null){
        this.user = JSON.parse(localStorage.getItem('user'))
        this.user_name = this.user.fullName;
      }
      this.institute = JSON.parse(localStorage.getItem('institute-detail'));
      if(this.headerFor == 'institute'){
        this.education = JSON.parse(localStorage.getItem('education'));
        if(this.education != null && this.education.length > 0){
          this.education.forEach(element => {
            if(element.attested == "pending"){
              this.attestation_count += 1
            }
          });
          // this.attestation_count = this.attestation_count + this.education.length
        }
        this.experience = JSON.parse(localStorage.getItem('experience'));
        if(this.experience != null && this.experience.length > 0){
          this.experience.forEach(element => {
            if(element.attested == "pending"){
              this.attestation_count += 1
            }
          });
          // this.attestation_count = this.attestation_count + this.experience.length
        }
        
        console.log("this.attestation_count",this.attestation_count)
      }
      if(this.headerFor == 'teacher'){
        if(this.user.consent  === true){
          this.consent_count = 1
        }
          // this.attestation_count = this.attestation_count + this.education.length
        }
    }
  }

}
