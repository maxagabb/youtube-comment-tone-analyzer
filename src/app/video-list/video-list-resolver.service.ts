import { Injectable } from '@angular/core';
import {Router, Resolve,RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import { EMPTY } from 'rxjs';
import { YoutubeService } from '../shared/services/youtube.service';

@Injectable({
  providedIn: 'root'
})
export class VideoListResolverService implements Resolve<Object>{

  constructor(private youtube: YoutubeService, private router: Router) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Object> | Promise<never> {
    let query = decodeURIComponent(route.paramMap.get('query'));
    return this.youtube.searchVideos(query)
      .then(data => {
        if (data.length < 1) {
          this.router.navigate(['/']);
          return EMPTY;
        }
        return data;
      })
  }
}
