import { Component } from '@angular/core';
import { GeneralSectionComponent } from '../../../shared/components/general-section/general-section.component';
import { HeaderComponent } from '../../../core/components/header/header.component';
import { TestContentComponent } from '../test-content/test-content.component';
import { IconComponent } from '../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-tests',
  imports: [
    GeneralSectionComponent,
    HeaderComponent,
    TestContentComponent,
    IconComponent,
  ],
  templateUrl: './tests.component.html',
  styleUrl: './tests.component.css',
})
export class TestsComponent {}
