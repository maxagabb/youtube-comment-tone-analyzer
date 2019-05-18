import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpHandler } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { YoutubeService } from './shared/services/youtube.service';
import { SearchComponent } from './search/search.component';

import { ReactiveFormsModule } from '@angular/forms';
import { VideoListComponent } from './video-list/video-list.component';

import { VideoDurationPipe } from './shared/pipes/video-duration.pipe';
import { VideoLikesViewsPipe } from './shared/pipes/video-likes-views.pipe';
import { VideoNamePipe } from './shared/pipes/video-name.pipe';
import { MainComponent } from './main/main.component';
import { LazyScrollDirective } from './shared/directives/lazy-scroll.directive';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    VideoListComponent,


    VideoDurationPipe,
    VideoLikesViewsPipe,
    VideoNamePipe,
    MainComponent,
    LazyScrollDirective
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [YoutubeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
