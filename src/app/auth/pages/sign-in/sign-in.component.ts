import { CommonModule, NgClass, NgIf } from '@angular/common';
import { Component, inject, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AthuService } from '../../services/athu.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-in',
  imports: [NgClass, NgIf,ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class SignInComponent {
  private readonly athuService=inject(AthuService);
  private readonly router=inject(Router);
  private readonly toastrService=inject(ToastrService);
  
  RegisterForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{6,}$/)
    ]),
    userName:new FormControl(null,[Validators.required,Validators.pattern(/^[a-zA-Z0-9_]{3,20}$/)]
    )
  });

  submitForm(): void {
   
    if (this.RegisterForm.valid) {
      console.log("hello");

      this.athuService.Register(this.RegisterForm.value).subscribe({
        next: (res) => {
          console.log("Registercomponent",res);
          if (res.success) {
            console.log(res.data.token);
            this.RegisterForm.reset();
            this.toastrService.success('تم تسجيل الدخول بنجاح!', 'نجاح!');
            setTimeout(() => {
              localStorage.setItem('token',res.data.token);
              localStorage.setItem('userId',res.data.userId);
              this.router.navigate(['/home']);
            }, 500);
          }

        },
      
      });
    }
    else{
      this.RegisterForm.markAllAsTouched();
    }
  }




  LoginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{6,}$/)
    ]),
    
  });


  submitLoginForm(): void {
    if (this.LoginForm.valid) {

      this.athuService.login(this.LoginForm.value).subscribe({
        next: (res) => {
          console.log("Logincomponent",res);
          if (res.success) {
            console.log(res.data.token);
            this.LoginForm.reset();
            this.toastrService.success('تم تسجيل الدخول بنجاح!', 'نجاح!');
            setTimeout(() => {
              localStorage.setItem('token',res.data.token);
              localStorage.setItem('userId',res.data.userId);
              this.router.navigate(['/home']);
            }, 500);
          }

        },
      
      });
    }
    else{
      this.LoginForm.markAllAsTouched();
    }
  }




  isSignUpMode = false;

  toggleSignUp() {
    this.isSignUpMode = true;
  }

  toggleSignIn() {
    this.isSignUpMode = false;
  }

}
