import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../../core/components/header/header.component';
import { NgIf } from '@angular/common';
import { AudioService } from '../../../core/services/audio.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { TestService } from '../../../core/services/Test/test.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IQuestion } from '../../../core/interface/iquestion';

declare var $: any;
@Component({
  selector: 'app-communication-skills',
  imports: [HeaderComponent,NgIf,RouterLink],
  templateUrl: './communication-skills.component.html',
  styleUrl: './communication-skills.component.css',
})
export class CommunicationSkillsComponent {
  private readonly audioService= inject(AudioService);
   private readonly testService=inject(TestService);
      private readonly activatedRoute=inject(ActivatedRoute);
      private readonly toastrService=inject(ToastrService);
      TestId!:number;
      questions:IQuestion[]=[];
      testName!:string;
      resultComponent:boolean = false;
   
   
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
  @ViewChild('header', { static: false }) myheader!: ElementRef; // Reference to header element

  cnt: number = 0; // السكور الحالي
  result: string = ''; // النتيجة النهائية
  showResultComponent: boolean = false; // التحكم في ظهور الـ ResultComponent
    is_sent = false;


formDataImage: FormData = new FormData();
  answersMap: { [key: number]: number } = {}; // لتخزين إجابة كل سؤال

showResult(questionId: number, num: number): void {
  this.answersMap[questionId] = num;
}

  

toggleResult(): void {
  // التحقق من وجود سؤال غير مُجاب
  const unansweredIndex = this.questions.findIndex(q => !(q.questionId in this.answersMap));

  if (unansweredIndex !== -1) {
    const questionNumber = unansweredIndex + 1;
    this.toastrService.error(`السؤال رقم ${questionNumber} لم يتم الإجابة عليه ❌`, 'خطأ');
    return;
  }

  // حسِب السكور من الإجابات
  this.cnt = 0;
  Object.values(this.answersMap).forEach(value => {
    this.cnt += value;
  });

  // تحديد النتيجة
  if (this.cnt >= 12 && this.cnt <= 18)
    this.result = "ضعيف و تحتاج لتحسين مهارات التواصل";
  else if (this.cnt >= 19 && this.cnt <= 29)
    this.result = "معقول و محتاج انك تكتسب عادات اكتر لزياده قدرات التواصل";
  else if (this.cnt >= 30 && this.cnt <= 36)
    this.result = "ممتاز حافظ على هذه العادات لكى تكتسب مزيد من الاصدقاء";

  console.log(this.result);
  this.showRecorder=true

}



handleClick() {
  if (!this.is_sent) {
    this.toggleResult();
      this.is_sent = true;
      // هنا تقدر تبعت النتيجة للسيرفر لو حبيت
    
  } else {
    this.open(); // تسجيل صوتي مثلاً أو أي عملية بعد الإرسال
  }
}


  isRecording: boolean = false;



showRecorder: boolean = false;

showRecorderBox() {
  this.showRecorder = true;
}

  recordedTime: string = '';
  blobUrl: any;
  teste: any;

  constructor(
    private sanitizer: DomSanitizer
  )


  {
    this.audioService
      .recordingFailed()
      .subscribe(() => (this.isRecording = false));
    this.audioService
      .getRecordedTime()
      .subscribe(time => (this.recordedTime = time));
    this.audioService.getRecordedBlob().subscribe(data => {
      this.teste = data;
      this.blobUrl = this.sanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(data.blob)
      );
    });
  }

  startRecording() {
    if (!this.isRecording) {
      this.isRecording = true;
      this.audioService.startRecording();
    }
  }

  abortRecording() {
    if (this.isRecording) {
      this.isRecording = false;
      this.audioService.abortRecording();
    }
  }



  clearRecordedData() {
    this.blobUrl = null;
  }

  ngOnDestroy(): void {
    this.abortRecording();
  }




/*****************************Video******************************* */
@ViewChild('video') videoRef!: ElementRef<HTMLVideoElement>;
  isCameraVisible = false;
  stream!: MediaStream;

  showCamera() {
    this.isCameraVisible = true;
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        this.stream = stream;

        const video = this.videoRef.nativeElement;
        video.srcObject = stream;

        console.log('✅ تم الحصول على الـ stream:', stream);
        console.log('🎥 الكاميرا تعمل؟', stream.getVideoTracks().length > 0 ? 'نعم' : 'لا');

        // ننتظر قليلًا حتى يعمل الفيديو
        setTimeout(() => {
          // إنشاء عنصر canvas لأخذ صورة من الفيديو
          const canvas = document.createElement('canvas');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            canvas.toBlob((blob) => {
              if (blob) {
                this.formDataImage.append('image', blob, 'capture.jpg');

              }
            }, 'image/jpeg');
          }
        }, 1000); // ننتظر 1 ثانية للتأكد من تحميل الفيديو
      })
      .catch((err) => {
        console.error('❌ فشل في تشغيل الكاميرا:', err);
      });
  }


stop(){
   if (this.isRecording) {
      this.audioService.stopRecording();
      this.isRecording = false;
    }
     if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
    }
    this.isCameraVisible = false;
}
start(){
  this.showCamera();
  this.startRecording();
}
open() {
  this.showRecorder = true;
}
closeRecorder() {
  this.showRecorder = false;
}

  audio: any; // Add this property to fix the error
image: any;
  sendAudioToApi() {
    console.log("button");
  const formData = new FormData();
  formData.append('Voice', this.teste.blob, this.teste.title);

  this.audioService.audioRecord(formData).subscribe({
    next: (res) => {
      console.log('API Response:', res.KeyVoice);
      this.audio=res.KeyVoice;
    },
    error: (err) => {
      console.error('API Error:', err);
    }
  });
   this.audioService.analzeEmotion(this.formDataImage).subscribe({
                  next: (res) => {
                    console.log('تحليل المشاعر:', res.KeyImage);
                    this.image=res.KeyImage;
                  },
                  error: (err) => {
                    console.error('خطأ في تحليل المشاعر:', err);
                  }
                });



                this.showRecorder = false;
                this.resultComponent=true;
                

}
mapUrl: SafeResourceUrl | null = null; // Store the map URL safely

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


}
