import { Component, ElementRef, ViewChild } from '@angular/core';
import { ResultComponent } from '../result/result.component';
import { HeaderComponent } from '../../../core/components/header/header.component';
import { IconComponent } from '../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-communication-skills',
  imports: [ResultComponent, HeaderComponent, IconComponent],
  templateUrl: './communication-skills.component.html',
  styleUrl: './communication-skills.component.css',
})
export class CommunicationSkillsComponent {
  @ViewChild('header', { static: false }) myheader!: ElementRef; // Reference to header element

  cnt: number = 0; // السكور الحالي
  showResultComponent: boolean = false; // التحكم في ظهور الـ ResultComponent

  showResult(num: number): void {
    this.cnt += num; // تحديث السكور
  }

  toggleResult(): void {
    this.showResultComponent = true; // إظهار الـ component
  }
}
