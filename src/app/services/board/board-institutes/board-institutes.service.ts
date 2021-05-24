import { Injectable } from '@angular/core';
import { DataService } from '../../data/data-request.service';

@Injectable({
  providedIn: 'root'
})
export class BoardInstituteService {

  constructor(public dataService: DataService) {
  }

  getBordInstitute() {
    let url = 'https://reqres.in/api/users?page=2';

    const req = {
      url: url
    };

    return this.dataService.get(req);
  }


}
