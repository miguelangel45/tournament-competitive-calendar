import {AfterViewInit, Component, OnDestroy, ViewChild} from '@angular/core';
import {RawgApiService} from "../rawg-api.service";

import KeenSlider, {KeenSliderInstance} from "keen-slider";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {PandascoreApiService} from "../pandascore-api.service";

@Component({
    selector: 'app-valorant-game',
    templateUrl: './valorant-game.component.html',
    styleUrls: ['./valorant-game.component.css']
})
export class ValorantGameComponent implements AfterViewInit, OnDestroy {

    private rawGApi: RawgApiService;
    private pandascoreApi: PandascoreApiService;
    public games: any;
    public gamesImages: any;
    public tournaments: any;
    public infoCaledar: any | undefined;
    private sanitizer: DomSanitizer

    constructor(rawGApi: RawgApiService, DomSanitizer: DomSanitizer, pandascoreApi: PandascoreApiService) {
        this.rawGApi = rawGApi;
        this.pandascoreApi = pandascoreApi;
        this.rawGApi.getRawG();
        this.pandascoreApi.getPandaScoreConf();
        this.getGames();
        this.getGameImages();
        this.getTeams();
        this.sanitizer = DomSanitizer;
    }

    // @ts-ignore
    @ViewChild("sliderRef", {static: false}) sliderRef: ElementRef<HTMLElement>


    // @ts-ignore
    slider: KeenSliderInstance = null

    ngAfterViewInit() {
        this.slider = new KeenSlider(this.sliderRef.nativeElement, {
            loop: true
        })
        setInterval(() => {
            this.slider.next();
        }, 3000);
    }

    ngOnDestroy() {
        if (this.slider) this.slider.destroy()
    }

    getGames() {
        return this.rawGApi.getGameInfo(415171).subscribe(
            (data: any) => {
                this.games = data;
            }
        );

    }

    getGameImages() {
        return this.rawGApi.getGameImages(415171).subscribe(
            (data: any) => {
                this.gamesImages = data.results;
                if (this.slider) {
                    setTimeout(() => {
                        this.slider?.update({loop: true}, 0)

                        // Required when using indicator dots below the slides
                        this.updateDotHelper()
                    }, 1)
                }
            }
        );

    }

    private updateDotHelper(): void {
        if (this.slider) {
            this.slider.update({loop: true});
        }
    }

    public getTeams() {
        this.pandascoreApi.getGameTournament('valorant').subscribe(
            (data:any) => {
                this.tournaments = data;
            }
        );
    }
    public changeInfo(matches: any){
        this.infoCaledar = matches;
    }
    public sanitizeUrl(url: string): SafeUrl{
        return this.sanitizer.bypassSecurityTrustResourceUrl(<string>url);
    }
}
