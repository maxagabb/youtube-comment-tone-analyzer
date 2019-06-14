import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { VideoListComponent } from './video-list/video-list.component';
import { CommentSectionComponent } from './comment-section/comment-section.component';
import { VideoListResolverService } from './video-list/video-list-resolver.service';
import { CommentSectionResolverService } from './comment-section/comment-section-resolver.service';

const routes: Routes = [
  {
    path: 'videos/:query', runGuardsAndResolvers: "always", component: VideoListComponent, resolve: {
      videos: VideoListResolverService
    }
  },
  {
    path: 'comments/:videoID', runGuardsAndResolvers: "always", component: CommentSectionComponent, resolve: {
      comments: CommentSectionResolverService
    }
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
