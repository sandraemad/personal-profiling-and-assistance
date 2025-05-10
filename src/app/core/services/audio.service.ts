import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AudioService {

  constructor(private httpClient:HttpClient) { }
    analyzeAudio(data:object): Observable<any> {

  return this.httpClient.post(`https://localhost:7276/api/ModelIntegration/analyze-audio`,data);
}

}
