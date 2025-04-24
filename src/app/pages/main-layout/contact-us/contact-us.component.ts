import { Component } from '@angular/core';
import { GeneralSectionComponent } from '../../../shared/components/general-section/general-section.component';
import { HeaderComponent } from '../../../core/components/header/header.component';
import { ContactContantComponent } from '../contact-contant/contact-contant.component';
import { IconComponent } from '../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-contact-us',
  imports: [
    GeneralSectionComponent,
    HeaderComponent,
    ContactContantComponent,
    IconComponent,
  ],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css',
})
export class ContactUsComponent {}
