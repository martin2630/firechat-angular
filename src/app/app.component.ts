import { Component } from '@angular/core';
import { ChatService } from './services/chat.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isAuthenticated: boolean;

  constructor(public _chatService: ChatService) {
  }

  salir() {
    this._chatService.logout();
  }

}
