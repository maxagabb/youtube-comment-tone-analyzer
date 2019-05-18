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
  maxResults = 50;


  constructor(
    private http: HttpClient) { }

  getConfig(url) {
    return this.http.get(url);
  }

 /* searchVideos(query: string): Promise<any> {
    query = "akira";
    const url = `${this.baseUrl}search?q=${query}&maxResults=${this.maxResults}&type=video&part=snippet,id&key=${this.YOUTUBE_API_KEY}&videoEmbeddable=true`;
    var videos;
    this.http.get(url)
      .subscribe(response => {
        let jsonRes = response;
        let res = jsonRes['items'];
        this.lastQuery = query;
        this.nextToken = jsonRes['nextPageToken'] ? jsonRes['nextPageToken'] : undefined;

        let ids = [];

        res.forEach((item) => {
          ids.push(item.id.videoId);
        });

        videos = this.getVideos(ids);
        console.log(videos);
      })

    return videos;
    //.toPromise()
    //.catch(this.handleError)
  }*/



  /*getVideos(ids){
    const url = `${this.baseUrl}videos?id=${ids.join(',')}&maxResults=${this.maxResults}&type=video&part=snippet,contentDetails,statistics&key=${this.YOUTUBE_API_KEY}`; // tslint:disable-line
    return this.http.get(url)
      .toPromise(map(results => {
        return results['items'];
      }))
      //.subscribe()
      //.catch(this.handleError)
  }*/

  getVideos(ids): Promise<any> {
    const url = `${this.baseUrl}videos?id=${ids.join(',')}&maxResults=${this.maxResults}&type=video&part=snippet,contentDetails,statistics&key=${this.YOUTUBE_API_KEY}`; // tslint:disable-line
    return this.http.get(url)
      .toPromise()
      //output: 'First Example'
      .then(results => {
        console.log('From Promise:', results);
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
        console.log('After object Conversion',videos);
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





  /*gapiClientConfig: NgGapiClientConfig = {
    client_id: "460298885215-rlitofilod32q6sfcl5ln21p3pqcg93p.apps.googleusercontent.com",
    discoveryDocs: ["https://analyticsreporting.googleapis.com/$discovery/rest?version=v4"],
    scope: [
      "https://www.googleapis.com/auth/analytics.readonly",
      "https://www.googleapis.com/auth/analytics"
    ].join(" ")
  };*/


}

/*
export class RetrieverService {

  constructor(gapiService: GoogleApiService) {
    gapiService.onLoad().subscribe(() => {
      // Here we can use gapi

    });
  }
}*/






/*
export class Retriever {
  //https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=projared&type=video
  private videosURL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10';
  //Authorization: Bearer [YOUR_ACCESS_TOKEN]
  //Accept: application/json

  constructor(private http: HttpClient) { }

  getVideoBySearch<Data>(term: string): Observable<Video> {
    const url = `${this.videosURL}&q=${term}&type=video`;
    return this.http.get<Video[]>(url)
      .pipe(
        map(videos => videos[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          //this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<Video>(`getVideo term=${term}`))
      );
  }



  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
/*
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      //this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}*/

