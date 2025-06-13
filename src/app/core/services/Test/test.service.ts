import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private readonly httpClient:HttpClient) { }
  getAllTests():Observable<any>{
    return this.httpClient.get('https://personal-profiling-and-assistance-app.runasp.net/api/Tests/GetAllTests');
  }
  getAllQuestions(id:number):Observable<any>
  {
   return this.httpClient.get(`https://personal-profiling-and-assistance-app.runasp.net/api/Tests/GetTestQuestions/${id}`);
  }
  sumitResult(res:string,id:number):Observable<any>{
    const now = new Date().toISOString();
    return this.httpClient.post(`https://personal-profiling-and-assistance-app.runasp.net/api/UserTests/AddTestToUser/${id}`,
      {
        "date":now,
        "result":`Key:${res}`
      }

    )
  }
}
