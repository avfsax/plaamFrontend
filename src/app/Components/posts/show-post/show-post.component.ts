import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/Interfaces/posts';
import { PostsService } from 'src/app/Services/posts.service';

@Component({
  selector: 'app-show-post',
  templateUrl: './show-post.component.html',
  styleUrls: ['./show-post.component.less'],
})
export class ShowPostComponent {
  isLoading: boolean = true;
  post: Post = {
    id: 0,
    title: '',
    text: '',
    createdDate: new Date(),
    publishedDate: new Date(),
  };

  id: number = 0;

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params['id'];

      this.getPosts(this.id);
    });
  }

  getPosts(id: number) {
    this.postsService
      .getOne(id)
      .then((response) => {
        this.post = response.post;
        if (typeof this.post !== 'undefined' && this.post.id > 0)
          this.isLoading = false;
      })
      .catch((err) => {});
  }
}
