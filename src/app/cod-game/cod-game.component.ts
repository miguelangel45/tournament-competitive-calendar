import {AfterViewInit, Component, OnDestroy, ViewChild, ElementRef} from '@angular/core';
import {RawgApiService} from "../rawg-api.service";
import KeenSlider, {KeenSliderInstance} from "keen-slider";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {PandascoreApiService} from "../pandascore-api.service";

@Component({
  selector: 'app-cod-game',
  templateUrl: './cod-game.component.html',
  styleUrls: ['./cod-game.component.css']
})
export class CodGameComponent implements AfterViewInit, OnDestroy {
    private rawGApi: RawgApiService;
    private pandascoreApi: PandascoreApiService;
    public games: any;
    public gamesImages: any;
    public tournaments: any;
    public infoCaledar: any | undefined;
    private sanitizer: DomSanitizer;
    public page: number = 0;
    public loading: boolean = false;
    protected video: string | undefined;
    protected video_url: string | undefined;
    public selectedFilter: string = 'all';

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

    @ViewChild("sliderRef", {static: false}) sliderRef!: ElementRef<HTMLElement>;
    slider: KeenSliderInstance | null = null;

    ngAfterViewInit() {
        this.slider = new KeenSlider(this.sliderRef.nativeElement, {
            loop: true,
            mode: "free-snap",
            slides: {
                perView: 2,
                spacing: 15,
            },
            breakpoints: {
                '(max-width: 768px)': {
                    slides: { perView: 1, spacing: 10 },
                },
            },
        });
    }

    ngOnDestroy() {
        if (this.slider) this.slider.destroy()
    }

    getGames() {
        return this.rawGApi.getGameInfo(872778).subscribe(
            (data: any) => {
                this.games = data;
            }
        );
    }

    getGameImages() {
        return this.rawGApi.getGameImages(872778).subscribe(
            (data: any) => {
                this.gamesImages = data.results;
                if (this.slider) {
                    setTimeout(() => {
                        this.slider?.update(undefined, 0);
                        this.updateDotHelper();
                    }, 1);
                }
            }
        );
    }

    private updateDotHelper(): void {
        if (this.slider) {
            this.slider.update();
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
        this.pandascoreApi.getGameTournament('codmw', this.page).subscribe(
            (data:any) => {
                this.loading = false;
                this.tournaments = data;
            }
        );
    }

    public changeInfo(matches: any){
        this.infoCaledar = matches;
    }

    public sanitizeUrl(url: SafeUrl | undefined): SafeUrl{
        return this.sanitizer.bypassSecurityTrustResourceUrl(<string>url);
    }

    public getCurrentDomain(){
        return window.location.hostname
    }

    public showStream(url: string, embed_url: string){
        this.video = this.checkSource(url);
        this.video_url = embed_url;
    }

    public checkSource(url: string) : string | undefined {
        let domain = (new URL(url));
        if(domain.hostname == 'www.youtube.com'){
            return 'youtube';
        }
        if (domain.hostname == 'www.twitch.tv'){
            return 'twitch';
        }
        return undefined;
    }

    filterTournaments(status: string) {
        this.selectedFilter = status;
    }

    get filteredTournaments() {
        if (!this.tournaments) return [];
        if (this.selectedFilter === 'all') {
            return this.tournaments;
        }

        const now = new Date();
        return this.tournaments.filter((t: any) => {
            const beginDate = new Date(t.begin_at);
            const endDate = new Date(t.end_at);

            if (this.selectedFilter === 'live') {
                return now >= beginDate && now <= endDate;
            } else if (this.selectedFilter === 'upcoming') {
                return now < beginDate;
            } else if (this.selectedFilter === 'completed') {
                return now > endDate;
            }
            return true;
        });
    }

    getStatusClass(tournament: any): string {
        const now = new Date();
        const beginDate = new Date(tournament.begin_at);
        const endDate = new Date(tournament.end_at);

        if (now >= beginDate && now <= endDate) {
            return 'status-live';
        } else if (now < beginDate) {
            return 'status-upcoming';
        } else {
            return 'status-completed';
        }
    }

    getStatusLabel(tournament: any): string {
        const now = new Date();
        const beginDate = new Date(tournament.begin_at);
        const endDate = new Date(tournament.end_at);

        if (now >= beginDate && now <= endDate) {
            return 'En Vivo';
        } else if (now < beginDate) {
            return 'Próximamente';
        } else {
            return 'Finalizado';
        }
    }

    getTournamentStatus(tournament: any): 'live' | 'upcoming' | 'completed' {
        const now = new Date();
        const beginDate = new Date(tournament.begin_at);
        const endDate = new Date(tournament.end_at);

        if (now >= beginDate && now <= endDate) {
            return 'live';
        } else if (now < beginDate) {
            return 'upcoming';
        } else {
            return 'completed';
        }
    }
}
