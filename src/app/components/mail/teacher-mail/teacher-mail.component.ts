import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Router } from '@angular/router';
import { ToastMessageService } from '../../../services/toast-message/toast-message.service';

@Component({
  selector: 'app-teacher-mail',
  templateUrl: './teacher-mail.component.html',
  styleUrls: ['./teacher-mail.component.css']
})
export class TeacherMailComponent implements OnInit {
  teacher;
  institute;
  loginScreen : boolean = false;
  header1: string = 'plain';
  emailId : string = "";

  constructor(
    public keycloakService: KeycloakService,
    public router: Router,
    public toastMsg : ToastMessageService
  ) { }

  ngOnInit(): void {
    this.teacher = JSON.parse(localStorage.getItem('teachers'))[0];
    this.institute = JSON.parse(localStorage.getItem('institute-detail'));
    // this.user = JSON.parse(localStorage.getItem('user'));
  }

  login(){
    this.keycloakService.logout('https://ndear.xiv.in');
  }

  register()
  {
    this.loginScreen = !this.loginScreen
  }

}