
import { Injectable } from '@angular/core';
import "rxjs/add/operator/map";
import { ApisService } from '../services/apis.service';

@Injectable()
export class RegisterService {
    constructor(public appBaseService: ApisService) { }

    register(body) {
        return this.appBaseService.post('register', body);
    }

    register2(body) {
        return this.appBaseService.post('register2', body);
    }

    cities(body) {
        return this.appBaseService.get('get_cities_by_state/al', body);
    }

    states(body) {
        return this.appBaseService.get('get_all_states_by_country/USA', body);
    }

    countries(body) {
        return this.appBaseService.get('register', body);
    }
}