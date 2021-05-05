import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  schema = {
    "type": "object",
    "title": "Teacher",
    "definitions": {
      "TeacherGender": {
        "type": "string",
        "enum": [
          "GenderTypeCode-MALE",
          "GenderTypeCode-FEMALE"
        ]
      },
      "Gender": {
        "type": "string",
        "enum": [
          "MALE",
          "FEMALE",
          "OTHER"
        ]
      },
      "Date": {
        "type": "string",
        "format": "date"
      },
      "Year": {
        "type": "string",
        "pattern": "(^[0-9]{4}$)"
      },
      "SocialCategory": {
        "type": "string",
        "enum": [
          "SocialCategoryTypeCode-GENERAL",
          "SocialCategoryTypeCode-SC",
          "SocialCategoryTypeCode-ST",
          "SocialCategoryTypeCode-OBC",
          "SocialCategoryTypeCode-ORC",
          "SocialCategoryTypeCode-OTHERS"
        ]
      },
      "AcademicQualification": {
        "type": "string",
        "enum": [
          "AcademicQualificationTypeCode-BELOWSECONDARY",
          "AcademicQualificationTypeCode-SECONDARY",
          "AcademicQualificationTypeCode-HIGHERSECONDARY",
          "AcademicQualificationTypeCode-GRADUATE",
          "AcademicQualificationTypeCode-POSTGRADUATE",
          "AcademicQualificationTypeCode-MPHIL",
          "AcademicQualificationTypeCode-POSTDOC",
          "AcademicQualificationTypeCode-PHD"
        ]
      },
      "Qualification": {
        "type": "string",
        "enum": [
          "TeacherQualificationTypeCode-DIPLOMAORBASIC",
          "TeacherQualificationTypeCode-BELED",
          "TeacherQualificationTypeCode-MED",
          "TeacherQualificationTypeCode-OTHERS",
          "TeacherQualificationTypeCode-NONE",
          "TeacherQualificationTypeCode-SPECIAL"
        ]
      },
      "TeacherType": {
        "type": "string",
        "enum": [
          "TeacherTypeCode-HEAD",
          "TeacherTypeCode-ACTINGHEAD",
          "TeacherTypeCode-TEACHER",
          "TeacherTypeCode-RTEINSTRUCTOR",
          "TeacherTypeCode-PRINCIPAL",
          "TeacherTypeCode-VICEPRINCIPAL",
          "TeacherTypeCode-LECTURER"
        ]
      },
      "AppointmentType": {
        "type": "string",
        "enum": [
          "TeacherAppointmentTypeCode-REGULAR",
          "TeacherAppointmentTypeCode-CONTRACT",
          "TeacherAppointmentTypeCode-PARTTIME"
        ]
      },
      "ClassType": {
        "type": "string",
        "enum": [
          "ClassTypeCode-PRIMARY",
          "ClassTypeCode-UPPERPRIMARY",
          "ClassTypeCode-PRIMARYANDUPPERPRIMARY",
          "ClassTypeCode-SECONDARY",
          "ClassTypeCode-HIGHERSECONDARY",
          "ClassTypeCode-UPPERPRIMARYANDSECONDARY",
          "ClassTypeCode-SECONDARYANDHIGHERSECONDARY"
        ]
      },
      "Subjects": {
        "type": "string",
        "enum": [
          "SubjectCode-ALL",
          "SubjectCode-LANGUAGE",
          "SubjectCode-ENGLISH",
          "SubjectCode-MATH",
          "SubjectCode-ENVSTUDIES",
          "SubjectCode-SPORTS",
          "SubjectCode-MUSIC",
          "SubjectCode-SCIENCE",
          "SubjectCode-SOCIALSTUDIES",
          "SubjectCode-ACCOUNTANCY",
          "SubjectCode-BIOLOGY",
          "SubjectCode-BUSINESSSTUDIES",
          "SubjectCode-CHEMISTRY",
          "SubjectCode-COMPSC",
          "SubjectCode-ECONOMICS",
          "SubjectCode-FINEARTS",
          "SubjectCode-ENGDRAWING",
          "SubjectCode-GEOGRAPHY",
          "SubjectCode-HISTORY",
          "SubjectCode-HOMESCIENCE",
          "SubjectCode-PHILOSOPHY",
          "SubjectCode-PHYSICS",
          "SubjectCode-POLITICALSCIENCE",
          "SubjectCode-FOREIGNLANG",
          "SubjectCode-BOTONY",
          "SubjectCode-ZOOLOGY",
          "SubjectCode-HINDI",
          "SubjectCode-MARATHI",
          "SubjectCode-SANSKRIT",
          "SubjectCode-SINDHI",
          "SubjectCode-URDU",
          "SubjectCode-ENLISH",
          "SubjectCode-REGIONALLANGUAGE",
          "SubjectCode-ARTEDUCATION",
          "SubjectCode-PHYSICALEDUCATION",
          "SubjectCode-WORKEDUCATION",
          "SubjectCode-OTHER"
        ]
      },
      "DisabilityType": {
        "type": "string",
        "enum": [
          "DisabilityCode-NA",
          "DisabilityCode-LOCOMOTOR",
          "DisabilityCode-VISUAL",
          "DisabilityCode-OTHERDISABILITY"
        ]
      },
      "YesNoCode": {
        "type": "string",
        "enum": [
          "YesNoCode-YES",
          "YesNoCode-NO"
        ]
      },
      "TeachingRole": {
        "type": "object",
        "required": [
          "teacherType",
          "appointmentType",
          "classesTaught",
          "appointedForSubjects",
          "mainSubjectsTaught",
          "appointmentYear"
        ],
        "properties": {
          "teacherType": {
            "$ref": "#/definitions/TeacherType"
          },
          "appointmentType": {
            "$ref": "#/definitions/AppointmentType"
          },
          "classesTaught": {
            "type": "array",
            "items": {
              "$ref": "#/definitions/ClassType"
            }
          },
          "appointedForSubjects": {
            "type": "array",
            "items": {
              "$ref": "#/definitions/Subjects"
            }
          },
          "mainSubjectsTaught": {
            "type": "array",
            "items": {
              "$ref": "#/definitions/Subjects"
            }
          },
          "appointmentYear": {
            "$ref": "#/definitions/Year"
          }
        }
      },
      "NonTeachingAssignments": {
        "type": "object",
        "required": [
          "daysOfNonTeachingAssignments"
        ],
        "properties": {
          "daysOfNonTeachingAssignments": {
            "type": "number"
          }
        }
      },
      "BasicProficiencyLevel": {
        "required": [
          "proficiencySubject",
          "proficiencyAcademicQualification"
        ],
        "properties": {
          "proficiencySubject": {
            "$ref": "#/definitions/Subjects"
          },
          "proficiencyAcademicQualification": {
            "$ref": "#/definitions/AcademicQualification"
          }
        }
      },
      "InServiceTeacherTraining": {
        "type": "object",
        "required": [
          "daysOfInServiceTeacherTraining"
        ],
        "properties": {
          "daysOfInServiceTeacherTraining": {
            "type": "string"
          }
        }
      }
    },
    "properties": {
      "serialNum": {
        "type": "integer"
      },
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
        "$ref": "#/definitions/TeacherGender"
      },
      "birthDate": {
        "$ref": "#/definitions/Date"
      },
      "socialCategory": {
        "$ref": "#/definitions/SocialCategory"
      },
      "highestAcademicQualification": {
        "$ref": "#/definitions/AcademicQualification"
      },
      "highestTeacherQualification": {
        "$ref": "#/definitions/Qualification"
      },
      "yearOfJoiningService": {
        "$ref": "#/definitions/Year"
      },
      "teachingRole": {
        "$ref": "#/definitions/TeachingRole"
      },
      "inServiceTeacherTrainingFromBRC": {
        "$ref": "#/definitions/InServiceTeacherTraining"
      },
      "inServiceTeacherTrainingFromCRC": {
        "$ref": "#/definitions/InServiceTeacherTraining"
      },
      "inServiceTeacherTrainingFromDIET": {
        "$ref": "#/definitions/InServiceTeacherTraining"
      },
      "inServiceTeacherTrainingFromOthers": {
        "$ref": "#/definitions/InServiceTeacherTraining"
      },
      "nonTeachingAssignmentsForAcademicCalendar": {
        "$ref": "#/definitions/NonTeachingAssignments"
      },
      
    }
  };
 
 
  form: [
    "*",
    {
      "type": "submit",
      "style": "btn-info",
      "title": "save"
    }
  ]
  constructor() { }

  ngOnInit(): void {

  }
  yourOnSubmitFn(data){
    console.log(data)
  }

}
