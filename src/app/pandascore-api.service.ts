import {Injectable} from '@angular/core';
import {PandascoreConfig} from "./pandascore-config.config";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class PandascoreApiService {

    private pandascoreConfigFile: string = 'assets/pandascore.json'
    private pandascoreConfig: PandascoreConfig = {
        "pandascoreUrl": "https://api.pandascore.co/",
        "key": "-kq7BEgNGiPftYZDIdT7sTLR4SllA-_XdRV19CbG_x1o7AM8Hh0"
    };
    private http: HttpClient;
    private headers: HttpHeaders;

    constructor(http: HttpClient) {
        this.http = http;
        this.headers = new HttpHeaders(
            {
                'accept': 'application/json',
                'authorization': `Bearer ${this.pandascoreConfig.key}`
            }
        )
        this.showRawGConfig();
    }

    getPandaScoreConf() {
        return this.http.get<PandascoreConfig>(this.pandascoreConfigFile);
    }
    showRawGConfig(){
        return this.getPandaScoreConf().subscribe((data: PandascoreConfig) => { this.pandascoreConfig = {...data} });
    }

    getGameTournament(game:string, pagination: number = 1){
        return this.http.get<PandascoreConfig>(`${this.pandascoreConfig.pandascoreUrl}${game}/tournaments?page=${pagination}`, {
            headers:this.headers
        })
    }
}
