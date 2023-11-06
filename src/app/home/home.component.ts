import {AfterViewChecked, AfterViewInit, Component} from '@angular/core';
import {RawgApiService} from "../rawg-api.service";
import {RawgConfig} from "../rawg-config.config";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{

    private rawGApi: RawgApiService;
    public games:any ;
    constructor(rawGApi: RawgApiService) {
        this.rawGApi = rawGApi;
        this.getGames()
    }

    getGames() {
        return this.rawGApi.getSelectedGame('valorant,call of duty Modern Warfare 2,halo infinite,fifa 23').subscribe(
            (data:any) => this.games = data.results
        );
    }
}
