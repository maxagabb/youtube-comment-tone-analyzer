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

  getClass(tone) {
    let classes = {
      'joy': tone.tone_name === 'Joy' && tone.score >= .5 && tone.score < .75,
      'joyStrong': tone.tone_name === 'Joy' && tone.score >= .75,
      'fear': tone.tone_name === 'Fear' && tone.score >= .5,
      'sadness': tone.tone_name === 'Sadness' && tone.score >= .5,
      'anger': tone.tone_name === 'Anger' && tone.score >= .5 && tone.score < .75,
      'angerStrong': tone.tone_name === 'Anger' && tone.score >= .75
    }
    return classes;
  }

}
