import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-student-teacher-login',
  templateUrl: './student-teacher-login.component.html',
  styleUrls: ['./student-teacher-login.component.css']
})
export class StudentLoginComponent implements OnInit {
  form: FormGroup;
  aboveControl = new FormControl(false);
  header1: string = 'plain';
  user;

  constructor(fb: FormBuilder, public router: Router,
    public keycloakService: KeycloakService) { 
    this.form = fb.group({
      above: this.aboveControl,
      fullName: ['Paras Patel'],
      gaurdianfullName: [''],
      relation: [''],
      mobileEmail: ['', Validators.required],
      accepted: true
    });
  }

  ngOnInit(): void {
    this.user = this.keycloakService.getUsername();
    this.keycloakService.getToken().then((token)=>{
      console.log('keyCloak token - ', token);
      localStorage.setItem('token', token);
      localStorage.setItem('loggedInUser', this.user)
    });
  }

  onSubmit(){
    console.log(this.form.value);
    localStorage.setItem('user', JSON.stringify(this.form.value));
    localStorage.setItem('education','[]');
    this.router.navigate(['verification',{'for':'student'}]);
  }

  private initializeUserOptions(): void {
    this.user = this.keycloakService.getUsername();
    // this.keycloakService.getToken().then((token)=>{
    //   console.log('keyCloak token - ', token);
    //   localStorage.setItem('token', token);
    //   localStorage.setItem('loggedInUser', this.user)
    // });

  }

  logout(): void {
    this.keycloakService.logout('https://ndear.xiv.in/');
  }


  
}
