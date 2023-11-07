import {
    AfterViewInit,
    Component,
    OnDestroy,
    ElementRef,
    ViewChild,
    HostListener,
    AfterContentInit
} from '@angular/core';
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
    @ViewChild("sliderRef",{ static: false }) sliderRef: ElementRef<HTMLElement>



    @HostListener('window:resize', ['$event'])
    sizeChange(event:any) {
        console.log('size changed.', event);
    }

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
        return this.rawGApi.getSelectedGame('valorant,halo-infinite,fifa-23,Call-of-duty:-Modern-warfare-2&parent_platforms=1&exclude_collection=true&dates=2018-01-01,2022-12-31&publishers=microsoft-studios,activision-blizzard,electronic-arts,riot-games').subscribe(
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
