import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {
  mensaje: string;
  elemento: any;


  constructor(public _chatService: ChatService) {
    this.mensaje = '';
    this._chatService.loadMessages().subscribe(
      response => {
        setTimeout( () =>
          this.elemento.scrollTop = this.elemento.scrollHeight, 100);

      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnInit() {
    this.elemento = document.getElementById('app-mensajes');

  }

  enviar() {

    if (this.mensaje.length === 0) {
      return;
    }

    this._chatService.addMessage(this.mensaje)
      .then(() => {
        console.log('hecho..');
      })
      .catch((error) => console.error(error));
      this.mensaje = '';
  }

}
