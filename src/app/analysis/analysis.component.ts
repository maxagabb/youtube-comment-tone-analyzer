import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})
export class AnalysisComponent implements OnInit {
  @Input() analysisJSON;
  documentTones = [];
  sentenceTones = [];
  showSentence = [];
  tones = [];

  constructor() { }

  ngOnInit() {
    //console.log(this.analysisJSON);
    var analysis = JSON.parse(this.analysisJSON);
    console.log(analysis);
    this.documentTones = analysis.document_tone.tone_categories[0].tones;
    this.sentenceTones = analysis.sentences_tone;
    this.tones = analysis.sentences_tone[0].tone_categories[0].tones;
  }

}
