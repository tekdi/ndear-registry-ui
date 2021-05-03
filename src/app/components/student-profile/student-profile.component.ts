import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {
  user;
  constructor() { }

  ngOnInit(): void {
    localStorage.setItem('is_logedin', "true")
    this.user = JSON.parse(localStorage.getItem('user'))
  }

}
