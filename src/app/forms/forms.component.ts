import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SchemaService } from '../services/data/schema.service';
import * as FormSchemas from './forms.json'
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyJsonschema } from '@ngx-formly/core/json-schema';
import { JSONSchema7 } from "json-schema";
import { GeneralService } from '../services/general/general.service';
import { PanelsComponent } from '../layouts/modal/panels/panels.component';
import { Location } from '@angular/common'
import { title } from 'process';
import { combineLatest, startWith, switchMap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { of } from 'rxjs';
import { ToastMessageService } from '../services/toast-message/toast-message.service';


@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})


export class FormsComponent implements OnInit {
  @Input() form;
  @Input() modal;
  @Input() identifier;
  formSchema;
  responseData;
  schemaloaded = false;
  schema: JSONSchema7 = {
    "type": "object",
    "title": "",
    "definitions": {},
    "properties": {}
  };
  definations = {};
  property = {};
  ordering;
  required = [];

  form2: FormGroup;
  model = {};
  options: FormlyFormOptions;
  fields: FormlyFieldConfig[];
  customFields = [];
  header = null;

  type: string;
  apiUrl: string;
  redirectTo: any;
  add: boolean;
  dependencies: any;
  searchResult: any[];
  states: any[] = [];
  constructor(private route: ActivatedRoute,
    public toastMsg: ToastMessageService, public router: Router, public schemaService: SchemaService, private formlyJsonschema: FormlyJsonschema, public generalService: GeneralService, private location: Location) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log('params', params)
      // this.form = params['form']
      this.add = this.router.url.includes('add');

