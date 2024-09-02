import { Injectable } from '@angular/core';
export interface Bookmark {
  id: number;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {
  private bookmarks: Bookmark[] = [];

  getBookmarks(): Bookmark[] {
    return this.bookmarks;
  }

  addBookmark(bookmark: Bookmark): void {
    this.bookmarks.push(bookmark);
    this.saveBookmarks();
  }

  deleteBookmark(id: number): void {
    this.bookmarks = this.bookmarks.filter(b => b.id !== id);
    this.saveBookmarks();
  }

  updateBookmark(id: number, url: string): void {
    const index = this.bookmarks.findIndex(b => b.id === id);
    if (index !== -1) {
      this.bookmarks[index].url = url;
      this.saveBookmarks();
    }
  }

  private saveBookmarks(): void {
    localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks));
  }
}
