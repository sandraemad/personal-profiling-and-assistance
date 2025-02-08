import { Component, ElementRef, ViewChild } from '@angular/core';
import { ResultComponent } from '../result/result.component';
import { HeaderComponent } from '../../../core/components/header/header.component';

@Component({
  selector: 'app-depression',
  imports: [ResultComponent,HeaderComponent],
  templateUrl: './depression.component.html',
  styleUrl: './depression.component.css',
})
export class DepressionComponent {
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
