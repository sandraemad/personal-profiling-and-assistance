import { Component } from '@angular/core';
import { GeneralSectionComponent } from '../../../shared/components/general-section/general-section.component';
import { HeaderComponent } from '../../../core/components/header/header.component';
import { TestContentComponent } from '../test-content/test-content.component';

@Component({
  selector: 'app-tests',
  imports: [GeneralSectionComponent, HeaderComponent, TestContentComponent],
  templateUrl: './tests.component.html',
  styleUrl: './tests.component.css',
})
export class TestsComponent {}
