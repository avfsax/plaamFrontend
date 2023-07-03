import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { News } from 'src/app/Interfaces/news';
import { NewsService } from 'src/app/Services/news.service';

@Component({
  selector: 'app-show-news',
  templateUrl: './show-news.component.html',
  styleUrls: ['./show-news.component.less'],
})
export class ShowNewsComponent implements OnInit {
  isLoading: boolean = true;
  news: News = {
    id: 0,
    title: '',
    text: '',
    imgUrl: '',
    createdDate: new Date(),
    publishedDate: new Date(),
  };

  id: number = 0;

  constructor(
    private newsService: NewsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params['id']; // (+) converts string 'id' to a number

      this.getNews(this.id);
    });
  }

  getNews(id: number) {
    this.newsService
      .getOne(id)
      .then((response) => {
        this.news = response.news;
        if (typeof this.news !== 'undefined' && this.news.id > 0)
          this.isLoading = false;
      })
      .catch((err) => {});
  }
}
