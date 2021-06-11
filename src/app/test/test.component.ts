import { Component, OnInit } from '@angular/core';
// import { HiddenComponent } from 'angular6-json-schema-form/lib/widget-library/hidden.component';
// import { WidgetLibraryService } from 'angular6-json-schema-form';
import { of } from 'rxjs';
import {TestService} from './test.service'
import {WidgetRegistry, Validator, Binding, FormProperty, PropertyGroup} from 'ngx-schema-form';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Test2Component} from '../test/test2/test2.component'

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})



export class TestComponent implements OnInit {
  
  constructor(private modalService: NgbModal) {}

  open() {
    const modalRef = this.modalService.open(Test2Component);
    modalRef.componentInstance.photo = 'World';
  }

  ngOnInit() {
    console.log('Hi');
  }
}