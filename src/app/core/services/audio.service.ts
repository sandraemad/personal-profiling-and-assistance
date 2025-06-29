import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { timeout } from 'rxjs/operators';
import moment from "moment";

export interface RecordedAudioOutput {
  blob: Blob;
  title: string;
}

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  constructor(private httpClient:HttpClient) { }
private stream: MediaStream | null = null;
  private recorder: any = null;  // خليها any عشان مش هن نعرف نوع RecordRTC من برا
  private interval: any;
  private startTime: moment.Moment | null = null;
  private _recorded = new Subject<RecordedAudioOutput>();
  private _recordingTime = new Subject<string>();
  private _recordingFailed = new Subject<string>();

  getRecordedBlob(): Observable<RecordedAudioOutput> {
    return this._recorded.asObservable();
  }

  getRecordedTime(): Observable<string> {
    return this._recordingTime.asObservable();
  }

  recordingFailed(): Observable<string> {
    return this._recordingFailed.asObservable();
  }

  startRecording() {
    if (this.recorder) {
      // It means recording is already started or it is already recording something
      return;
    }

    this._recordingTime.next("00:00");
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(s => {
        this.stream = s;
        this.record();
      })
      .catch(error => {
        this._recordingFailed.next('Recording failed');
      });
  }

  abortRecording() {
    this.stopMedia();
  }

  private async record() {
    if (!this.stream) {
      this._recordingFailed.next('No audio stream available');
      return;
    }

    // الاستيراد الديناميكي هنا
    const RecordRTC = (await import('recordrtc')).default;

    this.recorder = new RecordRTC.StereoAudioRecorder(this.stream, {
      type: "audio",
      mimeType: "audio/wav"
    });

    this.recorder.record();
    this.startTime = moment();
    this.interval = setInterval(() => {
      const currentTime = moment();
      const diffTime = moment.duration(currentTime.diff(this.startTime));
      const time =
        this.toString(diffTime.minutes()) +
        ":" +
        this.toString(diffTime.seconds());
      this._recordingTime.next(time);
    }, 1000);
  }

  private toString(value: number) {
    let val = value;
    if (!value) val = 0;
    if (val < 10) return "0" + val;
    return val.toString();
  }

  stopRecording() {
    if (this.recorder) {
      this.recorder.stop(
        (blob: Blob | undefined) => {
          if (blob && this.startTime) {
            const mp3Name = encodeURIComponent(
              "audio_" + new Date().getTime() + ".wav"
            );
            this.stopMedia();
            this._recorded.next({ blob: blob, title: mp3Name });
          } else {
            this.stopMedia();
            this._recordingFailed.next('Recording failed');
          }
        }
      );
    }
  }

  private stopMedia() {
    if (this.recorder) {
      this.recorder = null;
      clearInterval(this.interval);
      this.startTime = null;
      if (this.stream) {
        this.stream.getAudioTracks().forEach(track => track.stop());
        this.stream = null;
      }
    }
  }
  audioRecord(data:any):Observable<any> {
    return this.httpClient.post('https://localhost:7276/api/ModelIntegration/analyze-audio',data );
}


 analzeEmotion(formData: object): Observable<any> {
    return this.httpClient.post("https://localhost:7276/api/ModelIntegration/analyze-image", formData)
  }



}
