import { Injectable } from '@angular/core';
import { DataService } from '../data/data-request.service';
import { environment, ApiPaths } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InstituteProfileService {

  baseUrl = environment.baseUrl;

  constructor(public dataService: DataService) {
  }

  postInstituteProfile(data) {
    let url = `${this.baseUrl}/${ApiPaths.Institute}`;
    const req = {
      url: url,
      data: data
    };

      return this.dataService.post(req);
  }

  putInstituteProfile(data, id) {
    let url = `${this.baseUrl}/${ApiPaths.Institute}/` + id;
    const req = {
      url: url,
      data: data
    };

    return this.dataService.put(req);
  }

  getInstituteProfile(id) {
    let url = `${this.baseUrl}/${ApiPaths.Institute}`;
    const req = {
      url: url
    };

    return this.dataService.get(req);
  }


}

