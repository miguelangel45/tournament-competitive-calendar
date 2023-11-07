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
        let rawUrl = 'https://api.rawg.io/api/';
        let key = '45576eee224740b88fa7a7f47f4bde0f';
        if (this.config) {
            rawUrl = this.config.rawgUrl;
            key = this.config.key;
        }


        return this.http.get(`${rawUrl}games?key=${key}&search=${game}`)
    }
}
