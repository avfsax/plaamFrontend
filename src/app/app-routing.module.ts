import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './Auth/auth-guard.service';
import { MainComponent } from './Components/main/main.component';
import { NewsComponent } from './Components/news/news-component.component';
import { ShowNewsComponent } from './Components/news/show-news/show-news.component';
import { PostsComponent } from './Components/posts/posts.component';
import { ShowPostComponent } from './Components/posts/show-post/show-post.component';
import { CreateCommentComponent } from './Components/posts/create-comment/create-comment.component';
import { FormFamilyComponent } from './Components/form-family/form-family.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', component: NewsComponent },
      {
        path: 'news',
        component: NewsComponent,
      },
      {
        path: 'news/:id',
        component: ShowNewsComponent,
      },
      {
        path: 'posts',
        component: PostsComponent,
      },
      {
        path: 'posts/:id',
        component: ShowPostComponent,
      },
      {
        path: 'posts/:id/comments',
        component: CreateCommentComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'form/family',
        component: FormFamilyComponent,
        canActivate: [AuthGuardService],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
