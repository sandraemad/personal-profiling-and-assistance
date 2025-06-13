import { Component, inject, PLATFORM_ID } from '@angular/core';
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
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  imports: [

    AboutContantComponent,
    ContactContantComponent,
    HeaderComponent,
    TestContentComponent,
    GeneralSectionComponent,
    GoogleMapsModule,
    CommonModule,
    SliderComponent
 
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  mapUrl: SafeResourceUrl | null = null; // Store the map URL safely
  private readonly toastrService=inject(ToastrService);
  private readonly platformId=inject(PLATFORM_ID);
  

  constructor(private sanitizer: DomSanitizer) {}





  isLoggedIn(): void {   
      if (isPlatformBrowser(this.platformId)) {
        if (localStorage.getItem('token') !== null) {
          this.findNearestClinic();
          
        } else {
          this.toastrService.error('يجب تسجيل الدخول للوصول لاقرب عياده', 'خطأ!');
         
          
        }
      } 
  }

  findNearestClinic() {
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
