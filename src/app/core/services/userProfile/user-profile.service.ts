import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private httpClient:HttpClient) { }

  getProfileUser():Observable<any>{
    return this.httpClient.get(`https://personal-profiling-and-assistance-app.runasp.net/api/Admin/GetUserById/${localStorage.getItem('userId')}`);
  }
  DeleteProfileUser():Observable<any>{
    return this.httpClient.delete(`https://personal-profiling-and-assistance-app.runasp.net/api/Admin/DeleteUser/${localStorage.getItem('userId')}`);
 
  }
  UpdateProfileUser(data:object):Observable<any>{
    return this.httpClient.put(`https://personal-profiling-and-assistance-app.runasp.net/api/Admin/UpdateAdmin/${localStorage.getItem('userId')}`,data);
  }
}
