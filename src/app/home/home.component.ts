import {AfterViewInit, Component, OnDestroy, ElementRef, ViewChild} from '@angular/core';
import {RawgApiService} from "../rawg-api.service";
import KeenSlider, {KeenSliderInstance} from "keen-slider";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit, OnDestroy{

    private rawGApi: RawgApiService;
    public games:any;

    constructor(rawGApi: RawgApiService) {
        this.rawGApi = rawGApi;
        this.rawGApi.getRawG();
        this.getGames()
    }

    // @ts-ignore
    @ViewChild("sliderRef") sliderRef: ElementRef<HTMLElement>

    // @ts-ignore
    slider: KeenSliderInstance = null

    ngAfterViewInit() {
        this.slider = new KeenSlider(this.sliderRef.nativeElement, {
            loop: true,
        })
    }

    ngOnDestroy() {
        if (this.slider) this.slider.destroy()
    }

    getGames() {
        return this.rawGApi.getSelectedGame('valorant,halo infinite,fifa 23&search_precise=true&parent_platforms=1').subscribe(
            (data:any) => this.games = data.results
        );
    }
}
