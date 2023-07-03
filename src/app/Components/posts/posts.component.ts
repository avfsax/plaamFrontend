import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/Interfaces/posts';
import { PostsService } from 'src/app/Services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.less'],
})
export class PostsComponent {
  isLoading: boolean = true;
  posts: Post[] = [];

  constructor(private postsService: PostsService, private router: Router) {}

  ngOnInit(): void {
    this.refreshPosts();
  }

  refreshPosts() {
    this.postsService
      .getAll()
      .then((response) => {
        this.posts = response.posts;
        if (typeof this.posts !== 'undefined' && this.posts.length > 0)
          this.isLoading = false;
      })
      .catch((err) => {});
  }
}
