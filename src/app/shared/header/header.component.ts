import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { BookmarkListComponent } from '../bookmark-list/bookmark-list.component';
import { INewsMenu, NewsMenu } from 'src/app/core/constant/menu.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  topNav: INewsMenu[] = NewsMenu;
  isDropdownOpen: boolean = false;
  constructor(
    private dialog: MatDialog,
  ) {}
  ngOnInit(): void {}
  openNavBar() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  openBookmarkList() {
    const bookmarkedList = JSON.parse(localStorage.getItem('bookmarkedArticle')!)
    this.dialog.open(BookmarkListComponent, {
      width: '350px',
      height: '100vh',
      position: { right: '0' },
      data: {
        bookmarkedList: bookmarkedList
      },
    });
  }
  close(){}
}
