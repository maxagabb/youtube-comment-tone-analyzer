import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WatsonService {

  constructor(private http: HttpClient) { }

  analyzeComment(comment) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'wss://youtube-tone-analyzer.herokuapp.com/', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function (e) {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          //console.log(xhr.responseText);
          return xhr.responseText;
        } else {
          //console.log(xhr.statusText);
          return xhr.statusText;
        }
      }
    };
    xhr.onerror = function (e) {
      console.error(xhr.statusText);
    };
    xhr.send(JSON.stringify({ "text": comment }));
  }

  analyzeCommentPromise(comment) {
    var xhr = new XMLHttpRequest();

    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open("POST", 'wss://youtube-tone-analyzer.herokuapp.com/', true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload = function () {
        if (this.status >= 200 && this.status < 300) {
          resolve(xhr.response);
        } else {
          reject({
            status: this.status,
            statusText: xhr.statusText
          });
        }
      };
      xhr.onerror = function () {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      };
      xhr.send(JSON.stringify({ "text": comment }));
    });
  };
}

