import { Injectable } from '@angular/core';
import { DataService } from '../data/data-request.service';
import { ApiPaths } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentProfileService {


  constructor(public dataService: DataService) {
  }

  postStudentProfile(data) {
    let url = `${ApiPaths.Student}`;
    const req = {
      url: url,
      data: data
    };

    if(!data.identifier){
      return this.dataService.post(req);
    }else{
      return this.dataService.patch(req);
    }
  }

  getStudentProfile(id) {
    let url = `${ApiPaths.Student}/${id}`;
    const req = {
      url: url
    };

    return this.dataService.get(req);
  }


}

