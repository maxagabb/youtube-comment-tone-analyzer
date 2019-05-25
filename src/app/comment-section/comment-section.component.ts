import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.css']
})
export class CommentSectionComponent implements OnInit {
  @Input() commentThreads;
  comments = [];

  constructor() { }
  ngOnInit() {
    this.comments = this.commentThreads;
    console.log("comments in commentComponent", this.comments);
    
    //console.log("here are comments in the right place:");

  }

}
