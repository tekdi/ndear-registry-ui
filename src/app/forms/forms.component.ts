import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SchemaService } from '../services/data/schema.service';
import * as FormSchemas from './forms.json'
import { FormControl, FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyJsonschema } from '@ngx-formly/core/json-schema';
import { JSONSchema7 } from "json-schema";
import { GeneralService } from '../services/general/general.service';
import { PanelsComponent } from '../layouts/modal/panels/panels.component';
import { Location } from '@angular/common'
import { title } from 'process';
import { combineLatest, startWith, switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
// import { of } from 'rxjs';
import { of as observableOf } from 'rxjs';
// import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { truncate } from 'fs';


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
  searchResult: any[] = [];
  constructor(private route: ActivatedRoute, public router: Router, public schemaService: SchemaService, private formlyJsonschema: FormlyJsonschema, public generalService: GeneralService, private location: Location) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log('params', params)
      // this.form = params['form']
      this.add = this.router.url.includes('add');
      console.log(this.add);
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
      console.log(Object.keys(obj)[0])
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
      console.log("this.responseData", this.responseData);
      // console.log("formSchema",this.formSchema);
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
    console.log("schema", this.schema)

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

      console.log("except", this.definations[fieldset.definition].properties[field])
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
      if (field.autofill) {
        if (field.autofill.apiURL) {
          console.log("autofill.1",field.autofill.apiURL)
          this.responseData.definitions[fieldset.definition].properties[field.name]['widget']['formlyConfig']['modelOptions'] = {
            updateOn: 'blur'
          };
          this.responseData.definitions[fieldset.definition].properties[field.name]['widget']['formlyConfig']['asyncValidators'] = {}
          this.responseData.definitions[fieldset.definition].properties[field.name]['widget']['formlyConfig']['asyncValidators'][field.name] = {}
          this.responseData.definitions[fieldset.definition].properties[field.name]['widget']['formlyConfig']['asyncValidators'][field.name]['expression'] = (control: FormControl) => {
            console.log("autofill.2",field.autofill.apiURL)
            if(control.value != null) {
              console.log("control.value------------"+control.value);
              if(field.autofill.method === 'GET'){
                var apiurl = field.autofill.apiURL.replace("{{value}}", control.value)
                this.generalService.getPrefillData(apiurl).subscribe((res) => {
                  console.log({ res });
                  if (field.autofill.fields) {
                    field.autofill.fields.forEach(element => {
                      for (var [key1, value1] of Object.entries(element)) {
                        this.createPath(this.model, key1, this.ObjectbyString(res, value1))
                        this.form2.get(key1).setValue(this.ObjectbyString(res, value1))
                        // console.log(`keyval -- ${JSON.stringify(this.model)}: ${this.ObjectbyString(res, value1)}`);
                      }
                    });
                  }
                  if (field.autofill.dropdowns) {
                    field.autofill.dropdowns.forEach(element => {
                      for (var [key1, value1] of Object.entries(element)) {
                        console.log(Array.isArray(res))
                        if (Array.isArray(res)){
                          res = res[0]
                        }
                        this.schema["properties"][key1]['items']['enum'] = this.ObjectbyString(res, value1)
                        // this.createPath(this.model, key1, this.ObjectbyString(res, value1))
                        // this.form2.get(key1).setValue(this.ObjectbyString(res, value1))
                        // console.log(`keyval -- ${JSON.stringify(this.model)}: ${this.ObjectbyString(res, value1)}`);
                      }
                    });
                  }
                });
              }
              else if(field.autofill.method === 'POST'){
                var datapath = this.findPath(field.autofill.body, "{{value}}",'')
                console.log('datapath',datapath)
                if(datapath){
                  var dataobject = this.setPathValue(field.autofill.body, datapath, control.value)
                console.log("--datapath--",dataobject)
                this.generalService.postPrefillData(field.autofill.apiURL,dataobject).subscribe((res) => {
                  console.log({ res });
                  if (field.autofill.fields) {
                    field.autofill.fields.forEach(element => {
                      for (var [key1, value1] of Object.entries(element)) {
                        console.log("val1--",this.ObjectbyString(res, value1))
                        this.createPath(this.model, key1, this.ObjectbyString(res, value1))
                        this.form2.get(key1).setValue(this.ObjectbyString(res, value1))
                        // console.log(`keyval -- ${JSON.stringify(this.model)}`);
                      }
                    });
                  }
                  if (field.autofill.dropdowns) {
                    field.autofill.dropdowns.forEach(element => {
                      for (var [key1, value1] of Object.entries(element)) {
                        if (Array.isArray(res)){
                          res = res[0]
                        }
                        console.log(this.ObjectbyString(res, value1));
                       
                        this.schema["properties"][key1]['items']['enum'] = this.ObjectbyString(res, value1)
                        // this.createPath(this.model, key1, this.ObjectbyString(res, value1))
                        // this.form2.get(key1).setValue(this.ObjectbyString(res, value1))
                        console.log(`schema -- ${JSON.stringify(this.schema)}`);
                      }
                    });
                  }
                });
                }
                
              }
            }
          }
        }
      }
      if (field.type) {
        if (field.type == "autocomplete") {
          //   this.responseData.definitions[fieldset.definition].properties[field.name]['widget']['formlyConfig']['templateOptions'] = {
          //     "required": true,
          // "label": "Autocomplete",
          // "placeholder": "Placeholder",
          // "filter": term => of(term ? this.filtersearchResult(term) : searchResult.slice())
          //   }
          // this.responseData.definitions[fieldset.definition].properties[field.name]['widget']['formlyConfig']['hooks']= {
          // onInit: (field) => {
          //   console.log("here",field)
          //   field.templateOptions.filter$ = field.formControl.valueChanges
          //     .pipe(
          //       startWith(''),
          //       combineLatest(this.selectedValue$),
          //       switchMap(this.filtersearchResult()),
          //     )
          // }
          // }

          this.responseData.definitions[fieldset.definition].properties[field.name]['widget']['formlyConfig']['type'] = "autocomplete";
          this.responseData.definitions[fieldset.definition].properties[field.name]['widget']['formlyConfig']['templateOptions']['placeholder'] = this.responseData.definitions[fieldset.definition].properties[field.name]['title'];
          // this.responseData.definitions[fieldset.definition].properties[field.name]['widget']['formlyConfig']['templateOptions']['key$'] = (key) => {return observableOf(field.key);}
          // this.responseData.definitions[fieldset.definition].properties[field.name]['widget']['formlyConfig']['templateOptions']['value$'] = (value) => {return observableOf(field.value);}
          this.responseData.definitions[fieldset.definition].properties[field.name]['widget']['formlyConfig']['templateOptions']['search$'] = (term) => {
            if (term || term != '') {
              var formData = {
                "filters": {},
                "limit": 20,
                "offset": 0
              }
              formData.filters[field.key] = {};
              formData.filters[field.key]["contains"] = term
              this.generalService.postData(field.api, formData).subscribe(async (res) => {
                console.log({ res });
                // return observableOf(res);
                let items = res;
                items = items.filter(x => x[field.key].toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) > -1);
                if (items) {
                  console.log("items--", items)
                  this.searchResult = items;
                  return observableOf(this.searchResult);
                  // return observableOf(items);
                  // return of(items).pipe(delay(500));
                }
              });

            }
            return observableOf(this.searchResult.filter(v => v[field.key].toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));
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
    console.log("model", this.model, this.type, this.identifier)

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
      console.log("modellll--", this.model);
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

  filtersearchResult(term: string) {
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
    // return searchResult.filter(state =>
    //   state.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  // filtersearchResult() {
  //   return ([term, searchResult]) => {
  //     return of(term
  //     ? searchResult.filter(state =>
  //     state.toLowerCase().indexOf(term.toLowerCase()) === 0)
  //     : searchResult.slice());
  //   }
  //   ;
  // }

  // changeState(){
  //   if(this.selectedValue$.value.length !== 3){
  //     this.selectedValue$.next(searchResult2);
  //   } else {
  //     this.selectedValue$.next(searchResult);
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
      console.log({ res }, definition);
      // if(this.property[definition])
      this.model = res[0];
      this.identifier = res[0].osid;
      console.log("hereeeeeee", this.model)
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
      else {
        alert(res.params.status);
      }
    });

  }

  updateData() {
    this.generalService.putData(this.apiUrl, this.identifier, this.model).subscribe((res) => {
      if (res.params.status == 'SUCCESSFUL') {
        this.router.navigate([this.redirectTo])
      }
      else {
        alert(res.params.status);
      }
    });
  }

  // close() {
  //   this.location.back()
  //   // this.panel.close();
  // }

  ObjectbyString = function (o, s) {
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, '');           // strip a leading dot
    var a = s.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
      var k = a[i];
      if (k in o) {
        o = o[k];
      } else {
        return;
      }
    }
    return o;
  };

  createPath = (obj, path, value = null) => {
    path = typeof path === 'string' ? path.split('.') : path;
    let current = obj;
    while (path.length > 1) {
      const [head, ...tail] = path;
      path = tail;
      if (current[head] === undefined) {
        current[head] = {};
      }
      current = current[head];
    }
    current[path[0]] = value;
    return obj;
  };

  findPath = (obj, value, path) => {
    if (typeof obj !== 'object') {
      return false;
    }
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        var t = path;
        var v = obj[key];
        //SLICE is super important, otherwise newPath will reference path
        var newPath = path ? path.slice() : [];
        newPath.push(key);
        if (v === value) {
          return newPath;
        } else if (typeof v !== 'object') {
          newPath = t;
        }
        var res = this.findPath(v, value, newPath);
        if (res) {
          return res;
        }
      }
    }
    return false;
  }

  setPathValue(obj, path, value) {
    var keys;
    if(typeof path === 'string') {
      keys = path.split(".");
    }
    else{
      keys = path;
    }
    const propertyName = keys.pop();
    let propertyParent = obj;
    while (keys.length > 0) {
      const key = keys.shift();
      if (!(key in propertyParent)) {
        propertyParent[key] = {};
      }
      propertyParent = propertyParent[key];
    }
    propertyParent[propertyName] = value;
    return obj;
  }

}


