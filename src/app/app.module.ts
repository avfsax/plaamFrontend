import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';

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
import { CreateCommentComponent } from './Components/posts/create-comment/create-comment.component';

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
    CreateCommentComponent,
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
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatIconModule,
    MatBadgeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
