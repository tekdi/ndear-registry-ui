import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-institute-mail',
  templateUrl: './institute-mail.component.html',
  styleUrls: ['./institute-mail.component.css']
})
export class InstituteMailComponent implements OnInit {
  user: any;

  constructor() { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('institutes-invite'))[0];
  }

}
