import { Component } from '@angular/core';
import { AboutComponent } from '../about/about.component';
import { TestsComponent } from '../tests/tests.component';
import { AboutContantComponent } from '../about-contant/about-contant.component';
import { ContactContantComponent } from '../contact-contant/contact-contant.component';
import { HeaderComponent } from '../../../core/components/header/header.component';
import { SliderComponent } from '../slider/slider.component';
import { TestContentComponent } from '../test-content/test-content.component';
import { GeneralSectionComponent } from '../../../shared/components/general-section/general-section.component';

import { GoogleMapsModule } from '@angular/google-maps';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-home',
  imports: [
    AboutComponent,
    TestsComponent,
    AboutContantComponent,
    ContactContantComponent,
    HeaderComponent,
    SliderComponent,
    TestContentComponent,
    GeneralSectionComponent,
    GoogleMapsModule,
    CommonModule,
    RouterLink,
    IconComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
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
