import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-board-login',
  templateUrl: './board-login.component.html',
  styleUrls: ['./board-login.component.css']
})
export class BoardLoginComponent implements OnInit {
  form: FormGroup;
  aboveControl = new FormControl(false);
 // user;
  header1: string = 'plain';
  constructor(fb: FormBuilder, 
    public router: Router,
   // public keycloakService: KeycloakService
    ) { 
    this.form = fb.group({
      boardName: ['CBSE Board'],
      mobileEmail: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.initializeUserOptions();
  }

  private initializeUserOptions(): void {
    //this.user = this.keycloakService.getUsername();
    // this.keycloakService.getToken().then((token)=>{
    //   console.log('keyCloak token - ', token);
    //   localStorage.setItem('token', token);
    //   localStorage.setItem('loggedInUser', this.user)
    // });

  }

  logout(): void {
   // this.keycloakService.logout('http://localhost:4200');
  }

  onSubmit(){
    console.log(this.form.value);
    localStorage.setItem('board', JSON.stringify(this.form.value));
    this.router.navigate(['verification',{'for':'board'}]);
  }

  
}

