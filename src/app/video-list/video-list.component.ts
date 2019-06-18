import { Component, Input, Output, EventEmitter,OnInit,OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { YoutubeService } from '../shared/services/youtube.service';
import { searchAgain } from '../shared/services/scroll.service';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent {
  @Input() loadingInProgress;
  @Output() commentThreads = new EventEmitter();
  @Output() searchAgain = new EventEmitter();
  private pageLoadingFinished = false;
  subscription;
  videoList = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private youtubeService: YoutubeService,
  ) { }

  ngOnInit() {
    this.route.data
      .subscribe(data => {
        this.videoList = data.videos;
      });
    this.subscription = searchAgain.subscribe(data => {
      this.searchMore();
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  goToComments(video: any): void {
    this.router.navigateByUrl(`/comments/${video.id}`);
  }
  searchMore(): void {
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
