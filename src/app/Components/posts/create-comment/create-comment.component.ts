import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/Interfaces/posts';
import { CommentsService } from 'src/app/Services/comments.service';
import { PostsService } from 'src/app/Services/posts.service';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.less'],
})
export class CreateCommentComponent {
  isLoading: boolean = true;
  post: Post = {
    id: 0,
    title: '',
    text: '',
    createdDate: new Date(),
    publishedDate: new Date(),
  };

  id: number = 0;
  msg = new FormControl('', [Validators.required, Validators.minLength(5)]);

  constructor(
    private postsService: PostsService,
    private commentsService: CommentsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params['id'];

      this.getPost(this.id);
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

  createComment() {
    console.log(this.msg);
    if (this.post.id > 0) {
      this.commentsService
        .save(this.post.id, this.msg.value ? this.msg.value : '')
        .then((response) => {
          if (response.result == 'OK')
            this.router.navigate(['posts/', this.post.id]);
        })
        .catch((err) => {});
    }
  }
}
