import { Component, Inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-bookmark-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bookmark-list.component.html',
  styleUrls: ['./bookmark-list.component.scss'],
})
export class BookmarkListComponent {
  bookmarkedList: any[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialogRef<BookmarkListComponent>
  ) {}
  close() {
    this.dialog.close();
  }
  deleteArticle(index: number) {
    this.data.bookmarkedList.splice(index, 1);
    localStorage.setItem(
      'bookmarkedArticle',
      JSON.stringify(this.data.bookmarkedList)
    );
  }
}
