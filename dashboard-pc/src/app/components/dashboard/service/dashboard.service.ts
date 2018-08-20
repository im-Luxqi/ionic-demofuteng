import { Injectable, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()


export class DashboardService {

    constructor(
        private http: HttpClient,
    ) {

    }
    getData() {
       return this.http.get('/api/DashBoard/NotByType');
    }
}
