import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      let id: number = +params['id'];

      this.getPost(id);
    });
  }

  getPost(id: number) {
    this.postsService
      .getOne(id)
      .then((response) => {
        this.post = response.post;
        if (typeof this.post !== 'undefined' && this.post.id > 0)
          this.isLoading = false;
      })
      .catch((err) => {});
  }

  createComment(post: Post) {
    this.router.navigate(['posts', post.id, 'comments']);
  }
}
