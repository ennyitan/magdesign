import { Component, EventEmitter, Inject, Output } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { ArticleService } from 'src/app/core/services/article.service';

@Component({
  selector: 'app-bookmark-list',
  // standalone: true,
  // imports: [CommonModule],
  templateUrl: './bookmark-list.component.html',
  styleUrls: ['./bookmark-list.component.scss'],
})
export class BookmarkListComponent {
  bookmarkedList: any[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialogRef<BookmarkListComponent>,
  ) {}
  close() {
    this.dialog.close();
    window.location.reload();
  }
  deleteArticle(index: number) {
    this.data.bookmarkedList.splice(index, 1);
    localStorage.setItem(
      'bookmarkedArticle',
      JSON.stringify(this.data.bookmarkedList)
    );
  }
}
