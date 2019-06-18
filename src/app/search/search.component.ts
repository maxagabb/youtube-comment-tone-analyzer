import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { YoutubeService } from '../shared/services/youtube.service';
import { Router } from '@angular/router';

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
    private router: Router
  ) {
  }

  doSearch(event): void {
    if (this.loadingInProgress ||
      (this.searchForm.value.query.trim().length === 0)) {
      return;
    }
    
    this.last_search = this.searchForm.value.query;
    this.router.navigate(['/videos'], { queryParams: { query: this.last_search } });

  }
}
