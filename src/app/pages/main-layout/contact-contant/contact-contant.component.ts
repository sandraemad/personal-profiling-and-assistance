import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-contact-contant',
  templateUrl: './contact-contant.component.html',
  styleUrls: ['./contact-contant.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class ContactContantComponent {
  contactForm: FormGroup;
  apiUrl = 'https://personal-profiling-and-assistance-app.runasp.net/api/ContactUs/add';
  userEmail: string | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient,  private toastrService: ToastrService) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      problem: ['', Validators.required],
    });

    const emailFromToken = this.getEmailFromToken();
    if (emailFromToken) {
      this.userEmail = emailFromToken;
    } else {
      console.error('لم يتم العثور على الإيميل في التوكن');
    }
  }

  // فك التوكن واسترجاع الإيميل
  getEmailFromToken(): string | null {
    const token = localStorage.getItem('token'); // غيّري الاسم لو التوكن باسم مختلف
    if (!token) return null;

    const payload = token.split('.')[1];
    try {
      const decodedPayload = JSON.parse(atob(payload));
      // تأكدي هنا حسب التوكن ممكن يكون email أو sub
      return decodedPayload?.email || decodedPayload?.sub || null;
    } catch (error) {
      console.error('خطأ أثناء فك التوكن:', error);
      return null;
    }
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }
  
    if (!this.userEmail) {
      this.toastrService.error('لا يمكن إرسال البيانات بدون بريد إلكتروني صحيح.');
      return;
    }
  
    const date = this.contactForm.value.date; // التاريخ من input date
    const time = this.contactForm.value.time; // الوقت من input time
  
    // دمج التاريخ والوقت مع بعض بصيغة صحيحة
    const dateTime = `${date}T${time}`;
  
    const formData = {
      name: this.contactForm.value.name,
      phone: this.contactForm.value.phone,
      date: dateTime, // إرسال التاريخ + الوقت معًا هنا
      problem: this.contactForm.value.problem,
      email: this.userEmail
    };
  
    this.http.post(this.apiUrl, formData, { responseType: 'text' }).subscribe({
      next: (response) => {
        const message = response || 'تم ارسال مشكلتك بنجاح، شكرا على تواصلك معنا.';
        this.toastrService.success(message);
        this.contactForm.reset();
      },
      error: (error) => {
        const errorMessage = error.error || 'حدث خطأ أثناء إرسال النموذج.';
        this.toastrService.error(errorMessage);
      }
    });
  }
  
  
}