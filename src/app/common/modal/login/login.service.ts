
import { Injectable } from '@angular/core';
import "rxjs/add/operator/map";
import { ApisService } from '../../../services/apis.service';

@Injectable()
export class LoginService {
    constructor(public appBaseService: ApisService) { }

    login(body) {
        return this.appBaseService.post('login', body);
    }
}