import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from './message.model';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private apiURL = "http://localhost:3000/api/chat";

  constructor(private http: HttpClient) { }
  sendMessage(message:string):Observable<any>{
    return this.http.post<any>(this.apiURL , {message});
  }
}
