
import { Injectable } from '@angular/core';
import "rxjs/add/operator/map";
import { ApisService } from '../services/apis.service';

@Injectable()
export class RegisterService {
    constructor(public appBaseService: ApisService) { }

    register(body) {
        return this.appBaseService.post('register', body);
    }
}