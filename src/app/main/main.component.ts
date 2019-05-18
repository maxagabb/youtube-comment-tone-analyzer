import { Component, AfterViewInit } from '@angular/core';
import { YoutubeService } from '../shared/services/youtube.service';


@Component({
  selector: 'main-block',
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.css']
})

export class MainComponent implements AfterViewInit {
  public videoList = [];
  public loadingInProgress = false;
  public repeat = false;
  public shuffle = false;
  private searched = false;
  private pageLoadingFinished = false;
  public playlistElement: any;

  constructor(
    private youtubeService: YoutubeService
  ) {}

  ngAfterViewInit() {
    //this.playlistElement = document.getElementById('playlist');
  }

  handleSearchVideo(videos: Array<any>): void {
    this.searched = true;
    this.videoList = videos;
  }
  searchMore(): void {
    console.log("searchMore called")
    if (this.loadingInProgress || this.pageLoadingFinished || this.videoList.length < 1) {
      return;
    }

    this.loadingInProgress = true;
    this.youtubeService.searchNext()
      .then(data => {
        this.loadingInProgress = false;
        if (data.length < 1 || data.status === 400) {
          setTimeout(() => {
            this.pageLoadingFinished = true;
            setTimeout(() => {
              this.pageLoadingFinished = false;
            }, 10000);
          })
          return;
        }
        data.forEach((val) => {
          this.videoList.push(val);
        });
      }).catch(error => {
        this.loadingInProgress = false;
      })
  }


}
