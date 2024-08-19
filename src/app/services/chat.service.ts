import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private http: HttpClient) {}

  sendMessage(messageData: any) {
    return this.http.post(`${environment.apiUrl}/chat/send`, messageData);
  }

  getMessages(senderId: string, receiverId: string) {
    return this.http.get(`${environment.apiUrl}/chat/messages?senderId=${senderId}&receiverId=${receiverId}`);
  }
}
