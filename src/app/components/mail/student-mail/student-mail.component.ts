import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-student-mail',
  templateUrl: './student-mail.component.html',
  styleUrls: ['./student-mail.component.css']
})
export class StudentMailComponent implements OnInit {
  student;
  institute;
  loginScreen : boolean = false;
  header1: string = 'plain';
  constructor(
    public keycloakService: KeycloakService
  ) { }

  ngOnInit(): void {
    this.student = JSON.parse(localStorage.getItem('students'))[0];
    this.institute = JSON.parse(localStorage.getItem('institute-detail'));
    // this.user = JSON.parse(localStorage.getItem('user'));
  }

  login(){
    this.keycloakService.logout('https://ndear.xiv.in/student-profile');
  }

  register()
  {
    this.loginScreen = !this.loginScreen;
  }

}
