import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Article } from 'src/app/core/constant/article.model';
import { ArticleService } from 'src/app/core/services/article.service';

@Component({
  selector: 'app-all-articles',
  templateUrl: './all-articles.component.html',
  styleUrls: ['./all-articles.component.scss'],
})
export class AllArticlesComponent {
  formData: any = {};
  @Output() isBookmarkClicked = new EventEmitter<boolean>()
  bookmarkedArray: any[] = [];
  combinedArticles: Article[] = [];
  businessArticles: Article[] = [];
  techArticles: Article[] = [];
  constructor(private articleService: ArticleService) {}
  ngOnInit(): void {
    this.fetchArticles();
  }

  fetchArticles() {
    this.articleService.getBuisnessArticle().subscribe((res) => {
      const validateResponse = res.articles.filter(
        (article: any) => article.urlToImage !== null
      );
      this.businessArticles = validateResponse.slice(0, 3);
      this.combinedArticles.push(...this.businessArticles);
      this.checkCombinedArticleLength();
    });
    this.articleService.getTechArticle().subscribe((res) => {
      const validateResponse = res.articles.filter(
        (article: any) => article.urlToImage !== null
      );
      this.techArticles = validateResponse.slice(0, 3);
      this.combinedArticles.push(...this.techArticles);
      this.checkCombinedArticleLength();
      this.shuffleArticles();
    });
  }
  checkCombinedArticleLength() {
    if (this.combinedArticles.length > 8) {
      this.combinedArticles = this.combinedArticles.slice(0, 8);
    }
  }
  shuffleArticles() {
    // Shuffle the combined articles
    this.combinedArticles.sort(() => Math.random() - 0.5);
  }
  addBookmark(index: number, article: any) {
    this.isBookmarkClicked.emit(true)
    article.isBookmarkClicked = !article.isBookmarkClicked;
    if (
      article &&
      !this.bookmarkedArray.includes(article) &&
      article.isBookmarkClicked
    ) {
      this.bookmarkedArray.push(article);
    } else {
      this.bookmarkedArray = this.bookmarkedArray.filter(
        (item) => item !== article
      );
    }
    localStorage.setItem(
      'bookmarkedArticle',
      JSON.stringify(this.bookmarkedArray)
    );
  }

  submitForm() {
    console.log('Form submitted:', this.formData);
  }
  customOptions: OwlOptions = {
    items: 1,
    loop: true,
    margin: 10,
    nav: false,
    dots: true,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    autoWidth: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
  };
  postOptions: OwlOptions = {
    items: 3,
    loop: true,
    margin: 10,
    nav: false,
    dots: true,
    // autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 3,
        center: true,
        autoWidth: true,
      },
      600: {
        items: 3,
        center: false,
        autoWidth: false,
      },
      1000: {
        items: 3,
      },
    },
  };
}
