import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/commons/chat.service';
import { QuickRoomDataStorage } from '../quick-room-dialog/quickRoomDataStorage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quick-room',
  templateUrl: './quick-room.component.html',
  styleUrls: ['./quick-room.component.css']
})
export class QuickRoomComponent implements OnInit {

  message: string;
  messages: string[] = [];
  users: string[] = [];
  ioConnection: any;
  ioJoin: any;

  latestUser = this.quickRoomDataStorage.quickRoomData.latestUser;
  dataRoom = this.quickRoomDataStorage.quickRoomData.room;

  constructor(
    private chatService: ChatService,
    private quickRoomDataStorage: QuickRoomDataStorage,
    private router: Router) { }

  ngOnInit() {
    if(!this.quickRoomDataStorage.quickRoomData) {
      return this.router.navigate(['']);
    } 
      this.initIoConnection();
  }

  private initIoConnection(): void {
    this.chatService.initSocket();

    this.chatService.join(this.latestUser, this.dataRoom);
    
    this.ioConnection = this.chatService.onMessage()
      .subscribe((message: any) => {
        this.messages.push(message);
      });

    this.ioJoin = this.chatService.onJoin()
    .subscribe((user: any) => {
      this.users.push(user);
      console.log('new user', user)
    })

    this.chatService.onEvent('connect')
      .subscribe(() => {
        console.log('connected');
      });
      
    this.chatService.onEvent('disconnect')
      .subscribe(() => {
        console.log('disconnected');
      });
  }


  public sendMessage(message: string): void {
    if (!message) {
      return;
    }

    this.chatService.send({
      // from: this.user,
      content: message
    });
    this.message = null;
  }

  // public sendNotification(params: any, action: any): void {
  //   let message: string;

  //   if (action === Action.JOINED) {
  //     message = {
  //       from: this.user,
  //       action: action
  //     }
  //   } else if (action === Action.RENAME) {
  //     message = {
  //       action: action,
  //       content: {
  //         username: this.user.name,
  //         previousUsername: params.previousUsername
  //       }
  //     };
  //   }

  //   this.socketService.send(message);
  // }

}
