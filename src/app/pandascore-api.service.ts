import {Injectable} from '@angular/core';
import {PandascoreConfig} from "./pandascore-config.config";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class PandascoreApiService {

    private pandascoreConfigFile: string = 'assets/pandascore.json'
    private pandascoreConfig: PandascoreConfig = {
        "pandascoreUrl": "https://resonant-kaycee-jarcidci.koyeb.app/public/api/game/",
    };
    private http: HttpClient;

    constructor(http: HttpClient) {
        this.http = http;
        this.showRawGConfig();
    }

    getPandaScoreConf() {
        return this.http.get<PandascoreConfig>(this.pandascoreConfigFile);
    }
    showRawGConfig(){
        return this.getPandaScoreConf().subscribe((data: PandascoreConfig) => { this.pandascoreConfig = {...data} });
    }

    getGameTournament(game:string, pagination: number = 1){
        return this.http.get<PandascoreConfig>(`${this.pandascoreConfig.pandascoreUrl}${game}/tournaments?page=${pagination}`, {})
    }
}
