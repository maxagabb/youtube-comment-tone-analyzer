import { Injectable, NgModule } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

//import { Video } from './video';
//import { Promise } from 'q';
import 'rxjs/add/operator/toPromise';
//import { GoogleAuthService, GoogleApiService, NgGapiClientConfig, GoogleApiModule, NG_GAPI_CONFIG } from '../../node_modules/ng-gapi'
//import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})



export class YoutubeService {
  baseUrl = 'https://www.googleapis.com/youtube/v3/';
  YOUTUBE_API_KEY = 'AIzaSyDbgWKYI-jbvwtyfolPMMHicORbH9xUyCY';
  public nextToken: string;
  public lastQuery: string;
  public lastID: string;
  maxResults = 50;


  constructor(private http: HttpClient) { }

  getConfig(url) {
    return this.http.get(url);
  }


  getComments(id): Promise<any> {
    const url = `${this.baseUrl}commentThreads?part=snippet&order=relevance&videoId=${id}&key=${this.YOUTUBE_API_KEY}`; // tslint:disable-line
    return this.http.get(url)
      .toPromise()
      .then(results => {
        let jsonRes = results;
        this.lastID = id;
        this.nextToken = jsonRes['nextPageToken'] ? jsonRes['nextPageToken'] : undefined;
        return results['items'];
      });
  }
  getMoreComments(): Promise<any> {
    const url = `${this.baseUrl}commentThreads?part=snippet&order=relevance&pageToken=${this.nextToken}&videoId=${this.lastID}&key=${this.YOUTUBE_API_KEY}`; // tslint:disable-line
    return this.http.get(url)
      .toPromise()
      .then(response => {
        let jsonRes = response;
        let res = jsonRes['items'];
        this.nextToken = jsonRes['nextPageToken'] ? jsonRes['nextPageToken'] : undefined;
        return jsonRes['items'];
      })
    //.toPromise()
    //.catch(this.handleError)
  }

  getVideos(ids): Promise<any> {
    const url = `${this.baseUrl}videos?id=${ids.join(',')}&maxResults=${this.maxResults}&type=video&part=snippet,contentDetails,statistics&key=${this.YOUTUBE_API_KEY}`; // tslint:disable-line
    return this.http.get(url)
      .toPromise()
      //output: 'First Example'
      .then(results => {
        //console.log('From Promise:', results);
        return results['items'];
      });
  }
  
  searchVideos(query: string): Promise<any> {
    const url = `${this.baseUrl}search?q=${query}&maxResults=${this.maxResults}&type=video&part=snippet,id&key=${this.YOUTUBE_API_KEY}&videoEmbeddable=true`;
    var videos;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        let jsonRes = response;
        let res = jsonRes['items'];
        this.lastQuery = query;
        this.nextToken = jsonRes['nextPageToken'] ? jsonRes['nextPageToken'] : undefined;

        let ids = [];

        res.forEach((item) => {
          ids.push(item.id.videoId);
        });

        videos = this.getVideos(ids);
        //console.log('After object Conversion',videos);
        return videos;
      })
    
    //.toPromise()
    //.catch(this.handleError)
  }

  searchNext(): Promise<any> {
    const url = `${this.baseUrl}search?q=${this.lastQuery}&pageToken=${this.nextToken}&maxResults=${this.maxResults}&type=video&part=snippet,id&key=${this.YOUTUBE_API_KEY}&videoEmbeddable=true`; // tslint:disable-line

    return this.http.get(url)
      .toPromise()
      .then(response => {
        let jsonRes = response;
        let res = jsonRes['items'];
        this.nextToken = jsonRes['nextPageToken'] ? jsonRes['nextPageToken'] : undefined;
        let ids = [];

        res.forEach((item) => {
          ids.push(item.id.videoId);
        });

        return this.getVideos(ids);
      })
      //.toPromise()
      //.catch(this.handleError)
  }
}
