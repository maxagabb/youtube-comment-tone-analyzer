import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { CommentSectionComponent } from './comment-section/comment-section.component';


const routes: Routes = [
  { path: 'videos', component: MainComponent },
  { path: 'comments', component: CommentSectionComponent },
  {
    path: '',
    redirectTo: '/videos',
    pathMatch: 'full'
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
