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
    "type": "object",
    "title": "Comment",
    "properties": {
      "state": {
        "type": "string",
        "enum": ['india','USA','Canada']
      },
      "city": {
        "type": "string",
        "enum": ['--']
      },
    },
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
  yourOnChangesFn(data){
    console.log(data)
    if(data.state){
      console.log(this.getCities(data.state))
      this.schema.properties.city.enum = this.getCities(data.state)
    }
  }


  getCities(nationId: string = null) {
     var cities = [
        {
          label: 'Bolzano',
          nationId: 'india'
        },
        {
          label: 'Rome',
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
      var data = cities.filter(entry => {
        if (nationId) {
          return entry.nationId === nationId;
        } else {
          return true;
        }
      })
      var city_list = [];
      data.forEach(element => {
          city_list.push(element.label)
      });
      return city_list;
  }

}
