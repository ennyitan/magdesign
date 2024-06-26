import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Article } from 'src/app/core/constant/article.model';
import { ArticleService } from 'src/app/core/services/article.service';

@Component({
  selector: 'app-all-articles',
  templateUrl: './all-articles.component.html',
  styleUrls: ['./all-articles.component.scss'],
})
export class AllArticlesComponent {
  articles: Article[] = [];
  formData: any = {};
  isBookmarkClicked = false as boolean
  bookmarkedArray: any[] = [];
  combinedArticles: Article[] = [];
  businessArticles: Article[] = [];
  techArticles: Article[] = [];
  constructor(private articleService: ArticleService, private snackBar: MatSnackBar) {}
  ngOnInit(): void {
    this.fetchArticles();
  }

  fetchArticles() {
    // combining both types of article so there can be a shuffle of different articles on the page
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
    article.isBookmarkClicked = !article.isBookmarkClicked;
    if (
      article &&
      !this.bookmarkedArray.includes(article) &&
      article.isBookmarkClicked
    ) {
      this.bookmarkedArray.push(article);
      this.snackBar.open('Bookmark added!', 'Close', { duration: 2000 }); 
    } else {
      this.bookmarkedArray = this.bookmarkedArray.filter(
        (item) => item !== article
      );
      this.snackBar.open('Bookmark removed!', 'Close', { duration: 2000, panelClass: ['custom-snackbar-removed'] });
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
}