      if (params['form'] != undefined) {
        this.form = params['form']
      }
      if (params['id'] != undefined) {
        this.identifier = params['id']
      }
      if (params['modal'] != undefined) {
        this.modal = params['modal']
      }

    });

    // console.log("modallll", this.modal)
    var filtered = FormSchemas.forms.filter(obj => {

      return Object.keys(obj)[0] === this.form
    })
    this.formSchema = filtered[0][this.form]

    if (this.formSchema.api) {
      this.apiUrl = this.formSchema.api;
    }
    if (this.formSchema.header) {
      this.header = this.formSchema.header
    }
    if (this.formSchema.redirectTo) {
      this.redirectTo = this.formSchema.redirectTo;
    }
    // if (this.identifier != null) {
    //   this.getData()
    // }
    if (this.formSchema.type) {
      this.type = this.formSchema.type
    }

    this.schemaService.getSchemas().subscribe((res) => {
      this.responseData = res;

      this.formSchema.fieldsets.forEach(fieldset => {
        this.getData(fieldset.definition)
        this.definations[fieldset.definition] = {}
        this.definations[fieldset.definition]['type'] = "object";
        if (fieldset.title) {
          this.definations[fieldset.definition]['title'] = fieldset.title
        }

        if (fieldset.required && fieldset.required.length > 0) {
          this.definations[fieldset.definition]['required'] = fieldset.required
        }
        if (fieldset.dependencies) {
          this.dependencies = fieldset.dependencies
        }
        this.definations[fieldset.definition].properties = {}
        this.property[fieldset.definition] = {}
        this.property = this.definations[fieldset.definition].properties;
        // console.log('ppppp', this.definations[fieldset.definition].properties)
        // if(this.definations[fieldset.definition].required && this.definations[fieldset.definition].required.length > 0){
        //   this.schema['required'] = this.definations[fieldset.definition].required
        // }
        if (fieldset.formclass) {
          this.schema['widget'] = {};
          this.schema['widget']['formlyConfig'] = { fieldGroupClassName: fieldset.formclass }
        }
        if (fieldset.fields[0] === "*") {
          this.definations = this.responseData.definitions;
          this.property = this.definations[fieldset.definition].properties
          // {
          //   "title": fieldset.title,
          //   "$ref": "#/definitions/" + fieldset.definition
          // };
        } else {
          this.addFields(fieldset)
        }

        if (fieldset.except) {
          this.removeFields(fieldset)
        }
      });

      this.ordering = this.formSchema.order;
      this.schema["type"] = "object";
      this.schema["title"] = this.formSchema.title;
      this.schema["definitions"] = this.definations;
      this.schema["properties"] = this.property;
      this.schema["required"] = this.required;
      this.schema["dependencies"] = this.dependencies;
      // console.log(this.schema)

      this.loadSchema();
    });


  }

  loadSchema() {

    this.form2 = new FormGroup({});
    this.options = {};
    this.fields = [this.formlyJsonschema.toFieldConfig(this.schema)];
    if (this.add) {
      this.model = {};
    }
    this.schemaloaded = true;
    console.log("mod", this.model)
  }

  addFields(fieldset) {
    fieldset.fields.forEach(field => {

      if (field.children) {

        this.definations[field.children.definition] = this.responseData.definitions[field.children.definition];
        var ref_properties = {}
        var ref_required = []
        if (field.children.fields && field.children.fields.length > 0) {
          field.children.fields.forEach(reffield => {
            this.addWidget(field.children, reffield)
            if (reffield.required) {
              ref_required.push(reffield.name)
            }
            ref_properties[reffield.name] = this.responseData.definitions[field.children.definition].properties[reffield.name];

            // this.property[field.children.definition].properties[reffield.name] = this.responseData.definitions[field.children.definition].properties[reffield.name];
          });
          // this.property[field.name] = ref_properties;
          this.responseData.definitions[fieldset.definition].properties[field.name].properties = ref_properties;
          this.definations[field.children.definition].properties = ref_properties;
          this.definations[field.children.definition].required = ref_required;
        }
      }
      if (field.custom && field.element) {
        this.responseData.definitions[fieldset.definition].properties[field.name] = field.element;
        this.customFields.push(field.name)
        console.log("mod", this.model)
      } else {
        this.addWidget(fieldset, field)
      }

      this.definations[fieldset.definition].properties[field.name] = this.responseData.definitions[fieldset.definition].properties[field.name];
      if (field.children && !field.children.title) {
        if (this.property[field.name].title) {
          delete this.property[field.name].title;
        }
        if (this.property[field.name].description) {
          delete this.property[field.name].description;
        }

      }
    });
  }

  removeFields(fieldset) {
    fieldset.except.forEach(field => {
      delete this.definations[fieldset.definition].properties[field];

    });
  }

  addWidget(fieldset, field) {
    if (field.widget) {
      this.responseData.definitions[fieldset.definition].properties[field.name]['widget'] = field.widget;
    }
    else {
      this.responseData.definitions[fieldset.definition].properties[field.name]['widget'] = {
        "formlyConfig": {
          "templateOptions": {},
          "validation": {},
          "expressionProperties": {}
        }
      }
      if (field.classGroup) {
        this.responseData.definitions[fieldset.definition].properties[field.name]['widget']['formlyConfig']['fieldGroupClassName'] = field.classGroup;
      }
      if (field.expressionProperties) {
        this.responseData.definitions[fieldset.definition].properties[field.name]['widget']['formlyConfig']['expressionProperties'] = field.expressionProperties;
      }
      if (field.class) {
        this.responseData.definitions[fieldset.definition].properties[field.name]['widget']['formlyConfig']['className'] = field.class;
      }
      if (field.required || field.children) {
        this.responseData.definitions[fieldset.definition].properties[field.name]['widget']['formlyConfig']['templateOptions']['required'] = field.required;
      }
      if (field.children) {
        this.responseData.definitions[fieldset.definition].properties[field.name]['widget']['formlyConfig']['templateOptions']['required'] = true;
      }
      if (field.validation) {
        if (field.validation.message) {
          this.responseData.definitions[fieldset.definition].properties[field.name]['widget']['formlyConfig']['validation'] = {
            "messages": {
              "pattern": field.validation.message
            }
          }
          if (field.validation.pattern) {
            this.responseData.definitions[fieldset.definition].properties[field.name]['pattern'] = field.validation.pattern;
          }
        }
      }
      if (field.type) {
        if (field.type == "autocomplete") {
          //   this.responseData.definitions[fieldset.definition].properties[field.name]['widget']['formlyConfig']['templateOptions'] = {
          //     "required": true,
          // "label": "Autocomplete",
          // "placeholder": "Placeholder",
          // "filter": term => of(term ? this.filterStates(term) : states.slice())
          //   }
          // this.responseData.definitions[fieldset.definition].properties[field.name]['widget']['formlyConfig']['hooks']= {
          // onInit: (field) => {
          //   console.log("here",field)
          //   field.templateOptions.filter$ = field.formControl.valueChanges
          //     .pipe(
          //       startWith(''),
          //       combineLatest(this.selectedValue$),
          //       switchMap(this.filterStates()),
          //     )
          // }
          // }

          this.responseData.definitions[fieldset.definition].properties[field.name]['widget']['formlyConfig']['type'] = "autocomplete";
          this.responseData.definitions[fieldset.definition].properties[field.name]['widget']['formlyConfig']['templateOptions']['placeholder'] = this.responseData.definitions[fieldset.definition].properties[field.name]['title'];
          this.responseData.definitions[fieldset.definition].properties[field.name]['widget']['formlyConfig']['templateOptions']['search$'] = (term) => {
            if (term || term != '') {
              var formData = {
                "filters": {
                  "instituteName": {
                    "contains": term
                  }
                },
                "limit": 20,
                "offset": 0
              }
              this.generalService.postData('/Institute/search', formData).subscribe(async (res) => {
                console.log({ res });
                // return observableOf(res);
                let items = res;
                items = await items.filter(x => x.instituteName.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) > -1);
                if (items) {
                  console.log("items--", items)
                  this.states = items;
                  // return observableOf(items);
                  // return of(items).pipe(delay(500));
                }
        
              });
              return observableOf(this.states);
            }
  
            return observableOf(this.states.filter(v => v.instituteName.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));
          }
        }
        else {
          this.responseData.definitions[fieldset.definition].properties[field.name]['widget']['formlyConfig']['templateOptions']['type'] = field.type
        }

      }
      if (field.disabled || field.disable) {
        this.responseData.definitions[fieldset.definition].properties[field.name]['widget']['formlyConfig']['templateOptions']['disabled'] = field.disabled
      };
    }

    // console.log("field", field)
  }

  submit() {

    if (this.type && this.type === 'entity') {
      this.customFields.forEach(element => {
        delete this.model[element];
      });
      if (this.identifier != null) {
        this.updateData()
      } else {
        this.postData()
      }
      // this.getData()
    }
    else if (this.type && this.type.includes("property")) {
      // this.identifier = localStorage.getItem('entity-osid');
      var property = this.type.split(":")[1];
      var url = [this.apiUrl, this.identifier, property];
      this.apiUrl = (url.join("/"));
      if (this.model[property]) {
        this.model = this.model[property];
      }
      if (this.model.hasOwnProperty('attest') && this.model['attest']) {
        this.apiUrl = (url.join("/")) + '?send=true';
      } else {
        this.apiUrl = (url.join("/")) + '?send=false';
      }
      this.customFields.forEach(element => {
        delete this.model[element];
      });
      this.postData()
      // this.getData()
    }
    // const url = this.router.createUrlTree(['/profile/institute'])
    // window.open(this.router.createUrlTree([this.redirectTo]).toString(), '_blank')

  }

  filterStates(term: string) {
    console.log(term)
    if (term && term != '') {
      var formData = {
        "filters": {
          "instituteName": {
            "contains": term
          }
        },
        "limit": 20,
        "offset": 0
      }
      this.generalService.postData('/Institute/search', formData).subscribe(async (res) => {
        console.log({ res });
        // return observableOf(res);
        let items = res;
        items = await items.filter(x => x.instituteName.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) > -1);
        if (items) {
          console.log("items--", items)
          return items;
          // return observableOf(items);
          // return of(items).pipe(delay(500));
        }

      });


    }
    // return observableOf(this.searchResult.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));
    // return states.filter(state =>
    //   state.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  // filterStates() {
  //   return ([term, states]) => {
  //     return of(term
  //     ? states.filter(state =>
  //     state.toLowerCase().indexOf(term.toLowerCase()) === 0)
  //     : states.slice());
  //   }
  //   ;
  // }

  // changeState(){
  //   if(this.selectedValue$.value.length !== 3){
  //     this.selectedValue$.next(states2);
  //   } else {
  //     this.selectedValue$.next(states);
  //   }
  // }


  getData(definition) {
    var get_url;
    if (this.identifier) {
      get_url = this.apiUrl + '/' + this.identifier
    } else {
      get_url = this.apiUrl
    }
    // this.identifier = localStorage.getItem('entity-osid');

    this.generalService.getData(get_url).subscribe((res) => {
      // if(this.property[definition])
      this.model = res[0];
      this.identifier = res[0].osid;
      this.loadSchema()
    });
  }

  postData() {
    if (Array.isArray(this.model)) {
      this.model = this.model[0];
    }
    this.generalService.postData(this.apiUrl, this.model).subscribe((res) => {
      console.log({ res });
      if (res.params.status == 'SUCCESSFUL') {

        this.router.navigate([this.redirectTo])
      }
      else if (res.params.errmsg != '' && res.params.status == 'UNSUCCESSFUL') {
        this.toastMsg.error('error', res.params.errmsg)
      }
    }, (err) => {
      console.log({ err });
      this.toastMsg.error('error', err.error.params.errmsg)
    });

  }

  updateData() {
    this.generalService.putData(this.apiUrl, this.identifier, this.model).subscribe((res) => {
      if (res.params.status == 'SUCCESSFUL') {
        this.router.navigate([this.redirectTo])
      }
      else if (res.params.errmsg != '' && res.params.status == 'UNSUCCESSFUL') {
        this.toastMsg.error('error', res.params.errmsg)
      }
    }, (err) => {
      console.log({ err });
      this.toastMsg.error('error', err.error.params.errmsg)
    });
  }
}


