import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignInComponent } from '../../../auth/pages/sign-in/sign-in.component';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet, SignInComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css',
})
export class AuthLayoutComponent {}
