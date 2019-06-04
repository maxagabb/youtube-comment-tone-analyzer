import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { YoutubeService } from '../shared/services/youtube.service';
//import { YoutubePlayerService } from '../../shared/services/youtube-player.service';
//import { PlaylistStoreService } from '../../shared/services/playlist-store.service';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent {
  @Input() videoList;
  @Input() loadingInProgress;
  @Output() commentThreads = new EventEmitter();

  constructor(
    private router: Router,
    private youtubeService: YoutubeService,
    //private youtubePlayer: YoutubePlayerService,
    //private playlistService: PlaylistStoreService
  ) { }

  /*play(video: any): void {
    //this.youtubePlayer.playVideo(video.id, video.snippet.title);
    this.addToPlaylist(video);
  }

  addToPlaylist(video: any): void {
    this.videoPlaylist.emit(video);
  }*/
  emitComments(video: any): void {
    this.youtubeService.getComments(video.id)
      .then(data => {
        if (data.length < 1) {
          //this.notificationService.showNotification('No matches found.');
        }
        this.commentThreads.emit(data);
        //this.router.navigateByUrl('/comments');
        //console.log("videoID:", video.id);
      }).then(() => {
        //this.router.navigateByUrl('/comments');
      })



  }
}
