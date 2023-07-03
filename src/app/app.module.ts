import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './Auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './Components/main/main.component';
import { NewsComponent } from './Components/news/news-component.component';
import { TextLongPipe } from './Pipes/text-long.pipe';
import { BoxNewsComponent } from './Components/news/box-news/box-news.component';
import { ShowNewsComponent } from './Components/news/show-news/show-news.component';
import { PostsComponent } from './Components/posts/posts.component';
import { PostBoxComponent } from './Components/posts/post-box/post-box.component';
import { ShowPostComponent } from './Components/posts/show-post/show-post.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NewsComponent,
    TextLongPipe,
    BoxNewsComponent,
    ShowNewsComponent,
    PostsComponent,
    PostBoxComponent,
    ShowPostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule.forRoot({
      loginPath: '/api/login_check',
      defaultRoute: [''],
    }),
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
