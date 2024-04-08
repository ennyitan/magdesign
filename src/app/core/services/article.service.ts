import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private apiKey = '58fd4b5b4a2f4fb8ad54ae9f47287316';
  private apiUrl = 'https://newsapi.org/v2/top-headlines';
  constructor(private http: HttpClient) {}
  getBuisnessArticle(): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}?country=us&category=business&apikey=${this.apiKey}`
    );
  }
  getTechArticle(): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}?sources=techcrunch&apikey=${this.apiKey}`
    );
  }
}
