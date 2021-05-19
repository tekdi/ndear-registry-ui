import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-mail',
  templateUrl: './student-mail.component.html',
  styleUrls: ['./student-mail.component.css']
})
export class StudentMailComponent implements OnInit {
  student;
  institute;
  constructor() { }

  ngOnInit(): void {
    this.student = JSON.parse(localStorage.getItem('students'))[0];
    this.institute = JSON.parse(localStorage.getItem('institute-detail'));
    // this.user = JSON.parse(localStorage.getItem('user'));
  }

}
