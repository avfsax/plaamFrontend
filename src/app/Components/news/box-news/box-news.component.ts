import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { News } from 'src/app/Interfaces/news';

@Component({
  selector: 'box-news',
  templateUrl: './box-news.component.html',
  styleUrls: ['./box-news.component.less'],
})
export class BoxNewsComponent {
  @Input() news: News = {
    id: 0,
    title: '',
    text: '',
    imgUrl: '',
    createdDate: new Date(),
    publishedDate: new Date(),
  };

  constructor(private router: Router) {}

  goToNewsShow(news: News) {
    this.router.navigate(['news/', news.id]);
  }
}
