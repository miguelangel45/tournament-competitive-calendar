import { Component } from '@angular/core';
import {RawgApiService} from "./rawg-api.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CompetitiveCalendar';
    private rawGApi: RawgApiService;
    constructor(rawGApi: RawgApiService) {
        this.rawGApi = rawGApi;
        this.rawGApi.getRawG();
    }
}
