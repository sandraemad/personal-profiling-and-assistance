import { CanActivateFn, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const toastrService = inject(ToastrService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // التحقق إذا كان في بيئة المتصفح
  if (isPlatformBrowser(platformId)) {
    // إذا كان الـ token موجودًا
    const token = localStorage.getItem('token');
    if (token) {
      return true; // السماح بالوصول
    } else {
      // إذا لم يكن الـ token موجودًا
      toastrService.error("لا يمكنك الدخول على هذه الصفحة", "خطأ!");
      router.navigate(['/login']); // توجيه المستخدم إلى صفحة الدخول
      return false; // منع الوصول إلى الصفحة المطلوبة
    }
  }

  // في حال كانت البيئة غير المتصفح (مثل السيرفر)
  return false;
};
