import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RawgConfig} from "./rawg-config.config";
import {Observable, Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RawgApiService {

    private configFile: string = 'assets/rawg.json';
    private config : RawgConfig | undefined;
    private http: HttpClient;
    constructor(http: HttpClient) {
        this.http = http;
        this.showRawGConfig()
    }

    getRawG() {
        return this.http.get<RawgConfig>(this.configFile);
    }
    showRawGConfig(){
        return this.getRawG().subscribe((data: RawgConfig) => { this.config = {...data} });
    }

    getSelectedGame(game: string) {
        return this.http.get(`${this.config?.rawgUrl}games?key=${this.config?.key}&search=${game}`)
    }
}
