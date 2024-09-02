import { Component, OnInit } from '@angular/core';
import { Bookmark, BookmarkService } from '../bookmark.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  url: string = '';
  bookmarks: Bookmark[] = [];
  currentPage: number = 1;
  pageSize: number = 5;
  editingBookmarkId: number | null = null;
  editingUrl: string = '';

  constructor(private bookmarkService: BookmarkService, private router: Router) { }

  ngOnInit(): void {
    this.bookmarks = this.bookmarkService.getBookmarks();
  }

  addBookmark(): void {
    if (this.url && this.isValidUrl(this.url)) {
      const newBookmark: Bookmark = { id: Date.now(), url: this.url };
      this.bookmarkService.addBookmark(newBookmark);
      this.router.navigate(['/results'], { queryParams: { url: this.url } });
      this.url = '';
    } else {
      alert('Please enter a valid URL.');
    }
  }

  editBookmark(id: number): void {
    const bookmark = this.bookmarks.find(b => b.id === id);
    if (bookmark) {
      this.editingBookmarkId = id;
      this.editingUrl = bookmark.url;
    }
  }

  saveBookmark(): void {
    if (this.editingBookmarkId && this.isValidUrl(this.editingUrl)) {
      this.bookmarkService.updateBookmark(this.editingBookmarkId, this.editingUrl);
      this.editingBookmarkId = null;
      this.editingUrl = '';
    } else {
      alert('Please enter a valid URL.');
    }
  }

  deleteBookmark(id: number): void {
    this.bookmarkService.deleteBookmark(id);
    this.bookmarks = this.bookmarkService.getBookmarks();
  }

  isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  totalPages(): number {
    return Math.ceil(this.bookmarks.length / this.pageSize);
  }

  changePage(newPage: number): void {
    this.currentPage = newPage;
  }

  get paginatedBookmarks(): Bookmark[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.bookmarks.slice(startIndex, startIndex + this.pageSize);
  }
}
