import { NgClass, NgIf } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  imports: [NgClass, NgIf],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class SignInComponent {
  isSignUpMode = false;

  toggleSignUp() {
    this.isSignUpMode = true;
  }

  toggleSignIn() {
    this.isSignUpMode = false;
  }
}
