import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ResultComponent } from '../result/result.component';
import { HeaderComponent } from '../../../core/components/header/header.component';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { NgIf } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { AudioService } from '../../../core/services/audio.service';

@Component({
  selector: 'app-communication-skills',
  imports: [HeaderComponent,NgIf],
  templateUrl: './communication-skills.component.html',
  styleUrl: './communication-skills.component.css',
})
export class CommunicationSkillsComponent {
  private readonly audioService= inject(AudioService);
  @ViewChild('header', { static: false }) myheader!: ElementRef; // Reference to header element

  cnt: number = 0; // السكور الحالي
  showResultComponent: boolean = false; // التحكم في ظهور الـ ResultComponent

  showResult(num: number): void {
    this.cnt += num; // تحديث السكور
  }

  toggleResult(): void {
    this.showResultComponent = true; // إظهار الـ component
  }
  mediaRecorder!: MediaRecorder;
  audioChunks: Blob[] = [];
  isRecording: boolean = false;



  startRecording() {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        this.mediaRecorder = new MediaRecorder(stream);
        this.audioChunks = [];
  
        this.mediaRecorder.ondataavailable = (event) => {
          this.audioChunks.push(event.data);
        };
        this.mediaRecorder.onstop = () => {
  const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' }); // ✅ تصحيح هنا
  console.log('Blob:', audioBlob);
  const formData = new FormData();
  formData.append('Voice', audioBlob, 'audio.wav');
  this.audioService.analyzeAudio(formData).subscribe({
    next: (res) => {
      console.log(res);
    },
    error: (err) => {
      console.error('خطأ في تحليل الصوت:', err);
    }
  });
};

      

  
  
        this.mediaRecorder.start();
        this.isRecording = true;
        setTimeout(() => {
  if (this.mediaRecorder && this.isRecording) {
    this.mediaRecorder.stop();
    this.isRecording = false;

    // يقفل صندوق التسجيل تلقائيًا
    this.closeRecorder();
  }
}, 5000); // 5000 ملي ثانية = 5 ثواني

  
    
      })
      .catch(err => {
        console.error('حدث خطأ أثناء الوصول للمايك:', err);
      });
  }
  

  stopRecording() {
    if (this.mediaRecorder && this.isRecording) {
      this.mediaRecorder.stop();
      this.isRecording = false;
    
    }
  }
showRecorder: boolean = false;

showRecorderBox() {
  this.showRecorder = true;
}

closeRecorder() {
  this.showRecorder = false;
}

  
}
