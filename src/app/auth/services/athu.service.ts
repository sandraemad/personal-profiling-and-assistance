import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export interface ResetPasswordRequest {
  email: string;
  otpCode: string;
  newPassword: string;
}
@Injectable({
  providedIn: 'root'
})
export class AthuService {

  constructor(private httpClient:HttpClient) { }
  Register(data:object):Observable<any>{
    return this.httpClient.post(`https://personal-profiling-and-assistance-app.runasp.net/api/Account/register`,data);
  }
  login(data:object):Observable<any>{
    return this.httpClient.post(`https://personal-profiling-and-assistance-app.runasp.net/api/Account/login`,data);
  }
  resetPassword(body: ResetPasswordRequest): Observable<any> {
    return this.httpClient.post("https://personal-profiling-and-assistance-app.runasp.net/api/Account/reset-password", body);
  }
  sendOtp(email: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  
    return this.httpClient.post(
      'https://personal-profiling-and-assistance-app.runasp.net/api/Account/send-otp',
      JSON.stringify(email),
      { headers }
    );
  }
}
