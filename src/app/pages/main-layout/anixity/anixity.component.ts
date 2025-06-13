import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HeaderComponent } from '../../../core/components/header/header.component';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { TestService } from '../../../core/services/Test/test.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IQuestion } from '../../../core/interface/iquestion';
import { GoogleMapsModule } from '@angular/google-maps';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-anixity',
  imports: [HeaderComponent, IconComponent,RouterLink,GoogleMapsModule,CommonModule],
  templateUrl: './anixity.component.html',
  styleUrl: './anixity.component.css',
})
export class AnixityComponent implements OnInit{
  @ViewChild('header', { static: false }) myheader!: ElementRef; // Reference to header element
    private readonly testService=inject(TestService);
    private readonly activatedRoute=inject(ActivatedRoute);
    private readonly toastrService=inject(ToastrService);
    private readonly sanitizer = inject(DomSanitizer); // Inject DomSanitizer
  cnt: number = 0; 
  showResultComponent: boolean = false;
  backgroundClass: string = '';
  result:string='';
      TestId!:number;
    questions:IQuestion[]=[];
    testName!:string;
    // Removed duplicate declaration of mapUrl
    
  mapUrl: SafeResourceUrl | null = null; // Store the map URL safely

 answersMap: { [key: number]: number } = {}; // questionId -> selectedValue


showResult(questionId: number, value: number): void {
  this.answersMap[questionId] = value;
}

toggleResult(): void {
  const unanswered = this.questions.findIndex(q => !(q.questionId in this.answersMap));
  if (unanswered !== -1) {
    const questionNumber = unanswered + 1; // علشان تبدأ من 1
    this.toastrService.error(`السؤال رقم ${questionNumber} لم يتم الإجابة عليه ❌`, 'خطأ');
    return;
  }

  // احسب المجموع
  this.cnt = Object.values(this.answersMap).reduce((a, b) => a + b, 0);

  if (this.cnt >= 0 && this.cnt <= 4) this.result = "قلق بسيط";
  else if (this.cnt >= 5 && this.cnt <= 9) this.result = "قلق متوسط";
  else if (this.cnt >= 10 && this.cnt <= 14) this.result = "قلق متوسط إلى شديد";
  else if (this.cnt >= 15 && this.cnt <= 21) this.result = "قلق شديد";

  this.showResultComponent = true;

  this.testService.sumitResult(this.result, this.TestId).subscribe({
    next: (res) => {
      this.toastrService.success('تمت العملية بنجاح 🎉', 'نجاح');
      console.log(res);
    }
  });
}



    findNearestClinic(event: Event) {
      event.preventDefault(); // Prevent default anchor behavior
  
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
  
            // Google Maps URL without API key
            const googleMapsUrl = `https://www.google.com/maps?q=therapy+clinic&ll=${lat},${lng}&z=14&output=embed`;
  
            // Sanitize the URL for Angular security
            this.mapUrl =
              this.sanitizer.bypassSecurityTrustResourceUrl(googleMapsUrl);
          },
          (error) => {
            console.error('Geolocation error:', error);
            alert('Location access is required to find the nearest clinic.');
          }
        );
      } else {
        alert('Geolocation is not supported by this browser.');
      }
    }

  
    getAllQuection():void{
      this.activatedRoute.paramMap.subscribe({
        next:(res)=>{
          const idParam = res.get('id');
        if (idParam !== null) {
          this.TestId = +idParam;
          this.testService.getAllQuestions(this.TestId).subscribe({
            next:(res)=>{
              console.log(res.data);
              this.testName=res.data.testName;
              this.questions=res.data.questions;
              console.log("objest",res.data.questions)
           
  
            }
          })
        }
      }
  
      })
  
    }
    ngOnInit(): void {
      this.getAllQuection();
    }
  
}
