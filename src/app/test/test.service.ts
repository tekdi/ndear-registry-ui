import { Injectable } from '@angular/core';
import { DataService } from '../services/data/data-request.service';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(public dataService: DataService) { }
  getDetailsByPincode(id) {
    let url = `https://api.postalpincode.in/pincode/${id}`;
    const req = {
      url: url
    };

    return this.dataService.get(req);
  }
}
