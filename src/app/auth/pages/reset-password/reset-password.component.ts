import { Component, OnInit, inject } from '@angular/core';
import { AthuService, ResetPasswordRequest } from './../../services/athu.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  providers: [AthuService, ToastrService],
  standalone: true,
})
export class ResetPasswordComponent implements OnInit {
  email: string = '';
  otpCode: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  responseMessage: string = '';

  private platformId = inject(PLATFORM_ID);

  constructor(
    private accountService: AthuService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.email = sessionStorage.getItem('resetEmail') || '';
      if (!this.email) {
        this.responseMessage = 'لا يمكنك الدخول على هذه الصفحة مباشرة.';
        this.toastr.error(this.responseMessage);
        this.router.navigate(['/login']);
      }
    }
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

    this.accountService.resetPassword(requestBody).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.responseMessage = 'تم تغيير كلمة المرور بنجاح.';
          this.toastr.success(this.responseMessage);
          if (isPlatformBrowser(this.platformId)) {
            sessionStorage.removeItem('resetEmail');
          }
          this.router.navigate(['/login']);
        } else {
          this.responseMessage =
            res.errorMessage === 'User not found.'
              ? 'هذا البريد الإلكتروني غير موجود.'
              : res.errorMessage === 'Invalid code.'
              ? 'رمز التحقق غير صحيح.'
              : res.errorMessage || 'حدث خطأ أثناء تغيير كلمة المرور.';
          this.toastr.error(this.responseMessage);
        }
      },
      error: (err) => {
        this.responseMessage = err.error?.message || 'حدث خطأ أثناء الاتصال بالخادم.';
        this.toastr.error(this.responseMessage);
        console.error(err);
      }
    });
  }
}