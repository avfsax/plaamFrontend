import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './Auth/auth-guard.service';
import { MainComponent } from './Components/main/main.component';
import { NewsComponent } from './Components/news/news-component.component';
import { ShowNewsComponent } from './Components/news/show-news/show-news.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: '', component: NewsComponent, canActivate: [AuthGuardService] },
      {
        path: 'news',
        component: NewsComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'news/:id',
        component: ShowNewsComponent,
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
