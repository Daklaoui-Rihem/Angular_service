import { Component } from '@angular/core';
import { ItemService } from './item.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  inputValue: string = '';  // Input field value
  buttonLabel: string = 'Show Random Colors';  // Initial color mode button text

  // Sort mode toggling properties
  sortModes: string[] = ['Sort Ascending', 'Sort Descending', 'Shuffle List'];
  currentSortModeIndex: number = 0;
  sortButtonLabel: string = this.sortModes[this.currentSortModeIndex];

  // For list visibility toggling
  isListVisible: boolean = true;
  listVisibilityLabel: string = 'Hide List';

  constructor(private itemService: ItemService) {}

  get items() {
    return this.itemService.getItems();  // Access items directly from the service
  }

  addToList() {
    if (this.inputValue.trim() !== '') {
      this.itemService.addItem(this.inputValue);  // Add item via service
    }
  }

  deleteLastItem() {
    this.itemService.deleteLastItem();  // Delete item via service
  }

  toggleColorMode() {
    this.itemService.toggleColorMode();  // Toggle color mode via service
    this.buttonLabel = this.itemService.isRandom ? 'Show Sequential Colors' : 'Show Random Colors';
  }

  logMessage(): void {
    console.log('Button was clicked!');
  }

  cycleSortMode() {
    this.itemService.cycleSortMode(this.currentSortModeIndex);  // Sort mode via service
    this.currentSortModeIndex = (this.currentSortModeIndex + 1) % this.sortModes.length;
    this.sortButtonLabel = this.sortModes[this.currentSortModeIndex];
  }

  toggleListVisibility() {
    this.isListVisible = !this.isListVisible;
    this.listVisibilityLabel = this.isListVisible ? 'Hide List' : 'Show List';
  }
}
