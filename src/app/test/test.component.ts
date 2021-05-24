import { Component, OnInit } from '@angular/core';
// import { HiddenComponent } from 'angular6-json-schema-form/lib/widget-library/hidden.component';
// import { WidgetLibraryService } from 'angular6-json-schema-form';
import { of } from 'rxjs';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})



export class TestComponent implements OnInit {
  
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



  form: [
    '*',
    {
      "type": "submit",
      "style": "btn-info",
      "title": "save"
    }
  ]
  constructor() { }

  

  ngOnInit(): void {
   
    // this.widgetLibrary.registerWidget('hidden', HiddenComponent);

  }
  yourOnSubmitFn(data){
    console.log(data)
  }

  myActions = {
    alert: (property) => {
      alert(JSON.stringify(property.value));
    },
    reset: (property) => {
      property.reset();
    },
  };
  // yourOnChangesFn(data){
  //   console.log(data)
  //   if(data.state){
  //     console.log(this.getCities(data.state))
  //     this.schema.properties.city.enum = this.getCities(data.state)
  //   }
  // }


  // getCities(nationId: string = null) {
  //    var cities = [
  //       {
  //         label: 'Bolzano',
  //         nationId: 'india'
  //       },
  //       {
  //         label: 'Rome',
  //         nationId: 'india'
  //       },
  //       {
  //         label: 'Berlin',
  //         nationId: 'USA'
  //       },
  //       {
  //         label: 'Munich',
  //         nationId: 'USA'
  //       },
  //       {
  //         label: 'San Francisco',
  //         nationId: 'Canada'
  //       }
  //     ]
  //     var data = cities.filter(entry => {
  //       if (nationId) {
  //         return entry.nationId === nationId;
  //       } else {
  //         return true;
  //       }
  //     })
  //     var city_list = [];
  //     data.forEach(element => {
  //         city_list.push(element.label)
  //     });
  //     return city_list;
  // }

}
