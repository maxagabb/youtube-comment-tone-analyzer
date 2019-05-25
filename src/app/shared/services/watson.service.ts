import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WatsonService {

  constructor(private http: HttpClient) { }

  analyzeComment(comment) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'http://localhost:3000/analyze', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function (e) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          return xhr.responseText;
        } else {
          return xhr.statusText;
        }
      }
    };
    xhr.onerror = function (e) {
      console.error(xhr.statusText);
    };
    xhr.send(JSON.stringify({ "text": comment}));
  }
}
