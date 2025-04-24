import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IconComponent } from './shared/components/icon/icon.component';


import { GoogleMapsModule } from '@angular/google-maps';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, GoogleMapsModule,CommonModule,SweetAlert2Module  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'personal-profiling-and-assistance';

  mapUrl: SafeResourceUrl | null = null; // Store the map URL safely

  constructor(private sanitizer: DomSanitizer) {
  }

 
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
