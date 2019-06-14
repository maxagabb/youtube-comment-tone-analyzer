import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { YoutubeService } from '../shared/services/youtube.service';

@Injectable({
  providedIn: 'root'
})
export class CommentSectionResolverService implements Resolve<Object>{

  constructor(private youtube: YoutubeService, private router: Router) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Object> | Promise<never> {
    let videoID = route.paramMap.get('videoID');
    return this.youtube.getComments(videoID)
      .then(data => {
        if (data.length < 1) {
          this.router.navigate(['/']);
          return EMPTY;
        }
        return data;
      });
  }
}
