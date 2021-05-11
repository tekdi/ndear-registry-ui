import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loged_in: boolean = false;;
  user_name;
  admin: boolean = false;
  admin_setup: boolean = false
  constructor() { }

  ngOnInit(): void {
    this.loged_in = JSON.parse(localStorage.getItem('is_logedin'))
    // console.log(Boolean(localStorage.getItem('is_logedin')))
    if(this.loged_in){
      this.admin = JSON.parse(localStorage.getItem('admin'))
      this.admin_setup = JSON.parse(localStorage.getItem('admin-setup'))
      this.user_name = JSON.parse(localStorage.getItem('user')).firstName+' '+JSON.parse(localStorage.getItem('user')).lastName;
    }
  }

}
