import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/commons/chat.service';
import { QuickRoomDataStorage } from '../../services/quickRoomDataStorage';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { QuickRoomShareComponent } from '../quick-room-share/quick-room-share.component';
import { Message } from 'src/app/models/Message';
import * as moment from 'moment';

@Component({
  selector: 'app-quick-room',
  templateUrl: './quick-room.component.html',
  styleUrls: ['./quick-room.component.scss']
})
export class QuickRoomComponent implements OnInit {

  message: string;
  messages: string[] = [];
  users: string[] = [];
  ioConnection: any;
  ioJoin: any;
  ioDisconnect: any;

  latestUser: any; 
  room: any; 

  constructor(
    private chatService: ChatService,
    private quickRoomDataStorage: QuickRoomDataStorage,
    private router: Router,
    public dialog: MatDialog) { }

  ngOnInit() {
    if(!this.quickRoomDataStorage.quickRoomData) {
      return this.router.navigate(['']);
    } 
      this.latestUser = this.quickRoomDataStorage.quickRoomData.LatestUser;
      this.room = this.quickRoomDataStorage.quickRoomData.Server.room;
      this.initIoConnection();
  }

  private initIoConnection(): void {
    this.chatService.initSocket();

    this.chatService.join(this.room, this.latestUser);
    
    this.ioConnection = this.chatService.onMessage().subscribe((message: any) => {
        this.messages.push(message);
    });

    this.ioJoin = this.chatService.onJoin().subscribe((data: any) => {
      console.log(data, ' joined the room')
      this.users.push(data)
    })

    this.ioDisconnect = this.chatService.onDisconnect().subscribe((data: any) => {
      console.log(data, ' left the room')
      this.users.splice(this.users.indexOf(data), 1)
    })

    this.chatService.onPreviousMessages().subscribe((messages: any) => {
      console.log(messages.messages)
      this.messages = messages.messages
    })

    this.chatService.onTyping().subscribe((user: any) => {
      console.log(`${user} is typing`)
    })

  }

  public sendMessage(message: string): void {
    if (!message) {
      return;
    }
    let date = moment().calendar(); 
    let messageObject = new Message(message, this.latestUser, date)
    this.chatService.send(this.room, messageObject);
    this.message = null;
  }

  public shareRoom () {
    this.dialog.open(QuickRoomShareComponent, {
      data: {
      url: `localhost:4200/quickRoom/${this.quickRoomDataStorage.quickRoomData.Server.token}`
      }
    })
  }

  public onTyping() {
    this.chatService.notifyTyping(this.room, this.latestUser)
  }


}
