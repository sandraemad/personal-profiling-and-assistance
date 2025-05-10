import { Component } from '@angular/core';
import { AthuService, ResetPasswordRequest } from './../../services/athu.service';
import { FormsModule } from '@angular/forms';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  providers: [AthuService, ToastrService],
  standalone: true,
})
export class ResetPasswordComponent {

  email: string = '';
  otpCode: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  responseMessage: string = '';

  constructor(
    private AthuService: AthuService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || '';
      if (!this.email) {
        this.responseMessage = 'لا يمكنك الدخول على هذه الصفحة مباشرة.';
        this.toastr.error(this.responseMessage);
        this.router.navigate(['/login']);
      }
    });
  }

  resetPassword() {
    if (!this.email || !this.otpCode || !this.newPassword || !this.confirmPassword) {
      this.responseMessage = 'جميع الحقول مطلوبة.';
      this.toastr.warning(this.responseMessage);
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.responseMessage = 'كلمتا المرور غير متطابقتين.';
      this.toastr.warning(this.responseMessage);
      return;
    }

    const requestBody: ResetPasswordRequest = {
      email: this.email,
      otpCode: this.otpCode,
      newPassword: this.newPassword
    };

    this.AthuService.resetPassword(requestBody).subscribe({
      next: (res) => {
        this.responseMessage = res.errorMessage || 'تم تغيير كلمة المرور بنجاح';
        this.toastr.success(this.responseMessage);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        if (err.error?.message === 'User not found.') {
          this.responseMessage = 'هذا البريد الإلكتروني غير موجود';
        } else {
          this.responseMessage = err.error?.message || 'حدث خطأ أثناء الاتصال بالخادم.';
        }
        this.toastr.error(this.responseMessage);
        console.error(err);
      }
    });
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