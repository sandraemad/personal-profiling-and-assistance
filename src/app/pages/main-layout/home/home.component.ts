import { Component } from '@angular/core';
import { AboutComponent } from '../about/about.component';
import { TestsComponent } from '../tests/tests.component';
import { AboutContantComponent } from '../about-contant/about-contant.component';
import { ContactContantComponent } from '../contact-contant/contact-contant.component';
import { HeaderComponent } from '../../../core/components/header/header.component';
import { SliderComponent } from '../slider/slider.component';
import { TestContentComponent } from '../test-content/test-content.component';

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
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
