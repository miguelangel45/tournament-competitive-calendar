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

    constructor(rawGApi: RawgApiService) {
        this.rawGApi = rawGApi;
        this.rawGApi.getRawG();
        this.getGames()
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
        return this.rawGApi.getSelectedGame('valorant&parent_platforms=1&exclude_collection=true&publishers=riot-games').subscribe(
            (data:any) => {
                this.games = data.results;
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
