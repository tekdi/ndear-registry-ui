import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consent-authorize',
  templateUrl: './consent-authorize.component.html',
  styleUrls: ['./consent-authorize.component.css']
})
export class ConsentAuthorizeComponent implements OnInit {
  header1: string = 'consent-auth';

  constructor() { }

  ngOnInit(): void {
  }

}
