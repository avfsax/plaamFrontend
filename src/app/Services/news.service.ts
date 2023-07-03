import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { News } from '../Interfaces/news';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private basePath = '/api/news';

  constructor(private http: HttpClient) {}

  private errorHandler(error: any): Promise<any> {
    console.log('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  getAll() {
    let url = this.basePath + '/list';
    return firstValueFrom(this.http.get(url))
      .then((response) => response)
      .catch((error) => this.errorHandler(error));
  }

  getOne(id: number) {
    let url = this.basePath + '/' + id;
    return firstValueFrom(this.http.get(url))
      .then((response) => response)
      .catch((error) => this.errorHandler(error));
  }
}
