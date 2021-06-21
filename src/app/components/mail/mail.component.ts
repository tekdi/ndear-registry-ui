import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css']
})
export class MailComponent implements OnInit {
  institute;
  user;
  user_id;
  constructor() { }

  ngOnInit(): void {
    this.institute = JSON.parse(localStorage.getItem('institute-detail'));
    this.user_id = JSON.parse(localStorage.getItem('institute-detail')).adminEmail;
    console.log( this.institute.Institute);
    this.user = JSON.parse(localStorage.getItem('user'));
  }

}
