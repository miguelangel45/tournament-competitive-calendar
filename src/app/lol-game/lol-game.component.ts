import {Component, ViewChild} from '@angular/core';
import {RawgApiService} from "../rawg-api.service";
import {PandascoreApiService} from "../pandascore-api.service";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import KeenSlider, {KeenSliderInstance} from "keen-slider";

@Component({
  selector: 'app-lol-game',
  templateUrl: './lol-game.component.html',
  styleUrls: ['./lol-game.component.css']
})
export class LolGameComponent {
    private rawGApi: RawgApiService;
    private pandascoreApi: PandascoreApiService;
    public games: any;
    public gamesImages: any;
    public tournaments: any;
    public infoCaledar: any | undefined;
    private sanitizer: DomSanitizer;
    public page: number = 0;
    public loading: boolean = false;

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
        return this.rawGApi.getGameInfo(23598).subscribe(
            (data: any) => {
                this.games = data;
            }
        );

    }

    getGameImages() {
        return this.rawGApi.getGameImages(23598).subscribe(
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

    public getTeams(pageUp: boolean = true) {
        if(pageUp){
            this.page +=1;
        }else {
            this.page = (this.page <= 1)?1:this.page -=1
        }
        this.loading = true;
        this.infoCaledar = []
        this.pandascoreApi.getGameTournament('lol', this.page).subscribe(
            (data:any) => {
                this.loading = false;
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
