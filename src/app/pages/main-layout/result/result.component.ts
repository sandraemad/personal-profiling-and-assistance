import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GoogleMapsModule } from '@angular/google-maps';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../../shared/components/icon/icon.component';
@Component({
  selector: 'app-result',
  imports: [RouterLink, GoogleMapsModule, CommonModule, IconComponent],
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
  mapUrl: SafeResourceUrl | null = null; // Store the map URL safely

  constructor(private sanitizer: DomSanitizer) {}

  findNearestClinic(event: Event) {
    event.preventDefault(); // Prevent default anchor behavior

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          // Google Maps URL without API key
          const googleMapsUrl = `https://www.google.com/maps?q=therapy+clinic&ll=${lat},${lng}&z=14&output=embed`;

          // Sanitize the URL for Angular security
          this.mapUrl =
            this.sanitizer.bypassSecurityTrustResourceUrl(googleMapsUrl);
        },
        (error) => {
          console.error('Geolocation error:', error);
          alert('Location access is required to find the nearest clinic.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }
}
