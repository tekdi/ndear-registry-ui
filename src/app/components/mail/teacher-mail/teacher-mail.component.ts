import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-mail',
  templateUrl: './teacher-mail.component.html',
  styleUrls: ['./teacher-mail.component.css']
})
export class TeacherMailComponent implements OnInit {
  teacher;
  institute;
  constructor(
    public keycloakService: KeycloakService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.teacher = JSON.parse(localStorage.getItem('teachers'))[0];
    this.institute = JSON.parse(localStorage.getItem('institute-detail'));
    // this.user = JSON.parse(localStorage.getItem('user'));
  }

  login(){
    alert('hi');
   // this.keycloakService.logout();
   // this.router.navigate(['teacher-profile']);
   this.keycloakService.logout('http://localhost:4200/teacher-profile');


  }

}