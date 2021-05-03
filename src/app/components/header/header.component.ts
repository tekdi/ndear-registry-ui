import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loged_in: boolean
  user_name;
  constructor() { }

  ngOnInit(): void {
    this.loged_in = Boolean(localStorage.getItem('is_logedin'))
    if(this.loged_in){
      this.user_name = JSON.parse(localStorage.getItem('user')).firstName+' '+JSON.parse(localStorage.getItem('user')).lastName;
    }
  }

}
