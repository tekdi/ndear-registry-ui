import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teacher-mail',
  templateUrl: './teacher-mail.component.html',
  styleUrls: ['./teacher-mail.component.css']
})
export class TeacherMailComponent implements OnInit {
  teacher;
  institute;
  constructor() { }

  ngOnInit(): void {
    this.teacher = JSON.parse(localStorage.getItem('teachers'))[0];
    this.institute = JSON.parse(localStorage.getItem('institute-detail'));
    // this.user = JSON.parse(localStorage.getItem('user'));
  }

}