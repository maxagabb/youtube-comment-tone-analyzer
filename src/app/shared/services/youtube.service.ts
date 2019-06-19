import { Injectable, NgModule } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import 'rxjs/add/operator/toPromise';

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
      })
      //.catch((error) => { return error });
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
      .catch((error) => { return error })
  }

  getVideos(ids): Promise<any> {
    const url = `${this.baseUrl}videos?id=${ids.join(',')}&maxResults=${this.maxResults}&type=video&part=snippet,contentDetails,statistics&key=${this.YOUTUBE_API_KEY}`; // tslint:disable-line
    return this.http.get(url)
      .toPromise()
      .then(results => {
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
        return videos;
      })
      .catch((error) => { return error })
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
      .catch((error) => { return error })
  }
}
