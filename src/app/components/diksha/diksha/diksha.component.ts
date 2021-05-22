
import { Component, OnInit , ViewChild } from '@angular/core';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-diksha',
  templateUrl: './diksha.component.html',
  styleUrls: ['./diksha.component.css']
})

export class DikshaComponent implements OnInit {
  header1: string = 'diksha';
  closeResult = '';
  page: string = 'page1';
  loggedInUser : string = '';
  isLoggedIn : boolean = false;
  showLogin : boolean = false;
  showCourse :boolean = false;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }


  open(content) {
    this.page = 'page1';
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  getModalPage(item) {
     this.page = item.page;
   }

   acceptAuth(){
    this.closeResult = `Dismissed ${this.getDismissReason('Cross click')}`;
    this.isLoggedIn = true;
    this.loggedInUser =  JSON.parse(localStorage.getItem('consent-user'));
    this.showCourse = true;
    this.page = '';
   }

   cancelAuth(){
    this.closeResult = `Dismissed ${this.getDismissReason('Cross click')}`;
    this.page = '';
    this.showCourse = false;
  }

  loginPage(){
    this.showLogin = true;
  }

  loginPage1(){
    this.showCourse = false;
  }

}
