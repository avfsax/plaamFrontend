import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private basePath = '/api/comments';

  constructor(private http: HttpClient) {}

  private errorHandler(error: any): Promise<any> {
    console.log('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  save(id: number, msg: string) {
    let url = this.basePath + '/' + id;
    return firstValueFrom(this.http.post(url, { msg: msg }))
      .then((response) => response)
      .catch((error) => this.errorHandler(error));
  }
}
