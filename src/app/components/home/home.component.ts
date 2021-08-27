import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  header1: string = 'main';
  constructor() { 
    // localStorage.setItem('is_logedin', 'false')
  }

  ngOnInit(): void {
    // localStorage.clear()
    // if(Boolean(localStorage.getItem('is_logedin'))){
    //   localStorage.clear()
    //   localStorage.setItem('is_logedin', "false")
    //   // window.location.reload();
    // }
    
   
  }

}
