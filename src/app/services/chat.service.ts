import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Message } from '../interfaces/message.interface';


@Injectable()
export class ChatService {
  chats: FirebaseListObservable<any[]>;
  user: any = null;


  constructor(
              private db: AngularFireDatabase,
              public afAuth: AngularFireAuth
  ) {
    if (localStorage.getItem('usuario')) {
      this.user = JSON.parse( localStorage.getItem('usuario') );
    }
  }

  loadMessages() {
    this.chats = this.db.list('/chats', {
      query: {
        limitToLast: 20,
        orderByKey: true
      }
    });

    return this.chats;
  }

  addMessage(message: string) {
    let mensaje: Message = {
      name: this.user.displayName,
      message: message,
      uid: this.user.uid
    }

    return this.chats.push(mensaje);
  }

  login(type: string) {

    let provider: any;

    if ( type == 'google' ) {
      provider = new firebase.auth.GoogleAuthProvider();
    } else {
      provider = new firebase.auth.TwitterAuthProvider();
    }

    this.afAuth.auth.signInWithPopup(provider)
      .then(resp => {
        console.log(resp);
        this.user = resp.user;
        localStorage.setItem('usuario', JSON.stringify(this.user) );
      })
      .catch( error => console.error(error));
  }

  logout() {
    localStorage.removeItem('usuario');
    this.user = null;
    this.afAuth.auth.signOut();
  }

}
