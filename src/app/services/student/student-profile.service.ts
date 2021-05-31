import { Injectable } from '@angular/core';
import { DataService } from '../data/data-request.service';
import { environment, ApiPaths } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentProfileService {
  baseUrl = environment.baseUrl;


  constructor(public dataService: DataService) {
  }

  postStudentProfile(data) {
    let url = `${this.baseUrl}/${ApiPaths.Student}`;
    const req = {
      url: url,
      data: data
    };

    if(!data.identifier){
      return this.dataService.post(req);
    }else{
      return this.dataService.put(req);
    }
  }

  getStudentProfile(id) {
    let url = `${this.baseUrl}/${ApiPaths.Student}/${id}`;
    const req = {
      url: url
    };

    return this.dataService.get(req);
  }


}

