import { Component, OnInit } from '@angular/core';
import { NoneComponent } from 'angular6-json-schema-form';
import { SchemaService } from 'src/app/services/data/schema.service';
import { BoardInstituteService } from '../../services/board/board-institutes/board-institutes.service';
import { DiscoveryService } from '../../services/discovery/discovery.service';
import { FormGroup, FormControl } from '@angular/forms';
import { State, City } from 'country-state-city'

@Component({
  selector: 'app-discovery',
  templateUrl: './discovery.component.html',
  styleUrls: ['./discovery.component.css']
})

export class DiscoveryComponent implements OnInit {
  searchForm = new FormGroup({
    board: new FormControl(''),
    name: new FormControl(''),
    state: new FormControl(''),
    district: new FormControl(''),
    pincode: new FormControl(''),
  });
  header1: string = 'main';
  searchInstitute;
  schemaJson;
  boardList;
  iCurrentPg: number = 1;
  tCurrentPg: number = 1;
  sCurrentPg: number = 1;
  type: string;
  limit: number = 10;
  yourWidgets = {
    submit: NoneComponent,
  }
  instituteItems: any[];
  studentItems: any[];
  teacherItems: any[];
  items;
  search;
  searchString;
  searchString1;
  user;
  keyword = 'name';
  data;
  stateList;
  city;
  isfilterShow: boolean = false;
  constructor(
    public schemaService: SchemaService,
    public boardInstituteService: BoardInstituteService,
    public discoveryService: DiscoveryService
  ) { }
  
  filteShow(){
    this.isfilterShow = !this.isfilterShow;
  }

  ngOnInit(): void {
    this.stateList = State.getAllStates();
   //this.city = City.getAllCities();

    this.schemaService.getSchemas().subscribe((res) => {
      this.schemaJson = res;
    });

    this.searchInstituteData('');
    this.searchTeacherData('');
    this.searchStudentData('');


    // this.boardInstituteService.getBordInstitute().subscribe(res => {
    //   this.boardList = res;
    //   console.log(this.boardList);


    // }, (err) => {
    //   console.log({ err });

    // });
  }

  selectStateEvent(item) {
    // do something with selected item

    if (item.countryCode) {
      this.city = City.getCitiesOfState(item.countryCode, item.isoCode);

    } else {
      this.city = City.getAllCities();
    }
  }

  onChangeState(item) {
    console.log(item);
  }

  onSubmit() {
    this.searchInstituteData(this.searchForm.value);
    console.log(this.searchForm.value);
  }

  submitTeacherData(){
    this.searchTeacherData(this.searchForm.value);
  }

  submitStudentData(){
    this.searchStudentData(this.searchForm.value);
  }



  searchDataIN(event) {

    this.searchString = {
      "filters": {
      }
    }


    if (event.name) {
      this.searchString.filters["instituteName"] = {
        "startsWith": event.name
      };
    }

    if (event.board) {
      this.searchString.filters["affiliation.board"] = {
        "startsWith": event.board
      };
    }


    if (event.state) {
      this.searchString.filters["address.state"] = {
        "startsWith": event.state.name
      };
    }

    if (event.pincode) {
      this.searchString.filters["address.pincode"] = {
        "startsWith": event.pincode
      };
    }

    if (event.district) {
      this.searchString.filters["address.district"] = {
        "startsWith": event.district.name
      };
    }


    return this.searchString;

  }

  searchInstituteData(event) {
    this.iCurrentPg = 1;

    let filterData = this.searchDataIN(event);

    this.discoveryService.searchInstitute(filterData).subscribe((res) => {
      this.instituteItems = res;
    }, (err) => {
    });

  }

  searchTeacherData(event) {
    this.tCurrentPg = 1;
    let filterData = this.searchData(event, 'teacher');

    this.discoveryService.searchTeacher(filterData).subscribe((res) => {
      this.teacherItems = res;
    }, (err) => {
    });
  }


  searchStudentData(event) {
    this.sCurrentPg = 1;

    let filterData = this.searchData(event, 'student');

    this.discoveryService.searchStudent(filterData).subscribe((res) => {
      this.studentItems = res;
    }, (err) => {
    });
  }


  showDetails(item, type) {
    this.type = type;
    this.user = item;
    //alert('hi');
  }

  resetData() {
    this.searchForm = new FormGroup({
      board: new FormControl(''),
      name: new FormControl(''),
      state: new FormControl(''),
      district: new FormControl(''),
      pincode: new FormControl(''),
    });
  }

  searchData(event, entity) {
    this.searchString1 = {
      "filters": {
      }
    }

    if (event.board && entity == 'teacher') {
      this.searchString1.filters["experience.subjects"] = {
        "startsWith": event.board
      };
    }

    if (event.board && entity == 'student') {
      this.searchString1.filters["educationDetails.board"] = {
        "startsWith": event.board
      };
    }

      if (event.name) {
        this.searchString1.filters["identityDetails.fullName"] = {
          "startsWith": event.name
        };
    }

    if (event.state) {
      this.searchString1.filters["contactDetails.address.state"] = {
        "startsWith": event.state.name
      };
    }

    if (event.district) {
      this.searchString1.filters["contactDetails.address.district"] = {
        "startsWith": event.district.name
      };
    }

    if (event.pincode) {
      this.searchString1.filters["contactDetails.address.pincode"] = {
        "startsWith": event.pincode
      };
    }


    return this.searchString1;
    console.log(this.searchString1);

  }

}
