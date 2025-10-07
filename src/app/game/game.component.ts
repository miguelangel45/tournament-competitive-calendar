import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RawgApiService} from '../rawg-api.service';
import {PandascoreApiService} from "../pandascore-api.service";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
    public gameName: string = '';
    public gameData: any;
    public gameImages: any[] = [];
    public loading: boolean = true;

    public games: any;
    public gamesImages: any;
    public tournaments: any;
    public infoCaledar: any | undefined;
    private sanitizer: DomSanitizer;
    public page: number = 0;
    protected video: string | undefined;
    protected video_url: string | undefined;
    public selectedFilter: string = 'all';


    constructor(
        private route: ActivatedRoute,
        private rawGApi: RawgApiService,
        private DomSanitizer: DomSanitizer,
        private pandascoreApi: PandascoreApiService
    ) {
        this.rawGApi = rawGApi;
        this.pandascoreApi = pandascoreApi;
        this.rawGApi.getRawG();
        this.pandascoreApi.getPandaScoreConf();
        this.sanitizer = DomSanitizer;
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.gameName = params.get('game') || '';
            if (this.gameName) {
                this.searchGame(this.gameName);
                this.getTeams();
            }
        });
    }

    public getTeams(pageUp: boolean = true) {
        if(pageUp){
            this.page +=1;
        }else {
            this.page = (this.page <= 1)?1:this.page -=1
        }
        this.loading = true;
        this.infoCaledar = []
        this.pandascoreApi.getGameTournament(this.gameName, this.page).subscribe(
            (data:any) => {
                this.loading = false;
                this.tournaments = data;
                this.filterTournaments(this.selectedFilter);
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

    searchGame(name: string) {
        this.loading = true;
        this.rawGApi.getSelectedGames(name).subscribe((result: any) => {
            if (result && result.results && result.results.length > 0) {
                this.gameData = result.results[0];
                this.getGameImages(this.gameData.id);
            } else {
                this.gameData = null;
                this.gameImages = [];
                this.loading = false;
            }
        });
    }

    getGameImages(gameId: number) {
        this.rawGApi.getGameImages(gameId).subscribe((images: any) => {
            this.gameImages = images.results || [];
            this.loading = false;
        });
    }
}

