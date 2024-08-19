import { Component, inject, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { SocketService } from '../../services/socket.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, NgClass, DatePipe],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent implements OnInit {
  message = '';
  messages: any[] = [];
  users: any[] = [];

  user = localStorage.getItem('user');
  currentUserId = this.user ? JSON.parse(this.user).id : '';

  route = inject(ActivatedRoute);
  authService = inject(AuthService);

  constructor(
    private chatService: ChatService,
    private socketService: SocketService
  ) {}

  ngOnInit(): void {
    this.socketService.listen('receiveMessage').subscribe((message: any) => {
      this.messages.push(message);
    });

    // Load existing messages
    this.chatService
      .getMessages(this.route.snapshot.params['id'], this.currentUserId)
      .subscribe((messages: any) => {
        this.messages = messages;
      });
  }

  sendMessage() {
    this.route.params.subscribe((params) => {      
      const messageData = {
        senderId: this.currentUserId,
        receiverId: params?.['id'],
        content: this.message,
      };
  
      this.chatService.sendMessage(messageData).subscribe(() => {
        this.socketService.emit('sendMessage', messageData);
        this.message = '';
      });
    });
  }

  goBack() {
    this.authService.redirectToHome();
  }
}
