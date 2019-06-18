import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { WatsonService } from '../shared/services/watson.service'
import { ActivatedRoute, Router } from '@angular/router';
import { YoutubeService } from '../shared/services/youtube.service';
import { searchAgain } from '../shared/services/scroll.service';
declare var componentHandler: any;
@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.css']
})
export class CommentSectionComponent implements OnInit {
  @Input() loadingInProgress;
  private pageLoadingFinished = false;
  commentThreads = [];
  data;
  subscription;

  constructor(
    private watson: WatsonService,
    private youtubeService: YoutubeService,
    private route: ActivatedRoute,
    private router: Router) {}
  ngOnInit() {
    this.route.data
      .subscribe(data => {
        this.commentThreads = data.comments;
      });
    this.subscription = searchAgain.subscribe(data => {
      this.searchMore();
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  ngAfterViewChecked() {
    componentHandler.upgradeAllRegistered();
  }

  analyzeComment(comment: any): void {
    if (!comment.isAnalyzed) {
      var text = comment.snippet.topLevelComment.snippet.textOriginal;
      comment.hasSentenceTones = true;  comment.isAnalyzed = true;
      comment.isLoading = true; comment.isLong = false;
      comment.showAnalysis = true;

      this.watson.analyzeContent(text)
        .then(function (data) {
          comment.data = data;
          var analysis = JSON.parse(comment.data);
          if (analysis.sentences_tone === undefined)
            comment.hasSentenceTones = false;
          comment.isLoading = false;
        })
    }
    else
      comment.showAnalysis = !comment.showAnalysis;
  }

  toggleComment(comment) {
    comment.isExpanded = !comment.isExpanded;
  }
  isLong(thread) {
    var lines = thread.snippet.topLevelComment.snippet.textDisplay.split("br");
    if (lines.length >= 5 || thread.snippet.topLevelComment.snippet.textDisplay.length > 600)
      return true;
    return false;
  }
  searchMore(): void {
    if (this.loadingInProgress || this.pageLoadingFinished || this.commentThreads.length < 1) {
      return;
    }
    this.loadingInProgress = true;
    this.youtubeService.getMoreComments()
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
          this.commentThreads.push(val);
        });
      }).catch(error => {
        this.loadingInProgress = false;
      })
  }
}
