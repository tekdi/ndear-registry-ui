import { Component, OnInit } from '@angular/core';
import { NoneComponent } from 'angular6-json-schema-form';
import { SchemaService } from 'src/app/services/data/schema.service';
import { BoardInstituteService } from '../../services/board/board-institutes/board-institutes.service';
import { DiscoveryService } from '../../services/discovery/discovery.service';

@Component({
  selector: 'app-discovery',
  templateUrl: './discovery.component.html',
  styleUrls: ['./discovery.component.css']
})

export class DiscoveryComponent implements OnInit {
  header1: string = 'main';
  searchInstitute;
  schemaJson;
  boardList;
  data;
  p: number = 1;
  t: number = 1;
  s: number = 1;
  type: string;
  limit: number = 3;
  yourWidgets = {
    submit: NoneComponent,
  }
  instituteItems : any[];
  studentItems : any[];
  teacherItems: any[];
  items;
  search;
  searchString;
  searchString1;
  user;
  constructor(
    public schemaService: SchemaService,
    public boardInstituteService: BoardInstituteService,
    public discoveryService: DiscoveryService
  ) { }

  ngOnInit(): void {


    this.schemaService.getSchemas().subscribe((res) => {
      this.schemaJson = res;

      this.searchInstitute = {
        "type": "object",
        "title": "Teacher",
        "definitions": {
          "Institute": {
            "type": "object",
            "properties": {
              "instituteType": {
                "type": "string",
                "enum": [
                  "Boys",
                  "Girls",
                  "Co-ed"
                ]
              },
              "instituteName": {
                "type": "string",
                "enum": [
                  "Broad River University",
                  "Central Technical School",
                  "Oakwood School of Fine Arts90",
                  "Barti Institute",
                  "Thomas Institute"
                ]
              }
            }
          },
          /* "Skills": {
             "type": "object",
             "properties": {
               "year": {
                 "title": "Year",
                 "type": "string",
                 "enum": [
                   "2010",
                   "2000",
                   "1990"
                 ]
               },
               "subject": {
                 "title": "Subject",
                 "type": "string",
                 "enum": [
                   "English",
                   "Hindi",
                   "Sanskrit"
                 ]
               }
             }
           },*/
          "Management": {
            "type": "object",
            "properties": {
              "year": {
                "title": "Year",
                "type": "string",
                "enum": [
                  "2010",
                  "2000",
                  "1990"
                ]
              },
              "subject": {
                "title": "Subject",
                "type": "string",
                "enum": [
                  "English",
                  "Hindi",
                  "Sanskrit"
                ]
              }
            }
          }
        },
        "properties": {
          "state": {
            "type": "string",
            "enum": [
              "Maharashtra",
              "Karnatka",
              "Other"
            ],
            "title": "State"
          },
          "district": {
            "type": "string",
            "enum": [
              "Nashik",
              "Pune",
              "Mumbai"
            ],
            "title": "District"
          },
          "Institute": {
            "$ref": "#/definitions/Institute"
          },
          // "Skills": {
          //   "$ref": "#/definitions/Skills"
          // },
          "Management": {
            "$ref": "#/definitions/Management"
          }
        }
      };
    });

    this.searchTeacherData('');
    this.searchStudentData('');

    this.searchInstituteData('');


    // this.boardInstituteService.getBordInstitute().subscribe(res => {
    //   this.boardList = res;
    //   console.log(this.boardList);


    // }, (err) => {
    //   console.log({ err });

    // });
  }

  searchDataIN(event) {

    this.searchString = {
      "filters": {
      }
    }

    if (event.hasOwnProperty('Institute')) {
      if (event.Institute.hasOwnProperty('instituteName')) {
        this.searchString.filters["instituteName"] = {
          "eq": event.Institute.instituteName
        };
      }

      if (event.Institute.hasOwnProperty('instituteType')) {
        this.searchString.filters["schoolType"] = {
          "eq": event.Institute.instituteType
        };
      }
    }

    if (event.hasOwnProperty('state')) {
      this.searchString.filters["address.state"] = {
        "eq": event.state
      };
    }

    if (event.hasOwnProperty('district')) {
      this.searchString.filters["address.district"] = {
        "eq": event.district
      };
    }

    if (event.hasOwnProperty('Management')) {
      if (event.Management.hasOwnProperty('year')) {
        this.searchString.filters["grantYear"] = {
          "eq": event.Management.year
        };
      }

      if (event.Management.hasOwnProperty('subject')) {
        this.searchString.filters["medium"] = {
          "eq": event.Management.subject
        };
      }
    }


    return this.searchString;
    console.log(this.searchString);

  }

  searchInstituteData(event) {

    let filterData = this.searchDataIN(event);

    this.discoveryService.searchInstitute(filterData).subscribe((err) => {
    }, (res) => {
      this.instituteItems = res;
    });

  }

  searchTeacherData(event) {
    let filterData = this.searchData(event);

    this.discoveryService.searchTeacher(filterData).subscribe((err) => {
    }, (res) => {
      this.teacherItems = res;
    });
  }


  searchStudentData(event) {
    let filterData = this.searchData(event);

    this.discoveryService.searchStudent(filterData).subscribe((err) => {
    }, (res) => {
      this.studentItems = res;
    });
  }


  showDetails(item, type) {
    this.type = type;
    this.user = item;
    //alert('hi');
  }

  resetData() {
    this.data = {}

  }

  searchData(event) {

    this.searchString1 = {
      "filters": {
      }
    }

    if (event.hasOwnProperty('Institute')) {
      if (event.Institute.hasOwnProperty('instituteName')) {
        this.searchString1.filters["academicQualifications.institute"] = {
          "eq": event.Institute.instituteName
        };
      }

      if (event.Institute.hasOwnProperty('instituteType')) {
        this.searchString1.filters["schoolType"] = {
          "eq": event.Institute.instituteType
        };
      }
    }

    if (event.hasOwnProperty('state')) {
      this.searchString1.filters["contactDetails.address.state"] = {
        "eq": event.state
      };
    }

    if (event.hasOwnProperty('district')) {
      this.searchString1.filters["contactDetails.address.district"] = {
        "eq": event.district
      };
    }

    if (event.hasOwnProperty('Management')) {
      if (event.Management.hasOwnProperty('year')) {
        this.searchString1.filters["graduationYear.grantYear"] = {
          "eq": event.Management.year
        };
      }

      if (event.Management.hasOwnProperty('subject')) {
        this.searchString1.filters["educationDetails.medium"] = {
          "eq": event.Management.subject
        };
      }
    }


    return this.searchString1;
    console.log(this.searchString1);

  }

}
