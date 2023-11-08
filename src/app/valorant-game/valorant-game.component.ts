import {AfterViewInit, Component, OnDestroy, ViewChild} from '@angular/core';
import {RawgApiService} from "../rawg-api.service";

import KeenSlider, {KeenSliderInstance} from "keen-slider";

@Component({
  selector: 'app-valorant-game',
  templateUrl: './valorant-game.component.html',
  styleUrls: ['./valorant-game.component.css']
})
export class ValorantGameComponent  implements AfterViewInit, OnDestroy{

    private rawGApi: RawgApiService;
    public games:any;
    public gamesImages:any;

    constructor(rawGApi: RawgApiService) {
        this.rawGApi = rawGApi;
        this.rawGApi.getRawG();
        this.getGames();
        this.getGameImages();
    }

    // @ts-ignore
    @ViewChild("sliderRef",{ static: false }) sliderRef: ElementRef<HTMLElement>


    // @ts-ignore
    slider: KeenSliderInstance = null

    ngAfterViewInit() {
        this.slider = new KeenSlider(this.sliderRef.nativeElement, {
            loop: true
        })
    }

    ngOnDestroy() {
        if (this.slider) this.slider.destroy()
    }

    getGames() {
        return this.rawGApi.getGameInfo(415171).subscribe(
            (data:any) => {
                this.games = data;
            }
        );

    }
    getGameImages() {
        return this.rawGApi.getGameImages(415171).subscribe(
            (data:any) => {
                this.gamesImages = data.results;
                if (this.slider) {
                    setTimeout(() => {
                        this.slider?.update(undefined, 0)

                        // Required when using indicator dots below the slides
                        this.updateDotHelper()
                    }, 1)
                }
            }
        );

    }

    private updateDotHelper(): void {
        if (this.slider) {
            this.slider.update();
        }
    }
}
