import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css']
})
export class MailComponent implements OnInit {
  institute;
  user;
  constructor() { }

  ngOnInit(): void {
    this.institute = JSON.parse(localStorage.getItem('institute-detail'));
    this.user = JSON.parse(localStorage.getItem('user'));
  }

}
