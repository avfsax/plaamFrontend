import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/Interfaces/posts';

@Component({
  selector: 'app-post-box',
  templateUrl: './post-box.component.html',
  styleUrls: ['./post-box.component.less'],
})
export class PostBoxComponent {
  @Input() post: Post = {
    id: 0,
    title: '',
    text: '',
    createdDate: new Date(),
    publishedDate: new Date(),
  };

  constructor(private router: Router) {}

  goToPostShow(post: Post) {
    this.router.navigate(['posts/', post.id]);
  }
}
