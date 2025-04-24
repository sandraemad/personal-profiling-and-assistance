import { Component, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-icon',
  standalone: true, 
  imports: [RouterLink],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.css',
 
})
export class IconComponent {
  darkMode: boolean = false;
  changMode(): void {
    this.darkMode = !this.darkMode;
    
    if (this.darkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  }
}
