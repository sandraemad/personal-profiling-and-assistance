import { AthuService } from './../../services/athu.service';
import { NgClass, NgIf } from '@angular/common';
import { Component, inject, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  imports: [NgClass, NgIf,ReactiveFormsModule,CommonModule,FormsModule],
  providers: [AthuService, ToastrService],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
})

export class SignInComponent {
  private readonly athuService=inject(AthuService);
  private readonly router=inject(Router);
  private readonly toastrService=inject(ToastrService);
  emailModel: string = '';
  mgError: string = '';
  isSuccess: string = '';
  emailNotFoundError: string = '';
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

  sendOtp() {
    if (!this.validateEmail(this.emailModel)) {
      this.emailNotFoundError = 'الرجاء إدخال بريد إلكتروني صحيح';
      return;
    }
  
    this.athuService.sendOtp(this.emailModel).subscribe({
      next: (res:any) => {
        if (res.success) {
          this.emailNotFoundError = ''; // إخفاء أي أخطاء سابقة
          this.toastrService.success('تم إرسال الرمز بنجاح');
          setTimeout(() => {
            this.router.navigate(['/rest-password'], {
              queryParams: { email: this.emailModel }
            });
          }, 3000); 
        } else {
          this.emailNotFoundError = 'البريد الإلكتروني غير موجود';
        }
      },
      error: (err) => {
        console.error('OTP Error:', err);
  
        if (err.error?.message === 'Invalid code.') {
          this.emailNotFoundError = 'الكود غير صحيح';
        } else {
          this.emailNotFoundError = 'حدث خطأ أثناء الإرسال';
        }
      }
    });
  }
  

  private validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  darkMode: boolean = false;
  changMode(): void {
    this.darkMode = !this.darkMode;
    
    if (this.darkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  }
}
