import { Component, OnInit } from '@angular/core';
// import { HiddenComponent } from 'angular6-json-schema-form/lib/widget-library/hidden.component';
// import { WidgetLibraryService } from 'angular6-json-schema-form';
import { of } from 'rxjs';
import {TestService} from './test.service'
import {WidgetRegistry, Validator, Binding, FormProperty, PropertyGroup} from 'ngx-schema-form';

import { SchemaService } from 'src/app/services/data/schema.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Test2Component} from '../test/test2/test2.component'


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})



export class TestComponent implements OnInit {


  editSchema;
  schemaJson;
  item;
  schema = {
    "$schema": "http://json-schema.org/draft-04/hyper-schema#",
    "type": "object",
    "definitions": {
      "School": {
        "type": "object",
        "title": "The School Schema",
        "required": [
          "schoolName",
          "schoolCode"
        ],
        "properties": {
          "schoolCode": {
            "title": "Full name",
            "type": "string"
          },
          "identifier": {
            "title": "Full name",
            "type": "string"
          },
          "schoolName": {
            "type": "string",
            "title": "Full name"
          },
          "birthDate": {
            "type": "string",
            "format": "date",
            "widget": {
              "id": "date"
            },
          },
          "adminEmail": {
            "title": "Full name",
            "type": "string"
          },
          "adminMobile": {
            "title": "Full name",
            "type": "string"
          },
          "address": {
            "title": "Full name",
            "$ref": "#/definitions/Address"
          },
          "accreditation": {
            "title": "Full name",
            "type": "array",
            "items": {
              "$ref": "#/definitions/Accreditation"
            }
          },
          "courses": {
            "title": "Full name",
            "type": "array",
            "items": {
              "$ref": "#/definitions/Courses"
            }
          }
        }
      },
      "Courses": {
        "type": "object",
        "properties": {
          "title": {
            "type": "string"
          },
          "start": {
            "type": "string",
            "format": "date"
          },
          "end": {
            "type": "string",
            "format": "date"
          }
        }
      },
      "Accreditation": {
        "type": "object",
        "properties": {
          "title": {
            "type": "string"
          },
          "institute": {
            "type": "string"
          },
          "start": {
            "type": "string",
            "format": "date"
          },
          "end": {
            "type": "string",
            "format": "date"
          }
        }
      },
      "Address": {
        "type": "object",
        "properties": {
          "addressLine1": {
            "type": "string"
          },
          "addressLine2": {
            "type": "string"
          },
          "district": {
            "type": "string"
          },
          "state": {
            "type": "string"
          },
          "pinCode": {
            "type": "string"
          }
        }
      },
      "Teacher": {
        "type": "object",
        "title": "The Teacher Schema",
        "required": [
          "teacherName",
          "teacherCode",
          "nationalIdentifier",
          "gender"
        ],
        "properties": {
          "teacherCode": {
            "type": "string"
          },
          "nationalIdentifier": {
            "type": "string"
          },
          "teacherName": {
            "type": "string",
            "title": "Full name"
          },
          "gender": {
            "type": "string",
            "enum": [
              "Male",
              "Female",
              "Other"
            ]
          },
          "birthDate": {
            "type": "string",
            "format": "date"
          },
          "email": {
            "type": "string"
          },
          "mobile": {
            "type": "string"
          },
          "address": {
            "type": "string"
          },
          "district": {
            "type": "string"
          },
          "state": {
            "type": "string"
          },
          "education": {
            "type": "array",
            "items": {
              "$ref": "#/definitions/EducationType"
            }
          },
          "experience": {
            "type": "array",
            "items": {
              "$ref": "#/definitions/ExperienceType"
            }
          },
          "certification": {
            "type": "array",
            "items": {
              "$ref": "#/definitions/CertificationType"
            }
          }
        }
      },
      "EducationType": {
        "type": "object",
        "properties": {
          "degree": {
            "type": "string"
          },
          "institute": {
            "type": "string"
          },
          "start": {
            "type": "string",
            "format": "date"
          },
          "end": {
            "type": "string",
            "format": "date"
          }
        }
      },
      "ExperienceType": {
        "type": "object",
        "properties": {
          "title": {
            "type": "string"
          },
          "start": {
            "type": "string",
            "format": "date"
          },
          "end": {
            "type": "string",
            "format": "date"
          }
        }
      },
      "CertificationType": {
        "type": "object",
        "properties": {
          "institute": {
            "type": "string"
          },
          "start": {
            "type": "string",
            "format": "date"
          },
          "end": {
            "type": "string",
            "format": "date"
          }
        }
      },
      "baseAttestationField": {
        "title": "BaseAttestationField",
        "type": "object",
        "properties": {
          "state": {
            "type": "string",
            "description": "field state (draft, submitted, attested, invalid)"
          },
          "signature": {
            "type": "string",
            "description": "digital signature after attestion. Contains attested data, attestorInfo and verification details"
          }
        }
      },
      "Student": {
        "type": "object",
        "title": "The Student Schema",
        "required": [
          "studentName",
          "studentCode",
          "nationalIdentifier",
          "class",
          "gender"
        ],
        "properties": {
          "studentCode": {
            "type": "string"
          },
          "nationalIdentifier": {
            "type": "string"
          },
          "studentName": {
            "type": "string",
            "title": "Full name"
          },
          "gender": {
            "type": "string",
            "enum": [
              "Male",
              "Female",
              "Other"
            ]
          },
          "birthDate": {
            "type": "string",
            "format": "date"
          },
          "email": {
            "type": "string"
          },
          "mobile": {
            "type": "string"
          },
          "address": {
            "type": "string"
          },
          "district": {
            "type": "string"
          },
          "state": {
            "type": "string"
          },
          "education": {
            "type": "array",
            "items": {
              "$ref": "#/definitions/EducationType"
            }
          },
          "experience": {
            "type": "array",
            "items": {
              "$ref": "#/definitions/ExperienceType"
            }
          },
          "certification": {
            "type": "array",
            "items": {
              "$ref": "#/definitions/CertificationType"
            }
          }
        }
      }
    },
    "properties": {
      "School": {
          "$ref": "#/definitions/School"
      },
      "education": {
        "type": "array",
        "items": {
          "$ref": "#/definitions/EducationType"
        }
      },
      "experience": {
        "type": "array",
        "items": {
          "$ref": "#/definitions/ExperienceType"
        }
      },
      "certification": {
        "type": "array",
        "items": {
          "$ref": "#/definitions/CertificationType"
        }
      }
    },
    "buttons": [
      {
        "label": "Alert",
        "id": "alert"
      },
      {
        "label": "Reset",
        "id": "reset"
      },
      {
        "label": "Disable all",
        "id": "disable"
      }
    ],
    "required": [
    ],
    "widget": {
      "id": "object"
    }
  };

