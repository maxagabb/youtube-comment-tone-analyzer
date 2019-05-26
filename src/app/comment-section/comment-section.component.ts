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

  constructor(private watson : WatsonService) { }
  ngOnInit() {
    this.comments = this.commentThreads;
    console.log("comments in commentComponent", this.comments);
    
    //console.log("here are comments in the right place:");

  }

  analyzeComment(comment: any, index): void {
    console.log("analyzing comment...");
    var self = this;
    this.watson.analyzeCommentPromise(comment)
      .then(function (data) {
        self.comments[index].snippet.topLevelComment.snippet.textDisplay = data;
        console.log(data);
    })
  }

}
