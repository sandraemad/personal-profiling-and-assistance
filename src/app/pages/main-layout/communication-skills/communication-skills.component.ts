import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ResultComponent } from '../result/result.component';
import { HeaderComponent } from '../../../core/components/header/header.component';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { NgIf } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { AudioService } from '../../../core/services/audio.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import RecordRTC from 'recordrtc';

declare var $: any;
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

  isRecording: boolean = false;



showRecorder: boolean = false;

showRecorderBox() {
  this.showRecorder = true;
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
                const formData = new FormData();
                formData.append('image', blob, 'capture.jpg');

                this.audioService.analzeEmotion(formData).subscribe({
                  next: (res) => {
                    console.log('تحليل المشاعر:', res);
                  },
                  error: (err) => {
                    console.error('خطأ في تحليل المشاعر:', err);
                  }
                });
              }
            }, 'image/jpeg');
          }
        }, 1000); // ننتظر 1 ثانية للتأكد من تحميل الفيديو
      })
      .catch((err) => {
        console.error('❌ فشل في تشغيل الكاميرا:', err);
      });
  }


  closeCamera() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
    }
    this.isCameraVisible = false;
  }
/**********************Audion************************* */
  // mediaRecorder!: MediaRecorder;
  // audioChunks: BlobPart[] = [];
  // audioBlob!: Blob;
  // audioUrl: string = '';

  // stopRecording() {
  //   if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
  //     this.mediaRecorder.stop();

  //     // ✨ هنا نوقف كل الـ tracks المرتبطة بالمايك
  //     const tracks = this.mediaRecorder.stream.getTracks();
  //     tracks.forEach(track => track.stop());
  //   }
  // }


  // uploadRecording() {
  //   if (!this.audioBlob) return;

  //   const audioFile = new File([this.audioBlob], 'recording.wav', { type: 'audio/wav' });

  //   // ✅ تحقق من حجم الملف
  //   const sizeInKB = audioFile.size / 1024;
  //   if (sizeInKB < 1) {
  //     console.warn('⚠️ الملف صغير جدًا، غالبًا التسجيل فاضي.');
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append('Voice', audioFile, 'audio.wav');

  //   console.log('🟢 إرسال الملف بحجم:', sizeInKB.toFixed(2), 'KB');

  //   this.audioService.analyzeAudio(formData).subscribe({
  //     next: (res) => {
  //       console.log('🎉 تم التحليل بنجاح:', res);
  //     },
  //     error: (err) => {
  //       console.error('❌ خطأ في تحليل الصوت:', err);
  //     }
  //   });
  // }

  // playBeep() {
  //   const context = new AudioContext();
  //   const oscillator = context.createOscillator();
  //   oscillator.type = 'sine';
  //   oscillator.frequency.setValueAtTime(1000, context.currentTime); // التردد
  //   oscillator.connect(context.destination);
  //   oscillator.start();
  //   oscillator.stop(context.currentTime + 0.3); // 0.3 ثانية
  // }

  // async startRecording() {
  //   this.playBeep(); // ✨ تشغيل البوق قبل التسجيل

  //   const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  //   this.mediaRecorder = new MediaRecorder(stream);

  //   this.audioChunks = [];
  //   this.mediaRecorder.ondataavailable = event => {
  //     this.audioChunks.push(event.data);
  //   };

  //   this.mediaRecorder.onstop = () => {
  //     this.audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
  //     this.audioUrl = URL.createObjectURL(this.audioBlob);
  //   };

  //   this.mediaRecorder.start();
  // }
  // closeRecorder() {
  //   this.showRecorder = false;
  // }

  private sanitizer = inject(DomSanitizer);


  private record: any; // RecordRTC type
  recording: boolean = false;
  url: string = '';
  safeUrl: SafeUrl | null = null;
  error: string = '';
  /**
   * Start recording the audio stream
   */
  initiateRecording(): void {
    this.recording = true;
    const mediaConstraints = { audio: true, video: false };

    navigator.mediaDevices.getUserMedia(mediaConstraints)
      .then(this.successCallback)
      .catch(this.errorCallback);
  }

  /**
   * Callback after successful permission and stream
   */
  private successCallback = (stream: MediaStream): void => {
    const options: RecordRTC.Options = {
      mimeType: 'audio/wav', // تأكد أنها من الأنواع المدعومة
      numberOfAudioChannels: 1, // 1 أو 2 حسب المتاح
      sampleRate: 16000
    };

    const StereoAudioRecorder = RecordRTC.StereoAudioRecorder;

    // هنا نحول الخيارات إلى any لتجاوز التحقق الصارم مؤقتًا إذا استمر الخطأ
    this.record = new StereoAudioRecorder(stream, options as any);
    this.record.record();
  };


  /**
   * Stop the recording process
   */
  stopRecording(): void {
    this.recording = false;
    if (this.record) {
      this.record.stop(this.processRecording);
    }
  }

  /**
   * Process the recorded audio blob
   */
  private processRecording = (blob: Blob): void => {
    this.url = URL.createObjectURL(blob);
    this.safeUrl = this.sanitizer.bypassSecurityTrustUrl(this.url);
    console.log("Blob recorded:", blob);
    console.log("URL:", this.url);
  };

  /**
   * Error handler for media access
   */
  private errorCallback = (err: any): void => {
    console.error('Error accessing media devices.', err);
    this.error = 'Cannot access microphone or play audio in this browser.';
    this.recording = false;
  };



}