  areas = [
    {
      label: 'Maharastra',
      nationId: 'india',
      city: 'Pune'
    },
    {
      label: 'Gujarat',
      nationId: 'india'
    },
    {
      label: 'Berlin',
      nationId: 'USA'
    },
    {
      label: 'Munich',
      nationId: 'USA'
    },
    {
      label: 'San Francisco',
      nationId: 'Canada'
    }
  ]


  mySchema = {
    properties: {
      "country": {
        "id": "country",
        "name": "country",
        "title": "country",
        "type": "string",
        "widget": {
          "id": "select"
        },
        "enum": [
          "india",
          "USA",
          "Canada"
        ]
      },
      "state": {
        "id": "state",
        "name": "state",
        "title": "state",
        "type": "string",
        "widget": {
          "id": "select"
        },
        "enum": [
        ]
      },
      
      
    },
    required: ["country", "state"],
    buttons: [
      {
        id: "alert", // the id of the action callback
        label: "submit", // the text inside the button
      },
    ],
  };

  mySchema2 = {
    properties: {
      "pincode": {
        "type": "integer",
        "minimum": 0,
        "maximum": 6,
        "title": "Pin Code",
        "isRequired": true,
        "widget": {
          "id": "integer"
        }
      },
      "state": {
        "id": "state",
        "name": "state",
        "title": "state",
        "type": "string",
        "widget": {
          "id": "string"
        },
      },
      
      
    },
    required: ["country", "state"],
    buttons: [
      {
        id: "alert", // the id of the action callback
        label: "submit", // the text inside the button
      },
    ],
  };

  myModel = {};
  

  myFieldBindings = {
    "/pincode": [
      {
        input: (event, formProperty: FormProperty) => {
          
          const root: PropertyGroup = formProperty.findRoot();
          // console.log('evnt'+JSON.stringify(parent))
          /**
           * Set the input value for the children
           */
          const state: FormProperty = root.getProperty("state");

          state.setValue("Gujarat", false);

        },
      },
    ],
  };
  

  form: [
    '*',
    {
      "type": "submit",
      "style": "btn-info",
      "title": "save"
    }
  ]
  city_list: any[];
  constructor(public testService: TestService,  public jsonschema: SchemaService,) { 

this.jsonschema.getSchemas().subscribe((res) => {
  this.schemaJson = res;
  delete this.schemaJson.definitions.Institute.properties.affiliation;
  delete this.schemaJson.definitions.Institute.properties.adress;
    this.editSchema = {
      "type": "object",
      "title": "Institute",
      "definitions": {
        "instituteDetails": this.schemaJson.definitions.Institute,
        "Address": this.schemaJson.definitions.Address
      },
      "properties": {
        "instituteDetails": {
          "$ref": "#/definitions/instituteDetails"
        }
      }
    };
  });



  }

  

  ngOnInit(): void {
    // this.widgetLibrary.registerWidget('hidden', HiddenComponent);

  
  constructor(private modalService: NgbModal) {}


  open() {
    const modalRef = this.modalService.open(Test2Component);
    modalRef.componentInstance.photo = 'World';
  }

  ngOnInit() {
    console.log('Hi');
  }


  onEditProfileSubmit(event){
this.item = event;
  }

}
}

