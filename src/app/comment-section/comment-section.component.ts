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
  isAnalyzed = [];
  isLoading = [];
  isExpanded = [];
  data;
  constructor(private watson : WatsonService) { }
  ngOnInit() {
    this.comments = this.commentThreads;
    //console.log("comments in commentComponent", this.comments);
  }

  analyzeComment(comment: any, index): void {
    this.isAnalyzed[index] = true;
    this.isLoading[index] = true;
    this.isLong[index] = false;
    console.log("analyzing comment...");
    var self = this;
    this.watson.analyzeCommentPromise(comment)
      .then(function (data) {
        //self.comments[index].snippet.topLevelComment.snippet.textDisplay = data;
        self.isLoading[index] = false;
        self.data = data;
        //console.log(data);
    })
  }


  changeComment(index) {
    if (this.isExpanded[index] === true) {
      this.isExpanded[index] = false;
    }
    else {
      this.isExpanded[index] = true;
    }
  }
  isLong(thread) {
    var lines = thread.snippet.topLevelComment.snippet.textDisplay.split("br");
    if (lines.length >= 5 || thread.snippet.topLevelComment.snippet.textDisplay.length > 600)
      return true;
    return false;
  }
}
