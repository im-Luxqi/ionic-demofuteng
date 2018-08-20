import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class DashboardService {

    constructor(
        private http: HttpClient,
    ) {

    }
    getData() {
        return this.http.get('http://192.168.1.168:50002/api/DashBoard/NotByType');
     }
}