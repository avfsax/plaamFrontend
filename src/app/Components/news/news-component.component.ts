import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { News } from 'src/app/Interfaces/news';
import { NewsService } from 'src/app/Services/news.service';

@Component({
  selector: 'app-news-component',
  templateUrl: './news-component.component.html',
  styleUrls: ['./news-component.component.less'],
})
export class NewsComponent implements OnInit {
  isLoading: boolean = true;
  news: News[] = [];

  constructor(private newsService: NewsService, private router: Router) {}

  ngOnInit(): void {
    this.refreshNews();
  }

  refreshNews() {
    this.newsService
      .getAll()
      .then((response) => {
        this.news = response.news;
        if (typeof this.news !== 'undefined' && this.news.length > 0)
          this.isLoading = false;
      })
      .catch((err) => {});
  }
}
