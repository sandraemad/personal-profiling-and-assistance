import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../../core/components/header/header.component';
import { TestService } from '../../../core/services/Test/test.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { IQuestion } from '../../../core/interface/iquestion';
import { NgIf } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-type-personal',
  imports: [HeaderComponent,RouterLink,NgIf,GoogleMapsModule],
  templateUrl: './type-personal.component.html',
  styleUrl: './type-personal.component.css',
})
export class TypePersonalComponent {
  private readonly testService=inject(TestService);
      private readonly activatedRoute=inject(ActivatedRoute);
      private readonly toastrService=inject(ToastrService);
      private readonly sanitizer = inject(DomSanitizer); // Inject DomSanitizer
    cnt_A: number = 0; 
    cnt_B: number = 0;
    showResultComponent: boolean = false;
    backgroundClass: string = '';
    result:string='';
        TestId!:number;
      questions:IQuestion[]=[];
      testName!:string;
      // Removed duplicate declaration of mapUrl
      
    mapUrl: SafeResourceUrl | null = null; // Store the map URL safely
  answersMap: { [key: number]: number } = {}; // questionId -> 0 or 1


showResult(questionId: number, num: number): void {
  this.answersMap[questionId] = num;
}

toggleResult(): void {
  const unansweredIndex = this.questions.findIndex(q => !(q.questionId in this.answersMap));
  
  if (unansweredIndex !== -1) {
    const questionNumber = unansweredIndex + 1;
    this.toastrService.error(`السؤال رقم ${questionNumber} لم يتم الإجابة عليه ❌`, 'خطأ');
    return;
  }

  // احسب النتائج
  this.cnt_A = 0;
  this.cnt_B = 0;

  Object.values(this.answersMap).forEach(value => {
    if (value === 0) this.cnt_A += 1;
    else if (value === 1) this.cnt_B += 1;
  });

  // تحديد النتيجة
  if (this.cnt_A > this.cnt_B) {
    this.result = "أنت تميل إلى الانفتاح الاجتماعي  و التفكير المنطقي  و التخطيط والتنظيم . قد تكون شخصية منفتحة، تحب التواصل والتخطيط المسبق.";
  } else if (this.cnt_A < this.cnt_B) {
    this.result = "أنت تميل إلى الانطوائية  و الشعور  و التكيف والمرونة . قد تكون شخصية هادئة، تفضل التفكير الداخلي والتفاعل مع العالم بناءً على مشاعرك وقيمك";
  } else {
    this.result = "شخصيتك متوازنة بين الانفتاح والانطوائية، وبين التفكير المنطقي والمشاعر.";
  }

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
