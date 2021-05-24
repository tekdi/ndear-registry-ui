import { Injectable } from '@angular/core';
import { DataService } from '../data/data-request.service';


@Injectable({
  providedIn: 'root'
})
export class InstituteProfileService {

  constructor(public dataService: DataService) {
  }

  postInstituteProfile(data) {
    let url = 'https://ndear.xiv.in/registry/api/v1/School';

    const req = {
      url: url,
      data: data
    };

    return this.dataService.post(req);
  }

  getInstituteProfile() {
    let url = 'https://ndear.xiv.in/registry/api/v1/School/1-8960e82c-e941-4d47-b160-788ed7786dc6';

    const req = {
      url: url
    };

    return this.dataService.get(req);
  }


}

