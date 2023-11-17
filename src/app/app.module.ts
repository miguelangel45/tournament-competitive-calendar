import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {ToolbarComponent} from './toolbar/toolbar.component';
import {RouterLink, RouterLinkActive, RouterModule, RouterOutlet, Routes} from "@angular/router";
import {HomeComponent} from './home/home.component';
import {ValorantGameComponent} from './valorant-game/valorant-game.component';
import {CodGameComponent} from './cod-game/cod-game.component';
import {FifaGameComponent} from './fifa-game/fifa-game.component';
import {HttpClientModule} from "@angular/common/http";
import {LolGameComponent} from './lol-game/lol-game.component';

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'calendar/valorant', component: ValorantGameComponent},
    {path: 'calendar/lol', component: LolGameComponent},
    {path: 'calendar/call-of-duty', component: CodGameComponent},
    {path: 'calendar/fifa', component: FifaGameComponent},
];

@NgModule({
    declarations: [
        AppComponent,
        ToolbarComponent,
        HomeComponent,
        ValorantGameComponent,
        LolGameComponent,
        CodGameComponent,
        FifaGameComponent,
        LolGameComponent
    ],
    imports: [
        RouterModule.forRoot(routes),
        BrowserModule,
        RouterLink,
        RouterOutlet,
        RouterLinkActive,
        HttpClientModule,
    ],
    exports: [
        RouterModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
