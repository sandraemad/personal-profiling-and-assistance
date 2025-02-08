import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AboutComponent } from './pages/main-layout/about/about.component';
import { AnixityComponent } from './pages/main-layout/anixity/anixity.component';
import { CommunicationSkillsComponent } from './pages/main-layout/communication-skills/communication-skills.component';
import { DepressionComponent } from './pages/main-layout/depression/depression.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { TestsComponent } from './pages/main-layout/tests/tests.component';
import { ContactUsComponent } from './pages/main-layout/contact-us/contact-us.component';
import { NotfoundComponent } from './pages/main-layout/notfound/notfound.component';
import { SignInComponent } from './auth/pages/sign-in/sign-in.component';
import { SignUpComponent } from './auth/pages/sign-up/sign-up.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    AboutComponent,
    AnixityComponent,
    CommunicationSkillsComponent,
    DepressionComponent,
    FooterComponent,
    TestsComponent,
    ContactUsComponent,
    NotfoundComponent,
    SignInComponent,
    SignUpComponent,
    GoogleMapsModule,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'personal-profiling-and-assistance';
  options: google.maps.MapOptions = {
    mapId: 'DEMO_MAP_ID',
    center: { lat: -31, lng: 147 },
    zoom: 4,
  };

  // constructor() {
  //   //
  //   // document.querySelector("html").classList.has("dark")
  // }
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
