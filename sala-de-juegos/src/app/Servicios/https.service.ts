import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HttpsService {

  constructor(private https:HttpClient) { }

  getImage(url:string)
  {
    return this.https.get(url, 
    {
        headers: new HttpHeaders(
          {
            'Content-Type':'application/json',
            Authorization: '563492ad6f91700001000001b2e4f4d1c0b54d10a49260f751b4c7b4' 
          })
    });
  }
}
