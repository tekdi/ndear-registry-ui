import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-institute-mail',
  templateUrl: './institute-mail.component.html',
  styleUrls: ['./institute-mail.component.css']
})
export class InstituteMailComponent implements OnInit {
  user: any;
  loginScreen : boolean = false;
  header1: string = 'plain';

  constructor(
    public keycloakService: KeycloakService
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('institutes-invite'))[0];
  }

  login(){
    this.keycloakService.logout('https://ndear.xiv.in/institute-profile-setup');
  }

  register()
  {
    this.loginScreen = !this.loginScreen;
  }

}
