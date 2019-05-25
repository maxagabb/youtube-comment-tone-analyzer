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
          console.log(xhr.responseText);
          return xhr.responseText;
        } else {
          console.log(xhr.statusText);
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
    var request = new XMLHttpRequest();
    return new Promise(function (resolve, reject) {
      // Setup our listener to process compeleted requests
      request.onreadystatechange = function () {

        // Only run if the request is complete
        if (request.readyState !== 4) return;

        // Process the response
        if (request.status >= 200 && request.status < 300) {
          // If successful
          resolve(request);
        } else {
          // If failed
          reject({
            status: request.status,
            statusText: request.statusText
          });
        }

      };
      request.open("POST", 'http://localhost:3000/analyze', true);
      request.send(JSON.stringify({ "text": comment }));
    });
  };
}

