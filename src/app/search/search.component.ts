import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { YoutubeService } from '../shared/services/youtube.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent {
  @Output() videosUpdated = new EventEmitter();
  @Input() loadingInProgress;

  private last_search: string;

  public searchForm = this.fb.group({
    query: ['', Validators.required]
  });

  constructor(
    public fb: FormBuilder,
    private youtubeService: YoutubeService,
    //private youtubePlayer: YoutubePlayerService,
    //private notificationService: NotificationService
  ) {
    /*this.youtubeService.searchVideos('')
      .then(data => {
        this.videosUpdated.emit(data);
      })*/
    //this.videosUpdated.emit(this.youtubeService.searchVideos(''));
  }

  doSearch(event): void {
    if (this.loadingInProgress ||
      (this.searchForm.value.query.trim().length === 0) ||
      (this.last_search && this.last_search === this.searchForm.value.query)) {
      return;
    }

    this.videosUpdated.emit([]);
    this.last_search = this.searchForm.value.query;

    this.youtubeService.searchVideos(this.last_search)
      .then(data => {
        if (data.length < 1) {
          //this.notificationService.showNotification('No matches found.');
        }
        this.videosUpdated.emit(data);
      })
  }
}
