import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-result',
  imports: [],
  templateUrl: './result.component.html',
  styleUrl: './result.component.css',
})
export class ResultComponent implements OnChanges {
  @Input() score: number = 0; // قيمة الدرجة الحالية
  @Input() maxScore: number = 0; // أقصى درجة افتراضية
  position: number = 0; // تحديد الموقع بالنسبة المئوية

  ngOnChanges(changes: SimpleChanges): void {
    if ('score' in changes || 'maxScore' in changes) {
      this.updatePosition();
    }
  }

  private updatePosition(): void {
    if (this.maxScore > 0) {
      this.position = (this.score / this.maxScore) * 100;
    } else {
      this.position = 0;
    }
  }
}
