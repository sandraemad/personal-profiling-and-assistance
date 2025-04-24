import { Component } from '@angular/core';
import { GeneralSectionComponent } from '../../../shared/components/general-section/general-section.component';
import { HeaderComponent } from '../../../core/components/header/header.component';
import { AboutContantComponent } from '../about-contant/about-contant.component';
import { IconComponent } from '../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-about',
  imports: [
    GeneralSectionComponent,
    HeaderComponent,
    AboutContantComponent,
    IconComponent,
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {}
