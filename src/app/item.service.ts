import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
   items: { text: string; color: string }[] = []; // List of items
   colors: string[] = ['red', 'green', 'blue', 'orange', 'purple']; // Color options
   currentIndex: number = 0; // Track sequential color index
   isRandom: boolean = false; // Track color mode

  constructor() {}

  // Get all items
  getItems(): { text: string; color: string }[] {
    return this.items;
  }

  // Add item with the appropriate color based on current color mode
  addItem(text: string): void {
    const color = this.isRandom ? this.getRandomColor() : this.getSequentialColor();
    this.items.push({ text, color });
  }

  // Delete the last item in the list
  deleteLastItem(): void {
    if (this.items.length > 0) {
      this.items.pop();
    }
  }

  // Toggle color mode and update colors accordingly
  toggleColorMode(): void {
    this.isRandom = !this.isRandom;
    if (this.isRandom) {
      this.applyRandomColors();
    } else {
      this.applySequentialColors();
    }
  }

  // Apply random colors to all items
   applyRandomColors(): void {
    this.items.forEach(item => {
      item.color = this.getRandomColor();
    });
  }

  // Apply sequential colors to all items
   applySequentialColors(): void {
    this.items.forEach((item, index) => {
      item.color = this.colors[index % this.colors.length];
    });
  }

  // Get random color
   getRandomColor(): string {
    return this.colors[Math.floor(Math.random() * this.colors.length)];
  }

  // Get next sequential color
   getSequentialColor(): string {
    const color = this.colors[this.currentIndex];
    this.currentIndex = (this.currentIndex + 1) % this.colors.length;
    return color;
  }

  // Sort list in ascending order
  sortAscending(): void {
    this.items.sort((a, b) => a.text.localeCompare(b.text));
  }

  // Sort list in descending order
  sortDescending(): void {
    this.items.sort((a, b) => b.text.localeCompare(a.text));
  }

  // Shuffle items randomly
  shuffleItems(): void {
    for (let i = this.items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.items[i], this.items[j]] = [this.items[j], this.items[i]];
    }
  }

  // Cycle through sort modes
  cycleSortMode(currentSortModeIndex: number): void {
    switch (currentSortModeIndex) {
      case 0: // Ascending
        this.sortAscending();
        break;
      case 1: // Descending
        this.sortDescending();
        break;
      case 2: // Shuffle
        this.shuffleItems();
        break;
    }
  }
}
