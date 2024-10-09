import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  inputValue: string = '';  // Holds the value of the input field
  items: { text: string, color: string }[] = [];  // Holds the list of items with associated colors
  colors: string[] = ['red', 'green', 'blue', 'orange', 'purple']; // Array of colors
  currentIndex: number = 0;  // Keeps track of the current color for sequential mode
  isRandom: boolean = false; // Tracks whether to show random colors or sequential
  buttonLabel: string = 'Show Random Colors';  // Initial button text

  // For sorting modes
  sortModes: string[] = ['Sort Ascending', 'Sort Descending', 'Shuffle List']; // Modes
  currentSortModeIndex: number = 0;  // Tracks the current sort mode
  sortButtonLabel: string = this.sortModes[this.currentSortModeIndex]; // Initial button text

  // New properties for toggling list visibility
  isListVisible: boolean = true;  // Track visibility of the list
  listVisibilityLabel: string = 'Hide List';  // Button label to hide/show list

  addToList() {
    if (this.inputValue.trim() !== '') {
      // Add the input value to the list with the current color
      this.items.push({ text: this.inputValue, color: this.colors[this.currentIndex] });
      
      // Update the index to cycle through colors
      this.currentIndex = (this.currentIndex + 1) % this.colors.length;
    }
  }

  DeleteList() {
    if (this.inputValue.trim() !== '') {
      this.items.pop();
    }
  }

  toggleColorMode() {
    this.isRandom = !this.isRandom;  // Toggle the boolean flag
    this.buttonLabel = this.isRandom ? 'Show Sequential Colors' : 'Show Random Colors';  // Change button text

    if (this.isRandom) {
      // Randomize colors for each item
      this.items.forEach(item => {
        item.color = this.getRandomColor();
      });
    } else {
      // Revert back to sequential colors
      this.applySequentialColors();
    }
  }

  getRandomColor(): string {
    return this.colors[Math.floor(Math.random() * this.colors.length)];
  }

  applySequentialColors() {
    this.items.forEach((item, index) => {
      item.color = this.colors[index % this.colors.length];
    });
  }

  logMessage(): void {
    console.log('Button was clicked!');
  }

  // Sort list alphabetically in ascending order
  sortListAscending() {
    this.items.sort((a, b) => a.text.localeCompare(b.text));
  }

  // Sort list alphabetically in descending order
  sortListDescending() {
    this.items.sort((a, b) => b.text.localeCompare(a.text));
  }

  // Shuffle the list items randomly
  shuffleList() {
    for (let i = this.items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.items[i], this.items[j]] = [this.items[j], this.items[i]];
    }
  }

  // Cycle between the three sorting modes
  cycleSortMode() {
    switch (this.currentSortModeIndex) {
      case 0:  // Ascending
        this.sortListAscending();
        break;
      case 1:  // Descending
        this.sortListDescending();
        break;
      case 2:  // Shuffle
        this.shuffleList();
        break;
    }

    // Move to the next mode
    this.currentSortModeIndex = (this.currentSortModeIndex + 1) % this.sortModes.length;

    // Update the button label to the next mode
    this.sortButtonLabel = this.sortModes[this.currentSortModeIndex];
  }

  // Method to toggle list visibility
  toggleListVisibility() {
    this.isListVisible = !this.isListVisible;  // Toggle the list visibility flag
    this.listVisibilityLabel = this.isListVisible ? 'Hide List' : 'Show List';  // Update the button label
  }
}
