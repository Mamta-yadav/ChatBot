import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Message } from '../message.model';
import { ChatService } from '../chat.service';
import { SharedModule } from '../shared.module';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule,FormsModule,SharedModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css'
})
export class ChatbotComponent {

  message = signal<Message[]>([]);
  isLoading = signal(false);
  userInput ='';
  isSideBarOpen = signal(false);

  constructor(private chatService: ChatService){
    this.initializaChat();
  }
  private initializaChat() {
    const welcomeMsg = [
      {
        content : 'Hello! 👋 I\'m your AI Assistant. ',
        isUser  : false,
        timestamp: new Date()
      },
    ];

    this.message.set(welcomeMsg);
  }

  sendMessage(){
    if(this.userInput.trim() && !this.isLoading()){
      const userMessage = this.userInput.trim();
      this.message.update(message => [
        ...message,
        {
          content:userMessage,
          isUser :true,
          timestamp :new Date()
        }
      ]);

      this.chatService.sendMessage(this.userInput).subscribe({
        next : (response) => {
          this.message.update(message => [
            ...message,
            {
              content: response.reply,
              isUser:false,
              timestamp:new Date()
            }
          ]);
          this.isLoading.set(false);
        },
        error : (error) => {
          console.error("Error" , error)
          this.message.update(message => [
            ...message,
            {
              content:'Sorry, I encountered an error.Please try again.',
              isUser:false,
              timestamp:new Date()
            }
          ]);
          this.isLoading.set(false);
        }
      });
      this.userInput= "";
      this.isLoading.set(true);
    }
  }

  toggleSideBar(){
    this.isSideBarOpen.update(value => !value);
  }

  clearchat(){
    this.message.set([]);
    this,this.initializaChat();
  }
  trackByTimestamp(index: number, message: Message) {
    return message.timestamp;
  }
  

}
