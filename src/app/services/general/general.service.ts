import { Injectable } from '@angular/core';
import { DataService } from '../../services/data/data-request.service';
import { environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  baseUrl = environment.baseUrl;

  constructor(public dataService: DataService) {
  }

  postData(apiUrl,data) {
    let url = `${this.baseUrl}${apiUrl}`;
    const req = {
      url: url,
      data: data
    };

    return this.dataService.post(req);
  }

  getData(apiUrl,id) {
    let url = `${this.baseUrl}${apiUrl}/${id}`;
    const req = {
      url: url
    };

    return this.dataService.get(req);
  }

  putData(apiUrl,id, data) {
    let url = `${this.baseUrl}${apiUrl}/${id}`;
    const req = {
      url: url,
      data: data
    };
    return this.dataService.put(req);
  }


}

