import { Component } from '@angular/core';
import { HeaderComponent } from '../../../core/components/header/header.component';
import { IconComponent } from '../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-type-personal',
  imports: [HeaderComponent, IconComponent],
  templateUrl: './type-personal.component.html',
  styleUrl: './type-personal.component.css',
})
export class TypePersonalComponent {}
