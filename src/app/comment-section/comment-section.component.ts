import { Component, OnInit, Input } from '@angular/core';
import { WatsonService } from '../shared/services/watson.service'
@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.css']
})
export class CommentSectionComponent implements OnInit {
  @Input() commentThreads;
  @Input() loadingInProgress;
  comments = [];
  data;
  constructor(private watson: WatsonService) { }
  ngOnInit() {this.comments = this.commentThreads;}

  analyzeComment(comment: any): void {
    if (!comment.isAnalyzed) {

      var text = comment.snippet.topLevelComment.snippet.textOriginal;
      comment.hasSentenceTones = true;  comment.isAnalyzed = true;
      comment.isLoading = true; comment.isLong = false;

      this.watson.analyzeCommentPromise(text)
        .then(function (data) {
          comment.data = data;
          var analysis = JSON.parse(comment.data);
          if (analysis.sentences_tone === undefined)
            comment.hasSentenceTones = false;
          comment.isLoading = false;
          comment.showAnalysis = true;
        })
    }
    else {
      comment.showAnalysis = !comment.showAnalysis;
    }
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
}
